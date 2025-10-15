<template>
  <Container>
    <div class="post-editor-page">
      <div class="page-header">
        <h1>Επεξεργασία Άρθρου</h1>
      </div>

      <template v-if="post">
        <div class="post-metadata-grid">
          <cdx-field>
            <template #label>ID Άρθρου</template>
            <cdx-text-input :model-value="post.id" disabled />
          </cdx-field>

          <cdx-field>
            <template #label>Όνομα Άρθρου</template>
            <cdx-text-input v-model="post.title" />
          </cdx-field>

          <cdx-field>
            <template #label>Δημιουργήθηκε στις</template>
            <cdx-text-input :model-value="formattedCreatedAt" disabled />
          </cdx-field>

          <cdx-field>
            <template #label>Τρέχουσα Ώρα</template>
            <cdx-text-input :model-value="currentTime" disabled />
          </cdx-field>

          <cdx-field>
            <template #label>Slug</template>
            <cdx-text-input v-model="post.slug" />
          </cdx-field>

          <cdx-field class="image-url-field">
            <template #label>Φωτογραφία (URL)</template>
            <div style="position: relative;">
              <cdx-text-input
                v-model="post.image_url"
                @focus="showImagePreview"
                @blur="hideImagePreview"
              />
              <div v-if="isImagePreviewVisible" class="image-preview-popover">
                <cdx-progress-bar v-if="isImageLoading" inline />
                <img
                  v-else-if="!hasImageError && post.image_url"
                  :src="post.image_url"
                  alt="Preview"
                  @load="onImageLoad"
                  @error="onImageError"
                  class="preview-image"
                />
                <div v-else class="no-preview">
                  {{ hasImageError ? 'Αποτυχία φόρτωσης' : 'Επικολλήστε ένα URL' }}
                </div>
              </div>
            </div>
          </cdx-field>

          <cdx-field>
            <template #label>Συγγραφέας</template>
            <author-selector v-if="post" v-model="post.author_id" />
          </cdx-field>
          
          <cdx-field>
            <template #label>Ενέργειες</template>
            <div class="grid-actions">
              <cdx-button
                weight="primary"
                action="progressive"
                @click="saveContent"
                :disabled="isSaving || !isDirty"
              >
                Αποθήκευση
              </cdx-button>
              <cdx-button
                @click="handleClose"
                :disabled="isSaving"
                weight="quiet"
                class="cancel-button"
              >
                Κλείσιμο
              </cdx-button>
            </div>
          </cdx-field>
        </div>
        
        <RichEditor
          v-if="post.content !== null"
          ref="richEditorRef"
          v-model="post.content"
          @dirty="isDirty = true"
          @show-image-dialog="showImageDialog"
        />

        <cdx-progress-bar v-if="isSaving" inline aria-label="Αποθήκευση..." />
      </template>

      <div v-if="errorLoading" class="error-indicator">
        <p>Αποτυχία φόρτωσης του άρθρου. <a @click.prevent="goBack(true)" href="#">Επιστροφή στη λίστα</a>.</p>
      </div>

      <ImageInsertDialog
        :open="isImageDialogVisible"
        @insert="handleImageInsert"
        @close="hideImageDialog"
      />
      
      <cdx-dialog
        v-model:open="showConfirmCloseDialog"
        title="Μη αποθηκευμένες αλλαγές"
        :primary-action="{ label: 'Αποθήκευση και κλείσιμο', disabled: isSaving }"
        :default-action="{ label: 'Χωρίς αποθήκευση' }"
        @primary="saveAndClose"
        @default="goBack(true)"
        @close="showConfirmCloseDialog = false"
      >
        Έχετε μη αποθηκευμένες αλλαγές. Θέλετε να αποθηκεύσετε τις αλλαγές σας πριν την έξοδο;
      </cdx-dialog>
    </div>
  </Container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import {
  CdxButton,
  CdxProgressBar,
  CdxField,
  CdxTextInput,
  CdxDialog
} from '@wikimedia/codex';
import { supabase } from '../../supabase';
import notificationService from '../../notification';
import loadingService from '../../loading';
import Container from '../../components/Container.vue';
import ImageInsertDialog from '../../components/ImageInsertDialog.vue';
import AuthorSelector from '../../components/AuthorSelector.vue';
import RichEditor from '../../components/RichEditor.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const post = ref(null);
const isSaving = ref(false);
const errorLoading = ref(false);
const isImageDialogVisible = ref(false);
const showConfirmCloseDialog = ref(false);
const isDirty = ref(false);
const currentTime = ref('');
let timeInterval = null;

const isImagePreviewVisible = ref(false);
const isImageLoading = ref(false);
const hasImageError = ref(false);

const richEditorRef = ref(null);
let initialPostState = {};

const formattedCreatedAt = computed(() => {
  if (post.value && post.value.created_at) {
    return new Date(post.value.created_at).toLocaleString('el-GR');
  }
  return '';
});

function updateTime() {
  currentTime.value = new Date().toLocaleString('el-GR');
}

function showImagePreview() {
  isImagePreviewVisible.value = true;
  if (post.value?.image_url) {
    validateImage(post.value.image_url);
  }
}

function hideImagePreview() {
  setTimeout(() => { isImagePreviewVisible.value = false; }, 200);
}

function onImageLoad() {
  isImageLoading.value = false;
  hasImageError.value = false;
}

function onImageError() {
  isImageLoading.value = false;
  hasImageError.value = true;
}

function validateImage(url) {
  if (!url) {
    isImageLoading.value = false;
    hasImageError.value = false;
    return;
  }
  isImageLoading.value = true;
  hasImageError.value = false;
  const img = new window.Image();
  img.src = url;
  img.onload = onImageLoad;
  img.onerror = onImageError;
}

watch(() => post.value?.image_url, (newUrl) => {
  if (isImagePreviewVisible.value) {
    validateImage(newUrl);
  }
});

function storeInitialState() {
  if (post.value) {
    initialPostState = JSON.parse(JSON.stringify(post.value));
    isDirty.value = false;
  }
}

// Watch for changes in metadata fields
watch(post, (newPostValue) => {
  if (!newPostValue || !initialPostState) return;
  // Compare all properties except 'content' which is handled by the editor component
  for (const key in newPostValue) {
    if (key !== 'content' && newPostValue[key] !== initialPostState[key]) {
      isDirty.value = true;
      return;
    }
  }
}, { deep: true });

async function fetchPost() {
  loadingService.show();
  errorLoading.value = false;
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(full_name)')
      .eq('id', props.id)
      .single();

    if (error) throw error;
    post.value = data;
    // Ensure content is not null, fallback to empty string
    if (post.value.content === null) {
        post.value.content = '';
    }
    await nextTick();
    storeInitialState();
  } catch (err) {
    console.error('Error fetching post:', err);
    notificationService.push('Αποτυχία φόρτωσης άρθρου.', 'error');
    errorLoading.value = true;
  } finally {
    loadingService.hide();
  }
}

async function saveContent() {
  if (!post.value) return false;
  isSaving.value = true;
  let success = false;
  
  const updatedPost = {
    content: post.value.content,
    title: post.value.title,
    slug: post.value.slug,
    image_url: post.value.image_url,
    author_id: post.value.author_id
  };

  try {
    const { error } = await supabase
      .from('posts')
      .update(updatedPost)
      .eq('id', post.value.id);

    if (error) throw error;
    
    await fetchPost(); // Refetch to reset dirty state
    notificationService.push('Το άρθρο αποθηκεύτηκε με επιτυχία.');
    success = true;
  } catch (err) {
    notificationService.push('Η αποθήκευση απέτυχε. Παρακαλώ δοκιμάστε ξανά.', 'error');
    console.error('Error saving post content:', err);
  } finally {
    isSaving.value = false;
  }
  return success;
}

async function saveAndClose() {
  const saved = await saveContent();
  if (saved) {
    goBack(true);
  }
}

function goBack(force = false) {
  if (force) {
    router.push({ name: 'AdminDashboard' });
    return;
  }
  handleClose();
}

function handleClose() {
  if (isDirty.value) {
    showConfirmCloseDialog.value = true;
  } else {
    router.push({ name: 'AdminDashboard' });
  }
}

function showImageDialog() { isImageDialogVisible.value = true; }
function hideImageDialog() { isImageDialogVisible.value = false; }

function handleImageInsert(url) {
  if (url && richEditorRef.value) {
    richEditorRef.value.insertImage(url);
  }
  hideImageDialog();
}

onMounted(() => {
  fetchPost();
  updateTime();
  timeInterval = setInterval(updateTime, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timeInterval);
});
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-top: 21.440px;
}
.page-header h1 {
  margin: 0;
}
.error-indicator {
  margin: auto;
  text-align: center;
  padding: 40px 0;
}
.post-metadata-grid {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 1rem;
  row-gap: 0;
  margin-bottom: 2rem;
  align-items: baseline;
}
.post-metadata-grid .cdx-field {
  margin-bottom: 0;
}
@media (min-width: 768px) {
  .post-metadata-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
.grid-actions {
  display: flex;
  gap: 1rem;
  width: 100%;
  margin: auto;
}
.image-url-field {
  position: relative;
}
.image-preview-popover {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 10;
  border: 1px solid #c8ccd1;
  background-color: #ffffff;
  border-radius: 2px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-top: 4px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
}
.preview-image {
  max-width: auto;
  max-height: 300px;
  object-fit: contain;
}
.no-preview {
  color: #54595d;
}
.grid-actions > * {
  flex: 1;
}
</style>

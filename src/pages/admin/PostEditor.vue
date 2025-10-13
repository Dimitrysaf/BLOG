<template>
  <Container>
    <div class="post-editor-page">
      <div class="page-header">
        <h1>Επεξεργασία Άρθρου</h1>
      </div>

      <div v-if="isLoading" class="loading-indicator">
        <cdx-progress-bar inline aria-label="Φόρτωση άρθρου..." />
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
            <template #label>Slug</template>
            <cdx-text-input v-model="post.slug" />
          </cdx-field>

          <cdx-field>
            <template #label>Φωτογραφία (URL)</template>
            <cdx-text-input v-model="post.image_url" />
          </cdx-field>

          <cdx-field>
            <template #label>Συγγραφέας</template>
            <cdx-text-input :model-value="post.profiles?.full_name" disabled />
          </cdx-field>
          
          <div class="button-container">
            <cdx-button
              weight="primary"
              action="progressive"
              @click="saveContent"
              :disabled="isSaving || isLoading"
            >
              Αποθήκευση
            </cdx-button>
            <cdx-button
              action="destructive"
              @click="goBack"
              :disabled="isSaving"
            >
              Ακύρωση
            </cdx-button>
          </div>
        </div>
        
        <div v-if="editor" class="editor-toolbar">
          <cdx-button-group>
            <cdx-button
              @click="editor.chain().focus().toggleBold().run()"
              :class="{ 'is-active': editor.isActive('bold') }"
              aria-label="Bold"
              :icon="cdxIconBold"
              weight="quiet"
            ></cdx-button>
            <cdx-button
              @click="editor.chain().focus().toggleItalic().run()"
              :class="{ 'is-active': editor.isActive('italic') }"
              aria-label="Italic"
              :icon="cdxIconItalic"
              weight="quiet"
            ></cdx-button>
            <cdx-button
              @click="editor.chain().focus().toggleStrike().run()"
              :class="{ 'is-active': editor.isActive('strike') }"
              aria-label="Strikethrough"
              :icon="cdxIconStrikethrough"
              weight="quiet"
            ></cdx-button>
          </cdx-button-group>

          <cdx-button-group>
            <cdx-button
              @click="editor.chain().focus().setParagraph().run()"
              :class="{ 'is-active': editor.isActive('paragraph') }"
              aria-label="Paragraph"
              :icon="cdxIconTextStyle"
              weight="quiet"
            ></cdx-button>
            <cdx-button
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
              aria-label="Heading 1"
              weight="quiet"
            >H1</cdx-button>
            <cdx-button
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
              aria-label="Heading 2"
              weight="quiet"
            >H2</cdx-button>
            <cdx-button
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
              :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
              aria-label="Heading 3"
              weight="quiet"
            >H3</cdx-button>
          </cdx-button-group>

          <cdx-button-group>
            <cdx-button
              @click="editor.chain().focus().toggleBulletList().run()"
              :class="{ 'is-active': editor.isActive('bulletList') }"
              aria-label="Bullet List"
              :icon="cdxIconListBullet"
              weight="quiet"
            ></cdx-button>
            <cdx-button
              @click="editor.chain().focus().toggleOrderedList().run()"
              :class="{ 'is-active': editor.isActive('orderedList') }"
              aria-label="Ordered List"
              :icon="cdxIconListNumbered"
              weight="quiet"
            ></cdx-button>
          </cdx-button-group>
        </div>

        <div class="editor-content-wrapper">
          <editor-content :editor="editor" />
        </div>
        <cdx-progress-bar v-if="isSaving" inline aria-label="Αποθήκευση..." />
      </template>

      <div v-if="errorLoading" class="error-indicator">
        <p>Αποτυχία φόρτωσης του άρθρου. <a href="/admin">Επιστροφή στη λίστα</a>.</p>
      </div>
    </div>
  </Container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import {
  CdxButton,
  CdxButtonGroup,
  CdxProgressBar,
  CdxField,
  CdxTextInput
} from '@wikimedia/codex';
import {
  cdxIconBold, 
  cdxIconItalic, 
  cdxIconStrikethrough,
  cdxIconTextStyle,
  cdxIconListBullet,
  cdxIconListNumbered
} from '@wikimedia/codex-icons';
import { supabase } from '../../supabase';
import notificationService from '../../notification';
import Container from '../../components/Container.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const post = ref(null);
const isLoading = ref(true);
const isSaving = ref(false);
const errorLoading = ref(false);

const formattedCreatedAt = computed(() => {
  if (post.value && post.value.created_at) {
    return new Date(post.value.created_at).toLocaleString('el-GR');
  }
  return '';
});

const editor = useEditor({
  content: '',
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
    }),
  ],
  editorProps: {
    attributes: {
      class: 'ProseMirror',
    },
  },
});

async function fetchPost() {
  isLoading.value = true;
  errorLoading.value = false;
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles(full_name)')
      .eq('id', props.id)
      .single();

    if (error) throw error;
    post.value = data;
  } catch (err) {
    console.error('Error fetching post:', err);
    notificationService.push('Αποτυχία φόρτωσης άρθρου.', 'error');
    errorLoading.value = true;
  } finally {
    isLoading.value = false;
  }
}

async function saveContent() {
  if (!editor.value || !post.value) return;
  isSaving.value = true;
  
  const updatedPost = {
    content: editor.value.getHTML(),
    title: post.value.title,
    slug: post.value.slug,
    image_url: post.value.image_url,
  };

  try {
    const { error } = await supabase
      .from('posts')
      .update(updatedPost)
      .eq('id', post.value.id);

    if (error) throw error;
    
    notificationService.push('Το άρθρο αποθηκεύτηκε με επιτυχία.');
    router.push({ name: 'AdminDashboard' });

  } catch (err) {
    notificationService.push('Η αποθήκευση απέτυχε. Παρακαλώ δοκιμάστε ξανά.', 'error');
    console.error('Error saving post content:', err);
  } finally {
    isSaving.value = false;
  }
}

function goBack() {
  router.push({ name: 'AdminDashboard' });
}

watch(post, (newPost) => {
  if (editor.value && newPost) {
    editor.value.commands.setContent(newPost.content || '');
  }
});

onMounted(() => {
  fetchPost();
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<style>
.page-header {
  margin-bottom: 20px;
}

.page-header h1 {
  margin: 0;
}

.loading-indicator, .error-indicator {
  margin: auto;
  text-align: center;
  padding: 40px 0;
}

.post-metadata-grid {
  display: grid;
  grid-template-columns: 1fr; /* Default to 1 column for small screens */
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: baseline;
}

.button-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* Media query for larger screens */
@media (min-width: 768px) {
  .post-metadata-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for wider screens */
  }
  .post-metadata-grid .button-container {
    grid-column: 1 / -1;
    justify-content: flex-end;
  }
}

/* Override default CdxField margins for a clean grid */
.post-metadata-grid .cdx-field {
  margin-bottom: 0;
}

.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-top: 1px solid var(--border-color-base);
  border-bottom: 1px solid var(--border-color-base);
  background-color: var(--background-color-interactive-subtle);
  margin: 1rem 0;
  padding: 0.5rem 1rem;
}

.editor-toolbar .cdx-button.is-active {
  background-color: var(--background-color-interactive-default);
  color: var(--color-interactive);
}

.editor-content-wrapper {
  flex-grow: 1;
  overflow-y: auto;
}

.ProseMirror {
  outline: none;
  color: var(--color-base);
  line-height: 1.6;
  min-height: 400px; /* Ensure editor has a minimum height */
}

.ProseMirror p {
  margin-block-start: 0;
  margin-block-end: var(--spacing-400);
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3 {
  margin-block-start: var(--spacing-600);
  margin-block-end: var(--spacing-200);
  line-height: 1.2;
  font-weight: bold;
  border-bottom: none;
}

.ProseMirror h1 {
  font-size: var(--font-size-xx-large);
}

.ProseMirror h2 {
  font-size: var(--font-size-x-large);
}

.ProseMirror h3 {
  font-size: var(--font-size-large);
}

.ProseMirror ul,
.ProseMirror ol {
  padding-inline-start: 1.5rem;
  margin-block-end: var(--spacing-400);
}

.ProseMirror blockquote {
  border-inline-start: 3px solid var(--border-color-base);
  padding-inline-start: 1rem;
  margin-inline-start: 0;
  font-style: italic;
  color: var(--color-subtle);
}

.ProseMirror hr {
  border: none;
  border-top: 1px solid var(--border-color-base);
  margin-block: 2rem;
}

.ProseMirror:focus-visible {
  outline: none;
}

</style>
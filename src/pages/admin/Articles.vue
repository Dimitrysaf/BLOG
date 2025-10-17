<template>
  <div class="articles-container">
    <cdx-table
      caption="Λίστα των άρθρων"
      :columns="columns"
      :data="posts"
      :use-row-headers="true"
      :paginate="true"
    >
      <template #header>
        <div class="table-header-actions">
          <cdx-button
            weight="primary"
            action="progressive"
            aria-label="Νέο Άρθρο"
            @click="openNewArticleDialog"
          >
            <cdx-icon :icon="cdxIconAdd" />
          </cdx-button>
          <cdx-button
            aria-label="Ανανέωση λίστας"
            @click="fetchPosts"
          >
            <cdx-icon :icon="cdxIconReload" />
          </cdx-button>
        </div>
      </template>

      <template #item-image="{ row }">
        <cdx-thumbnail :thumbnail="row.image_url ? { url: row.image_url } : { icon: cdxIconNewspaper }" />
      </template>

      <template #item-actions="{ row }">
        <div class="action-buttons">
          <cdx-button
            aria-label="Προβολή"
            @click="viewPost(row)"
          >
            <cdx-icon :icon="cdxIconEye" />
          </cdx-button>
          <cdx-toggle-button
            :model-value="row.is_published"
            aria-label="Toggle Published State"
            @update:model-value="handlePublicationToggle(row)"
          >
            <cdx-icon :icon="cdxIconUpload" />
          </cdx-toggle-button>
          <cdx-button
            aria-label="Επεξεργασία"
            @click="editPost(row)"
          >
            <cdx-icon :icon="cdxIconEdit" />
          </cdx-button>
          <cdx-button
            action="destructive"
            aria-label="Διαγραφή"
            @click="promptDelete(row.id)"
          >
            <cdx-icon :icon="cdxIconTrash" />
          </cdx-button>
        </div>
      </template>

      <template #empty-state>
        <div class="empty-state">
          <cdx-icon :icon="cdxIconNewspaper" />
          <p>Δεν υπάρχουν ακόμη άρθρα.</p>
        </div>
      </template>
    </cdx-table>

    <ArticleCreateDialog 
      v-model:open="isCreateDialogOpen"
      @create="handleCreate"
    />

    <cdx-dialog
      :open="isDeleteDialogOpen"
      title="Επιβεβαίωση Διαγραφής"
      :primary-action="{ label: 'Διαγραφή', actionType: 'destructive', disabled: isDeleting }"
      :default-action="{ label: 'Άκυρο' }"
      @primary="confirmDelete"
      @default="cancelDelete"
      @close="cancelDelete"
    >
      <p>Είστε σίγουροι ότι θέλετε να διαγράψετε οριστικά αυτό το άρθρο; Αυτή η ενέργεια είναι μη αναστρέψιμη.</p>
      <cdx-progress-bar v-if="isDeleting" inline />
    </cdx-dialog>

    <cdx-dialog
      :open="isPublishingDialogOpen"
      title="Επιβεβαίωση Δημοσίευσης"
      :primary-action="{ label: 'Δημοσίευση', actionType: 'progressive', disabled: isPublishing }"
      :default-action="{ label: 'Άκυρο' }"
      @primary="confirmPublish"
      @default="cancelPublish"
      @close="cancelPublish"
    >
      <p>Είστε σίγουροι ότι θέλετε να δημοσιεύσετε αυτό το άρθρο; Θα είναι ορατό σε όλους τους επισκέπτες.</p>
      <cdx-progress-bar v-if="isPublishing" inline />
    </cdx-dialog>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  CdxTable,
  CdxButton,
  CdxIcon,
  CdxProgressBar,
  CdxDialog,
  CdxToggleButton,
  CdxThumbnail
} from '@wikimedia/codex';
import { cdxIconEdit, cdxIconTrash, cdxIconNewspaper, cdxIconUpload, cdxIconReload, cdxIconEye, cdxIconAdd } from '@wikimedia/codex-icons';
import { supabase } from '../../supabase';
import notificationService from '../../notification';
import loadingService from '../../loading';
import ArticleCreateDialog from '../../components/ArticleCreateDialog.vue';

const columns = [
  { id: 'image', label: 'Εικόνα' },
  { id: 'title', label: 'Τίτλος' },
  { id: 'author_name', label: 'Συγγραφέας' },
  { id: 'created_at_formatted', label: 'Ημερομηνία Δημιουργίας' },
  { id: 'actions', label: 'Ενέργειες' }
];

const posts = ref([]);
const isCreateDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);
const isDeleting = ref(false);
const postToDeleteId = ref(null);
const isPublishingDialogOpen = ref(false);
const isPublishing = ref(false);
const postToPublish = ref(null);

const router = useRouter();

function openNewArticleDialog() {
  isCreateDialogOpen.value = true;
}

async function handleCreate(newArticleData) {
  isCreateDialogOpen.value = false;
  
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw userError || new Error('User not found.');

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;

    if (profileData.full_name !== newArticleData.author) {
        const { error: updateProfileError } = await supabase
            .from('profiles')
            .update({ full_name: newArticleData.author })
            .eq('id', user.id);
        if (updateProfileError) throw updateProfileError;
    }

    const { error: postError } = await supabase
      .from('posts')
      .insert({
        title: newArticleData.title,
        slug: newArticleData.slug,
        author_id: user.id,
        image_url: newArticleData.image_url,
        is_published: newArticleData.is_published,
        content: ''
      });

    if (postError) throw postError;

    notificationService.push(`Το άρθρο "${newArticleData.title}" δημιουργήθηκε με επιτυχία.`);
    await fetchPosts();

  } catch (err) {
    notificationService.push('Αποτυχία δημιουργίας άρθρου. Παρακαλώ δοκιμάστε ξανά.', 'error');
    console.error('Error creating post:', err);
  }
}

async function fetchPosts() {
  loadingService.show();
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`id, title, content, created_at, is_published, image_url, slug, profiles ( full_name )`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    posts.value = data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      is_published: post.is_published,
      image_url: post.image_url,
      slug: post.slug, // Make sure slug is available
      author_name: post.profiles ? post.profiles.full_name : 'Άγνωστος',
      created_at_formatted: new Date(post.created_at).toLocaleDateString('el-GR'),
    }));

  } catch (err) {
    notificationService.push('Αποτυχία φόρτωσης άρθρων.', 'error');
    console.error('Error fetching posts:', err);
  } finally {
    loadingService.hide();
  }
}

async function handlePublicationToggle(post) {
  const desiredStatus = !post.is_published;
  
  if (desiredStatus === true) {
    promptPublish(post);
  } else {
    await updatePublishedStatus(post, false);
  }
}

function promptPublish(post) {
  postToPublish.value = post;
  isPublishingDialogOpen.value = true;
}

function cancelPublish() {
  isPublishingDialogOpen.value = false;
  if (postToPublish.value) {
    const postInList = posts.value.find(p => p.id === postToPublish.value.id);
    if (postInList) {
      postInList.is_published = false;
    }
  }
  postToPublish.value = null;
}

async function confirmPublish() {
  if (!postToPublish.value) return;

  isPublishing.value = true;
  await updatePublishedStatus(postToPublish.value, true);
  isPublishing.value = false;
  isPublishingDialogOpen.value = false;
  postToPublish.value = null;
}

async function updatePublishedStatus(post, newStatus) {
  const originalStatus = post.is_published;
  post.is_published = newStatus;

  try {
    const { error } = await supabase
      .from('posts')
      .update({ is_published: newStatus })
      .eq('id', post.id);

    if (error) throw error;

    notificationService.push('Η κατάσταση δημοσίευσης ενημερώθηκε επιτυχώς.', 'success');

  } catch (err) {
    post.is_published = originalStatus;
    notificationService.push('Η ενημέρωση της κατάστασης δημοσίευσης απέτυχε.', 'error');
    console.error('Error updating published status:', err);
  }
}

function editPost(post) {
  router.push({ name: 'PostEditor', params: { id: post.id } });
}

function viewPost(post) {
  router.push(`/p/${post.slug}`);
}

function promptDelete(postId) {
  postToDeleteId.value = postId;
  isDeleteDialogOpen.value = true;
}

function cancelDelete() {
  isDeleteDialogOpen.value = false;
  postToDeleteId.value = null;
}

async function confirmDelete() {
  if (!postToDeleteId.value) return;
  isDeleting.value = true;
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postToDeleteId.value);

    if (error) throw error;

    posts.value = posts.value.filter(p => p.id !== postToDeleteId.value);
    notificationService.push('Το άρθρο διαγράφηκε με επιτυχία.');

  } catch (err) {
    notificationService.push('Η διαγραφή του άρθρου απέτυχε.', 'error');
    console.error('Error deleting post:', err);
  } finally {
    isDeleting.value = false;
    cancelDelete();
  }
}


onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.articles-container {
  margin: -20px;
}

.table-header-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  width: 100%;
  padding: 12px 0;
}

.action-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
}

.empty-state .cdx-icon {
  font-size: 48px;
  color: #72777d;
  margin-bottom: 16px;
}

.empty-state p {
  margin-bottom: 16px;
  font-size: 1.1em;
  color: #54595d;
}

:deep(.cdx-table__cell:first-child) {
  text-align: center;
}
</style>

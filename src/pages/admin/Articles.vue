<template>
  <div class="articles-container">
    <div class="page-header" v-if="!isLoading">
      <cdx-button
        weight="primary"
        action="progressive"
        @click="openNewArticleDialog"
      >
        Νέο Άρθρο
      </cdx-button>
    </div>

    <cdx-progress-bar v-if="isLoading" inline aria-label="Φόρτωση άρθρων..." />

    <cdx-table
      v-else
      caption="Λίστα των άρθρων του ιστολογίου"
      :columns="columns"
      :data="posts"
      :use-row-headers="false"
    >
      <template #item-actions="{ row }">
        <div class="action-buttons">
          <cdx-button
            weight="quiet"
            aria-label="Επεξεργασία"
            @click="editPost(row.id)"
          >
            <cdx-icon :icon="cdxIconEdit" />
          </cdx-button>
          <cdx-button
            weight="quiet"
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

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  CdxTable,
  CdxButton,
  CdxIcon,
  CdxProgressBar,
  CdxDialog
} from '@wikimedia/codex';
import { cdxIconEdit, cdxIconTrash, cdxIconNewspaper } from '@wikimedia/codex-icons';
import { supabase } from '../../supabase';
import notificationService from '../../notification';
import ArticleCreateDialog from '../../components/ArticleCreateDialog.vue';

const columns = [
  { id: 'title', label: 'Τίτλος' },
  { id: 'author_name', label: 'Συγγραφέας' },
  { id: 'created_at_formatted', label: 'Ημερομηνία Δημιουργίας' },
  { id: 'actions', label: 'Ενέργειες' }
];

const posts = ref([]);
const isLoading = ref(true);
const isCreateDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);
const isDeleting = ref(false);
const postToDeleteId = ref(null);

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
        author_id: user.id, // Corrected back from user_id
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
  isLoading.value = true;
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`id, title, created_at, profiles ( full_name )`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    posts.value = data.map(post => ({
      id: post.id,
      title: post.title,
      author_name: post.profiles ? post.profiles.full_name : 'Άγνωστος',
      created_at_formatted: new Date(post.created_at).toLocaleDateString('el-GR'),
    }));

  } catch (err) {
    notificationService.push('Αποτυχία φόρτωσης άρθρων.', 'error');
    console.error('Error fetching posts:', err);
  } finally {
    isLoading.value = false;
  }
}

function editPost(postId) {
  // Placeholder for edit functionality
  notificationService.push(`Επεξεργασία άρθρου ${postId} (δεν έχει υλοποιηθεί ακόμα).`);
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

.page-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  padding: 20px 20px 0 20px;
}

.action-buttons {
  display: flex;
  gap: 8px;
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
</style>

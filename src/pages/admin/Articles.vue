<template>
  <div>
    <div class="page-header" v-if="!isLoading">
      <cdx-button
        weight="primary"
        action="progressive"
        @click="openNewArticleDialog"
      >
        Νέο Άρθρο
      </cdx-button>
    </div>

    <cdx-progress-bar v-if="isLoading" />

    <cdx-table
      v-else
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
            @click="deletePost(row.id)"
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

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  CdxTable,
  CdxButton,
  CdxIcon,
  CdxProgressBar
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

function openNewArticleDialog() {
  isCreateDialogOpen.value = true;
}

async function handleCreate(newArticleData) {
  isCreateDialogOpen.value = false;
  // For now, just show a notification, as requested.
  notificationService.push(`Το άρθρο "${newArticleData.title}" θα δημιουργηθεί (δεν έχει υλοποιηθεί ακόμα).`);
  console.log('Data from dialog:', newArticleData);
}

async function fetchPosts() {
  isLoading.value = true;
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        created_at,
        profiles ( full_name )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    posts.value = data.map(post => ({
      id: post.id,
      title: post.title,
      author_name: post.profiles ? post.profiles.full_name : 'Άγνωστος',
      created_at_formatted: new Date(post.created_at).toLocaleDateString('el-GR'),
    }));

  } catch (err) {
    notificationService.push('Αποτυχία φόρτωσης άρθρων. Βεβαιωθείτε ότι ο πίνακας "posts" υπάρχει.', 'error');
    console.error('Error fetching posts:', err);
  } finally {
    isLoading.value = false;
  }
}

function editPost(postId) {
  notificationService.push(`Επεξεργασία άρθρου ${postId} (δεν έχει υλοποιηθεί ακόμα).`);
}

function deletePost(postId) {
  notificationService.push(`Διαγραφή άρθρου ${postId} (δεν έχει υλοποιηθεί ακόμα).`);
}

onMounted(() => {
  fetchPosts();
});

</script>

<style scoped>
.page-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
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

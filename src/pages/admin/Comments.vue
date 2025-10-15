<template>
  <div class="comments-container">
    <cdx-table
      caption="Λίστα των σχολίων της εφαρμογής"
      :columns="columns"
      :data="comments"
      :use-row-headers="true"
      :paginate="true"
    >
      <template #header>
        <div class="table-header-actions">
          <cdx-button
            aria-label="Ανανέωση λίστας"
            @click="fetchComments"
          >
            <cdx-icon :icon="cdxIconReload" />
          </cdx-button>
        </div>
      </template>

      <template #item-image="{ row }">
        <cdx-thumbnail :thumbnail="row.profiles && row.profiles.avatar_url ? { url: row.profiles.avatar_url } : { icon: cdxIconUserAvatar }" />
      </template>
      
      <template #item-content="{ row }">
        <div class="comment-content">
            {{ row.content }}
        </div>
      </template>

      <template #item-actions="{ row }">
        <div class="action-buttons">
          <cdx-button
            v-if="row.posts && row.posts.slug"
            aria-label="Προβολή Άρθρου"
            @click="goToPost(row.posts)"
          >
            <cdx-icon :icon="cdxIconEye" />
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
          <cdx-icon :icon="cdxIconSpeechBubble" />
          <p>Δεν υπάρχουν ακόμη σχόλια.</p>
        </div>
      </template>
    </cdx-table>

    <cdx-dialog
      :open="isDeleteDialogOpen"
      title="Επιβεβαίωση Διαγραφής"
      :primary-action="{ label: 'Διαγραφή', actionType: 'destructive', disabled: isDeleting }"
      :default-action="{ label: 'Άκυρο' }"
      @primary="confirmDelete"
      @default="cancelDelete"
      @close="cancelDelete"
    >
      <p>Είστε σίγουροι ότι θέλετε να διαγράψετε οριστικά αυτό το σχόλιο; Αυτή η ενέργεια είναι μη αναστρέψιμη.</p>
      <cdx-progress-bar v-if="isDeleting" inline />
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
  CdxThumbnail
} from '@wikimedia/codex';
import { cdxIconTrash, cdxIconSpeechBubble, cdxIconUserAvatar, cdxIconEye, cdxIconReload } from '@wikimedia/codex-icons';
import { supabase } from '../../supabase';
import notificationService from '../../notification';
import loadingService from '../../loading';

const router = useRouter();

const columns = [
  { id: 'image', label: 'Εικόνα', class: 'col-image' },
  { id: 'full_name', label: 'Ονοματεπώνυμο', class: 'col-name' },
  { id: 'content', label: 'Περιεχόμενο', class: 'col-content' },
  { id: 'created_at_formatted', label: 'Ημ/νία Δημιουργίας', class: 'col-date' },
  { id: 'actions', label: 'Ενέργειες', class: 'col-actions' }
];

const comments = ref([]);
const isDeleteDialogOpen = ref(false);
const isDeleting = ref(false);
const commentToDeleteId = ref(null);

async function fetchComments() {
  loadingService.show();
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('id, content, created_at, profiles(full_name, avatar_url), posts(slug)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    comments.value = data.map(comment => ({
      ...comment,
      created_at_formatted: new Date(comment.created_at).toLocaleDateString('el-GR'),
      full_name: comment.profiles?.full_name || 'Άγνωστος Χρήστης'
    }));

  } catch (err) {
    notificationService.push('Αποτυχία φόρτωσης σχολίων.', 'error');
    console.error('Error fetching comments:', err);
  } finally {
    loadingService.hide();
  }
}

function goToPost(post) {
  if (post && post.slug) {
    router.push({ name: 'Post', params: { slug: post.slug } });
  } else {
    notificationService.push('Δεν ήταν δυνατή η εύρεση του σχετικού άρθρου.', 'error');
  }
}

function promptDelete(commentId) {
  commentToDeleteId.value = commentId;
  isDeleteDialogOpen.value = true;
}

function cancelDelete() {
  isDeleteDialogOpen.value = false;
  commentToDeleteId.value = null;
}

async function confirmDelete() {
  if (!commentToDeleteId.value) return;
  isDeleting.value = true;
  try {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentToDeleteId.value);

    if (error) throw error;

    comments.value = comments.value.filter(c => c.id !== commentToDeleteId.value);
    notificationService.push('Το σχόλιο διαγράφηκε με επιτυχία.', 'success');

  } catch (err) {
    notificationService.push(`Η διαγραφή του σχολίου απέτυχε: ${err.message}`, 'error');
    console.error('Error deleting comment:', err);
  } finally {
    isDeleting.value = false;
    cancelDelete();
  }
}

onMounted(() => {
  fetchComments();
});
</script>

<style scoped>
.comments-container {
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

:deep(.col-image) {
  width: 80px;
  text-align: center;
}
:deep(.col-name) {
  width: 20%;
}
:deep(.col-content) {
  width: 50%;
}
:deep(.col-date) {
  width: 15%;
}
:deep(.col-actions) {
  width: 15%;
}

.comment-content {
    white-space: pre-wrap;
    word-break: break-word;
}

</style>
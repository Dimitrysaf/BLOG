<template>
  <div class="users-container">
    <cdx-table
      caption="Λίστα των χρηστών της εφαρμογής"
      :columns="columns"
      :data="users"
      :use-row-headers="true"
      :paginate="true"
    >
      <template #header>
        <div class="table-header-actions">
          <cdx-button
            aria-label="Ανανέωση λίστας"
            @click="fetchUsers"
          >
            <cdx-icon :icon="cdxIconReload" />
          </cdx-button>
        </div>
      </template>

      <template #item-image="{ row }">
        <cdx-thumbnail :thumbnail="row.avatar_url ? { url: row.avatar_url } : { icon: cdxIconUserAvatar }" />
      </template>

      <template #item-actions="{ row }">
        <div class="action-buttons">
          <cdx-button
            v-if="row.avatar_url"
            aria-label="Αφαίρεση Avatar"
            @click="removeAvatar(row)"
            :disabled="removingAvatarForUserId === row.id"
          >
            <cdx-progress-bar v-if="removingAvatarForUserId === row.id" inline />
            <cdx-icon v-else :icon="cdxIconImage" />
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
          <cdx-icon :icon="cdxIconUserGroup" />
          <p>Δεν υπάρχουν ακόμη εγγεγραμμένοι χρήστες.</p>
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
      <p>Είστε σίγουροι ότι θέλετε να διαγράψετε οριστικά αυτόν τον χρήστη; Αυτή η ενέργεια είναι μη αναστρέψιμη.</p>
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
  CdxDialog,
  CdxThumbnail
} from '@wikimedia/codex';
import { cdxIconTrash, cdxIconUserGroup, cdxIconUserAvatar, cdxIconImage, cdxIconReload } from '@wikimedia/codex-icons';
import { supabase } from '../../supabase';
import notificationService from '../../notification';
import loadingService from '../../loading';

const columns = [
  { id: 'image', label: 'Εικόνα' },
  { id: 'full_name', label: 'Ονοματεπώνυμο' },
  { id: 'role', label: 'Ρόλος' },
  { id: 'created_at_formatted', label: 'Ημ/νία Δημιουργίας' },
  { id: 'updated_at_formatted', label: 'Ημ/νία Ενημέρωσης' },
  { id: 'actions', label: 'Ενέργειες' }
];

const users = ref([]);
const isDeleteDialogOpen = ref(false);
const isDeleting = ref(false);
const userToDeleteId = ref(null);
const removingAvatarForUserId = ref(null);

async function fetchUsers() {
  loadingService.show();
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, role, avatar_url, created_at, updated_at');

    if (error) throw error;

    users.value = data.map(user => ({
      ...user,
      created_at_formatted: user.created_at ? new Date(user.created_at).toLocaleDateString('el-GR') : '-',
      updated_at_formatted: user.updated_at ? new Date(user.updated_at).toLocaleDateString('el-GR') : '-',
    }));

  } catch (err) {
    notificationService.push('Αποτυχία φόρτωσης χρηστών.', 'error');
    console.error('Error fetching users:', err);
  } finally {
    loadingService.hide();
  }
}

async function removeAvatar(user) {
  removingAvatarForUserId.value = user.id;
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ avatar_url: null })
      .eq('id', user.id);

    if (error) throw error;

    const userInList = users.value.find(u => u.id === user.id);
    if (userInList) {
      userInList.avatar_url = null;
    }

    notificationService.push('Το avatar αφαιρέθηκε με επιτυχία.', 'success');
  } catch (err) {
    notificationService.push('Η αφαίρεση του avatar απέτυχε.', 'error');
    console.error('Error removing avatar:', err);
  } finally {
    removingAvatarForUserId.value = null;
  }
}

function promptDelete(userId) {
  userToDeleteId.value = userId;
  isDeleteDialogOpen.value = true;
}

function cancelDelete() {
  isDeleteDialogOpen.value = false;
  userToDeleteId.value = null;
}

async function confirmDelete() {
  if (!userToDeleteId.value) return;
  isDeleting.value = true;
  try {
    const { error: functionError } = await supabase.functions.invoke('admin-delete-user', {
      body: { userIdToDelete: userToDeleteId.value },
    });

    if (functionError) {
      throw new Error(functionError.message);
    }

    users.value = users.value.filter(u => u.id !== userToDeleteId.value);
    notificationService.push('Ο χρήστης διαγράφηκε με επιτυχία.', 'success');

  } catch (err) {
    notificationService.push(`Η διαγραφή του χρήστη απέτυχε: ${err.message}`, 'error');
    console.error('Error deleting user:', err);
  } finally {
    isDeleting.value = false;
    cancelDelete();
  }
}

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.users-container {
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

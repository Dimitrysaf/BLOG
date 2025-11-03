<template>
  <div class="tags-container">
    <cdx-table
      caption="Λίστα των ετικετών"
      :columns="columns"
      :data="tags"
      :empty-state-label="'Δεν βρέθηκαν ετικέτες.'"
      :use-row-headers="true"
      :paginate="true"
    >
      <template #header>
        <div class="table-header-actions">
          <cdx-button
            v-if="isAdmin"
            weight="primary"
            action="progressive"
            aria-label="Νέα Ετικέτα"
            @click="openCreateDialog"
          >
            <cdx-icon :icon="cdxIconAdd" />
          </cdx-button>
          <cdx-button
            aria-label="Ανανέωση λίστας"
            @click="fetchTags"
          >
            <cdx-icon :icon="cdxIconReload" />
          </cdx-button>
        </div>
      </template>

      <template #item-actions="{ row }">
        <div v-if="isAdmin" class="action-buttons">
          <cdx-button
            aria-label="Επεξεργασία"
            @click="openEditDialog(row)"
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
          <cdx-icon :icon="cdxIconTag" />
          <p>Δεν υπάρχουν ακόμη ετικέτες.</p>
        </div>
      </template>
    </cdx-table>

    <cdx-dialog
      :open="isDialogVisible"
      :title="isEditing ? 'Επεξεργασία Ετικέτας' : 'Δημιουργία Νέας Ετικέτας'"
      :primary-action="{ label: 'Αποθήκευση', actionType: 'progressive' }"
      :default-action="{ label: 'Άκυρο' }"
      @primary="saveTag"
      @default="closeDialog"
      @close="closeDialog"
    >
      <cdx-field class="dialog-field">
        <cdx-text-input
          v-model="editableTag.name"
          label="Όνομα"
          placeholder="π.χ., '''Vue.js'''"
          required
        />
      </cdx-field>
      <cdx-field class="dialog-field">
        <cdx-text-area
          v-model="editableTag.description"
          label="Περιγραφή"
          placeholder="Μια σύντομη περιγραφή της ετικέτας."
        />
      </cdx-field>
    </cdx-dialog>

    <cdx-dialog
      :open="isDeleteDialogOpen"
      title="Επιβεβαίωση Διαγραφής"
      :primary-action="{ label: 'Διαγραφή', actionType: 'destructive', disabled: isDeleting }"
      :default-action="{ label: 'Άκυρο' }"
      @primary="confirmDelete"
      @default="cancelDelete"
      @close="cancelDelete"
    >
      <p>Είστε σίγουροι ότι θέλετε να διαγράψετε οριστικά αυτή την ετικέτα; Αυτή η ενέργεια είναι μη αναστρέψιμη.</p>
      <cdx-progress-bar v-if="isDeleting" inline />
    </cdx-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import {
  CdxTable,
  CdxButton,
  CdxIcon,
  CdxProgressBar,
  CdxDialog,
  CdxField,
  CdxTextInput,
  CdxTextArea
} from '@wikimedia/codex';
import { cdxIconEdit, cdxIconTrash, cdxIconReload, cdxIconAdd, cdxIconTag } from '@wikimedia/codex-icons';
import { supabase } from '../../supabase';
import notificationService from '../../notification';
import loadingService from '../../loading';
import { user } from '../../auth';

const userRole = ref(null);
const isAdmin = computed(() => userRole.value === 'admin');

const fetchUserRole = async () => {
  if (!user.value) {
    userRole.value = null;
    return;
  }
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.value.id)
      .single();
    if (error) throw error;
    userRole.value = data?.role;
  } catch (error) {
    console.error("Error fetching user role:", error);
    userRole.value = null;
  }
};

watch(user, fetchUserRole, { immediate: true });

const allColumns = [
  { id: 'name', label: 'Όνομα' },
  { id: 'description', label: 'Περιγραφή' },
  { id: 'actions', label: 'Ενέργειες', class: 'actions-column' }
];

const columns = computed(() => {
  if (isAdmin.value) {
    return allColumns;
  }
  return allColumns.filter(col => col.id !== 'actions');
});

const tags = ref([]);
const isDialogVisible = ref(false);
const isEditing = ref(false);
const editableTag = ref({ id: null, name: '', description: '' });

const isDeleteDialogOpen = ref(false);
const isDeleting = ref(false);
const tagToDeleteId = ref(null);

async function fetchTags() {
  loadingService.show();
  try {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    tags.value = data;
  } catch (err) {
    notificationService.push('Αποτυχία φόρτωσης ετικετών.', 'error');
    console.error('Error fetching tags:', err);
  } finally {
    loadingService.hide();
  }
}

function openCreateDialog() {
  isEditing.value = false;
  editableTag.value = { id: null, name: '', description: '' };
  isDialogVisible.value = true;
}

function openEditDialog(tag) {
  isEditing.value = true;
  editableTag.value = { ...tag };
  isDialogVisible.value = true;
}

function closeDialog() {
  isDialogVisible.value = false;
  editableTag.value = { id: null, name: '', description: '' };
}

async function saveTag() {
  if (!editableTag.value.name) {
    notificationService.push('Το όνομα της ετικέτας είναι υποχρεωτικό.', 'error');
    return;
  }
  
  loadingService.show();
  
  try {
    if (isEditing.value) {
      // Update existing tag
      const { data: updatedTag, error } = await supabase
        .from('tags')
        .update({ name: editableTag.value.name, description: editableTag.value.description })
        .eq('id', editableTag.value.id)
        .select()
        .single();
        
      if (error) throw error;
      
      const index = tags.value.findIndex(t => t.id === updatedTag.id);
      if (index !== -1) {
        tags.value[index] = updatedTag;
      }
      notificationService.push(`Η ετικέτα "${updatedTag.name}" ενημερώθηκε με επιτυχία.`, 'success');
      
    } else {
      // Create new tag
      const { data, error } = await supabase
        .from('tags')
        .insert([{ name: editableTag.value.name, description: editableTag.value.description }])
        .select()
        .single();
        
      if (error) throw error;

      tags.value.push(data);
      notificationService.push(`Η ετικέτα "${data.name}" δημιουργήθηκε με επιτυχία.`, 'success');
    }
  } catch (err) {
    const action = isEditing.value ? 'ενημέρωσης' : 'δημιουργίας';
    notificationService.push(`Αποτυχία ${action} ετικέtas.`, 'error');
    console.error('Error saving tag:', err);
  } finally {
    loadingService.hide();
    closeDialog();
  }
}


function promptDelete(tagId) {
  tagToDeleteId.value = tagId;
  isDeleteDialogOpen.value = true;
}

function cancelDelete() {
  isDeleteDialogOpen.value = false;
  tagToDeleteId.value = null;
}

async function confirmDelete() {
  if (!tagToDeleteId.value) return;
  isDeleting.value = true;
  loadingService.show();

  try {
    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', tagToDeleteId.value);

    if (error) throw error;

    const deletedTagName = tags.value.find(t => t.id === tagToDeleteId.value)?.name || '';
    tags.value = tags.value.filter(t => t.id !== tagToDeleteId.value);
    notificationService.push(`Η ετικέτα "${deletedTagName}" διαγράφηκε με επιτυχία.`, 'success');

  } catch (err) {
    notificationService.push('Η διαγραφή της ετικέτας απέτυχε.', 'error');
    console.error('Error deleting tag:', err);
  } finally {
    isDeleting.value = false;
    loadingService.hide();
    cancelDelete();
  }
}

onMounted(() => {
  fetchTags();
});
</script>

<style scoped>
.tags-container {
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

.dialog-field {
  margin-bottom: 16px;
}

:deep(.actions-column) {
  width: 120px; /* Adjust width as needed */
  text-align: right;
}
</style>

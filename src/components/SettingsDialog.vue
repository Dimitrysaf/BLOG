<template>
  <cdx-dialog
    :open="modelValue"
    :title-icon="cdxIconSettings"
    title="Ρυθμίσεις"
    :primary-action="{ label: 'Αποθήκευση', actionType: 'progressive' }"
    :default-action="{ label: 'Ακύρωση' }"
    @primary="onSave"
    @default="onClose"
    @close="onClose"
  >
    <!-- Settings form content will go here -->
  </cdx-dialog>
</template>

<script setup>
import { CdxDialog } from '@wikimedia/codex';
import { cdxIconSettings } from '@wikimedia/codex-icons';

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

function onSave() {
  // For now, just close the dialog.
  emit('update:modelValue', false);
}

function onClose() {
  emit('update:modelValue', false);
}
</script>

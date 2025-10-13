<template>
  <cdx-dialog
    :open="open"
    title="Εισαγωγή Εικόνας"
    :primary-action="primaryAction"
    :default-action="defaultAction"
    @primary="onInsert"
    @default="onClose"
    @close="onClose"
  >
    <div class="image-dialog-content">
      <cdx-field class="url-input-field">
        <template #label>URL Εικόνας</template>
        <cdx-text-input
          v-model="imageUrl"
          placeholder="https://example.com/image.jpg"
          @update:model-value="onUrlChange"
        />
      </cdx-field>
      <div class="image-preview-wrapper">
        <p>Προεπισκόπηση:</p>
        <div class="image-preview">
          <!-- Image is rendered if URL exists, but shown only when loaded successfully -->
          <img
            v-if="debouncedImageUrl"
            v-show="!isLoadingImage && !imageLoadError"
            :src="debouncedImageUrl"
            alt="Προεπισκόπηση Εικόνας"
            @load="onImageLoadSuccess"
            @error="onImageLoadError"
          />

          <!-- Spinner shown while loading -->
          <cdx-progress-indicator v-if="isLoadingImage" aria-label="Φόρτωση εικόνας..." />

          <!-- Error message shown on error -->
          <div v-if="!isLoadingImage && imageLoadError" class="no-preview">
            <cdx-icon :icon="cdxIconImage" />
            <span>Η φόρτωση της εικόνας απέτυχε.</span>
          </div>

          <!-- Initial placeholder -->
          <div v-if="!isLoadingImage && !debouncedImageUrl" class="no-preview">
            <cdx-icon :icon="cdxIconImage" />
            <span>Δεν υπάρχει εικόνα για προεπισκόπηση</span>
          </div>
        </div>
      </div>
    </div>
  </cdx-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import {
  CdxDialog,
  CdxField,
  CdxTextInput,
  CdxIcon,
  CdxProgressIndicator
} from '@wikimedia/codex';
import { cdxIconImage } from '@wikimedia/codex-icons';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['insert', 'close']);

const imageUrl = ref('');
const debouncedImageUrl = ref('');
const isLoadingImage = ref(false);
const imageLoadError = ref(false);
let debounceTimer = null;

const primaryAction = computed(() => ({
  label: 'Εισαγωγή',
  action: 'progressive',
  disabled: !debouncedImageUrl.value || imageLoadError.value || isLoadingImage.value,
}));

const defaultAction = {
  label: 'Ακύρωση',
};

watch(() => props.open, (newVal) => {
  if (!newVal) {
    // Reset state when dialog is closed
    imageUrl.value = '';
    debouncedImageUrl.value = '';
    imageLoadError.value = false;
    isLoadingImage.value = false;
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
  }
});

function onUrlChange() {
  imageLoadError.value = false;
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  if (!imageUrl.value) {
    debouncedImageUrl.value = '';
    isLoadingImage.value = false;
    return;
  }
  isLoadingImage.value = true;
  debounceTimer = setTimeout(() => {
    debouncedImageUrl.value = imageUrl.value;
  }, 500);
}

function onImageLoadSuccess() {
  isLoadingImage.value = false;
  imageLoadError.value = false;
}

function onImageLoadError() {
  isLoadingImage.value = false;
  imageLoadError.value = true;
}

function onInsert() {
  if (debouncedImageUrl.value && !imageLoadError.value) {
    emit('insert', debouncedImageUrl.value);
    onClose();
  }
}

function onClose() {
  emit('close');
}
</script>

<style scoped>
.image-dialog-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-preview-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.image-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  background-color: #f8f9fa;
  border: 1px solid #c8ccd1;
  border-radius: 2px;
  overflow: hidden;
  position: relative; /* Needed for absolute positioning of children if we go that route */
}

.image-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.no-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #54595d;
  text-align: center;
}

.no-preview .cdx-icon {
  font-size: 48px;
}
</style>

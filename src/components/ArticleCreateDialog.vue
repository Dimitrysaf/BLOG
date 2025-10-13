<template>
  <cdx-dialog
    :open="open"
    title="Δημιουργία Νέου Άρθρου"
    :primary-action="primaryAction"
    :default-action="defaultAction"
    @primary="onCreate"
    @default="onClose"
    @close="onClose"
  >
    <div class="image-url-field">
      <div class="image-preview">
        <cdx-progress-indicator v-if="isLoadingImage" aria-label="Φόρτωση εικόνας..." />
        <img
          v-else-if="imageUrl && !imageLoadError"
          :src="imageUrl"
          alt="Προεπισκόπηση Εικόνας"
        />
        <cdx-icon v-else :icon="cdxIconImage" />
      </div>

      <cdx-field class="url-input-field">
        <template #label>URL Εικόνας (Προαιρετικό)</template>
        <cdx-text-input
          v-model="imageUrl"
          placeholder="https://example.com/image.jpg"
        />
      </cdx-field>
    </div>

    <cdx-field class="dialog-field">
      <template #label>Όνομα του άρθρου</template>
      <cdx-text-input
        v-model="articleTitle"
        placeholder="Ένας συναρπαστικός τίτλος"
      />
    </cdx-field>
    
    <cdx-field class="dialog-field">
      <template #label>Slug</template>
      <cdx-text-input
        v-model="articleSlug"
        :disabled="true"
      />
    </cdx-field>

    <cdx-field class="dialog-field">
      <template #label>Συγγραφέας</template>
      <author-selector v-model="authorId" />
    </cdx-field>

    <cdx-field class="dialog-field">
      <template #label>Ημερομηνία Δημιουργίας</template>
      <cdx-text-input
        v-model="creationDate"
        :disabled="true"
      />
    </cdx-field>

    <cdx-field class="dialog-field">
      <cdx-checkbox v-model="isDraft">
        Να είναι πρόχειρο
      </cdx-checkbox>
    </cdx-field>
  </cdx-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import {
  CdxDialog,
  CdxField,
  CdxTextInput,
  CdxIcon,
  CdxProgressIndicator,
  CdxCheckbox
} from '@wikimedia/codex';
import { cdxIconImage } from '@wikimedia/codex-icons';
import AuthorSelector from './AuthorSelector.vue';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:open', 'create']);

const imageUrl = ref('');
const articleTitle = ref('');
const articleSlug = ref('');
const slugId = ref('');
const authorId = ref(null);
const creationDate = ref('');
const isDraft = ref(true);

const isLoadingImage = ref(false);
const imageLoadError = ref(false);

const primaryAction = computed(() => ({
  label: 'Δημιουργία',
  action: 'progressive',
  disabled: isLoadingImage.value || !articleTitle.value.trim() || !authorId.value
}));

const defaultAction = {
  label: 'Άκυρο',
};

const generateRandomId = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const slugify = (text) => {
  if (!text) return '';
  const greekMap = {
      'α': 'a', 'ά': 'a', 'Α': 'a', 'Ά': 'a', 'β': 'v', 'Β': 'v', 'γ': 'g', 'Γ': 'g',
      'δ': 'd', 'Δ': 'd', 'ε': 'e', 'έ': 'e', 'Ε': 'e', 'Έ': 'e', 'ζ': 'z', 'Ζ': 'z',
      'η': 'i', 'ή': 'i', 'Η': 'i', 'Ή': 'i', 'θ': 'th', 'Θ': 'th',
      'ι': 'i', 'ί': 'i', 'Ι': 'i', 'Ί': 'i', 'ϊ': 'i', 'ΐ': 'i', 'κ': 'k', 'Κ': 'k',
      'λ': 'l', 'Λ': 'l', 'μ': 'm', 'Μ': 'm', 'ν': 'n', 'Ν': 'n', 'ξ': 'x', 'Ξ': 'x',
      'ο': 'o', 'ό': 'o', 'Ο': 'o', 'Ό': 'o', 'π': 'p', 'Π': 'p', 'ρ': 'r', 'Ρ': 'r',
      'σ': 's', 'Σ': 's', 'ς': 's', 'τ': 't', 'Τ': 't',
      'υ': 'y', 'ύ': 'y', 'Υ': 'y', 'Ύ': 'y', 'ϋ': 'y', 'ΰ': 'y', 'φ': 'f', 'Φ': 'f',
      'χ': 'ch', 'Χ': 'ch', 'ψ': 'ps', 'Ψ': 'ps', 'ω': 'o', 'ώ': 'o', 'Ω': 'o', 'Ώ': 'o'
  };
  let transliteratedText = text.split('').map(char => greekMap[char] || char).join('');
  return transliteratedText
      .toString().toLowerCase()
      .replace(/\s+/g, '-').replace(/&/g, '-and-').replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
};

const updateSlug = () => {
    const slugBase = slugify(articleTitle.value);
    if (slugBase) {
        articleSlug.value = `${slugBase}-${slugId.value}`;
    } else {
        articleSlug.value = `-${slugId.value}`;
    }
};

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    // Reset state when dialog opens
    imageUrl.value = '';
    articleTitle.value = '';
    authorId.value = null;
    isDraft.value = true;
    isLoadingImage.value = false;
    imageLoadError.value = false;
    creationDate.value = new Date().toLocaleDateString('el-GR');
    slugId.value = generateRandomId(6);
    updateSlug(); // Set initial slug
  }
});

watch(articleTitle, () => {
    if (props.open) {
        updateSlug();
    }
});

watch(imageUrl, (newUrl) => {
  if (newUrl) {
    isLoadingImage.value = true;
    imageLoadError.value = false;
    const img = new Image();
    img.onload = () => { isLoadingImage.value = false; imageLoadError.value = false; };
    img.onerror = () => { isLoadingImage.value = false; imageLoadError.value = true; };
    img.src = newUrl;
  } else {
    isLoadingImage.value = false;
    imageLoadError.value = false;
  }
});

const onCreate = () => {
  emit('create', { 
    title: articleTitle.value, 
    slug: articleSlug.value, 
    author_id: authorId.value,
    image_url: imageUrl.value && !imageLoadError.value ? imageUrl.value : '',
    is_published: !isDraft.value
  });
};

const onClose = () => {
  emit('update:open', false);
};
</script>

<style scoped>
.image-url-field {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;
}
.image-preview {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border: 1px solid #c8ccd1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #f8f9fa;
}
.image-preview .cdx-icon {
  font-size: 40px;
  color: #72777d;
}
.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.url-input-field {
  flex-grow: 1;
}
.dialog-field {
  margin-bottom: 20px;
}

@media (max-width: 600px) {
  .image-url-field {
    flex-direction: column;
  }
  .image-url-field .url-input-field {
    margin-bottom: -20px;
  }
}
</style>

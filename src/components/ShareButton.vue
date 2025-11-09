<template>
  <div class="share-button-wrapper">
    <cdx-toggle-button
      ref="triggerElement"
      v-model="showPopover"
      aria-label="Κοινοποίηση άρθρου"
      weight="quiet"
    >
      <cdx-icon :icon="cdxIconShare" />
    </cdx-toggle-button>
    <cdx-popover
      v-model:open="showPopover"
      :anchor="triggerElement"
      placement="bottom-start"
      :render-in-place="true"
      title="Κοινοποίηση"
      :use-close-button="true"
      :icon="cdxIconShare"
    >
      <div class="share-options">
        <cdx-button
          weight="quiet"
          class="share-option"
          @click="copyLink"
          aria-label="Αντιγραφή συνδέσμου"
        >
          <cdx-icon :icon="cdxIconLink" />
          <span>{{ linkCopied ? 'Αντιγράφηκε!' : 'Αντιγραφή συνδέσμου' }}</span>
        </cdx-button>

        <cdx-button
          weight="quiet"
          class="share-option"
          @click="shareOnTwitter"
          aria-label="Κοινοποίηση στο X (Twitter)"
        >
          <cdx-icon :icon="cdxIconLogoX" />
          <span>X (Twitter)</span>
        </cdx-button>

        <cdx-button
          weight="quiet"
          class="share-option"
          @click="shareViaEmail"
          aria-label="Κοινοποίηση μέσω Email"
        >
          <cdx-icon :icon="cdxIconMessage" />
          <span>Email</span>
        </cdx-button>

        <cdx-button
          weight="quiet"
          class="share-option"
          @click="shareOnLinkedIn"
          aria-label="Κοινοποίηση στο LinkedIn"
        >
          <cdx-icon :icon="cdxIconLogoLinkedIn" />
          <span>LinkedIn</span>
        </cdx-button>

        <cdx-button
          weight="quiet"
          class="share-option"
          @click="shareOnFacebook"
          aria-label="Κοινοποίηση στο Facebook"
        >
          <cdx-icon :icon="cdxIconLogoFacebook" />
          <span>Facebook</span>
        </cdx-button>

        <cdx-button
          v-if="canUseNativeShare"
          weight="quiet"
          class="share-option"
          @click="nativeShare"
          aria-label="Περισσότερες επιλογές κοινοποίησης"
        >
          <cdx-icon :icon="cdxIconEllipsis" />
          <span>Περισσότερα...</span>
        </cdx-button>
      </div>
    </cdx-popover>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { CdxPopover, CdxToggleButton, CdxIcon, CdxButton } from '@wikimedia/codex';
import { 
  cdxIconShare, 
  cdxIconLink,
  cdxIconMessage,
  cdxIconEllipsis
} from '@wikimedia/codex-icons';
import notificationService from '../notification';

// Custom icons for social media (using SVG paths)
const cdxIconLogoX = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
};
const cdxIconLogoLinkedIn = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
};
const cdxIconLogoFacebook = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
};


const props = defineProps({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    default: () => window.location.href
  },
  description: {
    type: String,
    default: ''
  }
});

const triggerElement = ref();
const showPopover = ref(false);
const linkCopied = ref(false);

// Check if native share API is available
const canUseNativeShare = computed(() => {
  return typeof navigator !== 'undefined' && navigator.share;
});

// Copy link to clipboard
async function copyLink() {
  try {
    await navigator.clipboard.writeText(props.url);
    linkCopied.value = true;
    notificationService.push('Ο σύνδεσμος αντιγράφηκε στο πρόχειρο!', 'success');
    
    setTimeout(() => {
      linkCopied.value = false;
    }, 3000);
  } catch (err) {
    console.error('Failed to copy:', err);
    notificationService.push('Αποτυχία αντιγραφής συνδέσμου', 'error');
  }
}

// Share on Twitter/X
function shareOnTwitter() {
  const text = encodeURIComponent(props.title);
  const url = encodeURIComponent(props.url);
  window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    '_blank',
    'noopener,noreferrer,width=600,height=400'
  );
  showPopover.value = false;
}

// Share via Email
function shareViaEmail() {
  const subject = encodeURIComponent(props.title);
  const body = encodeURIComponent(
    `${props.description ? props.description + '\n\n' : ''}${props.url}`
  );
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
  showPopover.value = false;
}

// Share on LinkedIn
function shareOnLinkedIn() {
  const url = encodeURIComponent(props.url);
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    '_blank',
    'noopener,noreferrer,width=600,height=600'
  );
  showPopover.value = false;
}

// Share on Facebook
function shareOnFacebook() {
  const url = encodeURIComponent(props.url);
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    '_blank',
    'noopener,noreferrer,width=600,height=400'
  );
  showPopover.value = false;
}

// Native share (mobile)
async function nativeShare() {
  try {
    await navigator.share({
      title: props.title,
      text: props.description,
      url: props.url,
    });
    showPopover.value = false;
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Error sharing:', err);
      notificationService.push('Αποτυχία κοινοποίησης', 'error');
    }
  }
}
</script>

<style scoped>
.share-button-wrapper {
  display: inline-block;
  position: relative;
}

.share-options {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 200px;
}

.share-option {
  justify-content: flex-start;
  gap: 12px;
  padding: 8px 12px;
  width: 100%;
  text-align: left;
}

.share-option:hover {
  background-color: #f8f9fa;
}

.share-option span {
  flex: 1;
}

/* Custom icon styles for social media logos */
.share-option :deep(svg) {
  width: 20px;
  height: 20px;
}
</style>

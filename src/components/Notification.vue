<template>
  <transition name="fade" @after-leave="onAfterLeave">
    <cdx-message
      v-if="notification.visible"
      :type="notification.type"
      :icon="notificationIcon"
      allow-user-dismiss
      @user-dismissed="onDismiss"
      class="notification-message"
    >
      {{ notification.message }}
    </cdx-message>
  </transition>
</template>

<script setup>
import { computed } from 'vue';
import { CdxMessage } from '@wikimedia/codex';
import {
  cdxIconInfoFilled,
  cdxIconSuccess,
  cdxIconAlert,
  cdxIconError
} from '@wikimedia/codex-icons';
import notificationService from '../notification';

const props = defineProps({
  notification: {
    type: Object,
    required: true
  }
});

// Step 1: When user clicks dismiss, we just HIDE the notification.
// The data is still there.
const onDismiss = () => {
  notificationService.hide(props.notification.id);
};

// Step 2: After the fade-out animation is 100% complete, this event fires.
// NOW it is safe to remove the data from the list.
const onAfterLeave = () => {
  notificationService.dismiss(props.notification.id);
};

const notificationIcon = computed(() => {
  switch (props.notification.type) {
    case 'success':
      return cdxIconSuccess;
    case 'warning':
      return cdxIconAlert;
    case 'error':
      return cdxIconError;
    case 'info':
    default:
      return cdxIconInfoFilled;
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.notification-message {
  margin-bottom: 8px; /* Add some space between notifications */
}
</style>


import { reactive, readonly } from 'vue';

const state = reactive({
  notifications: []
});

let nextId = 0;

// By removing the default 'info' type, notifications will now use the
// default type of the cdx-message component, which is 'notice'.
const push = (message, type, duration = 5000) => {
  const id = nextId++;
  // Add a 'visible' state for our new two-phase dismissal process
  state.notifications.push({ id, message, type, visible: true });

  if (duration > 0 && type !== 'error') {
    setTimeout(() => {
      // This now calls 'hide', not 'dismiss'
      hide(id);
    }, duration);
  }
};

// Phase 1: Mark the notification as not visible to trigger the leave animation.
// The data remains in the array.
const hide = (id) => {
  const notif = state.notifications.find((n) => n.id === id);
  if (notif) {
    notif.visible = false;
  }
};

// Phase 2: Remove the notification from the array. This is only called after
// the animation is complete.
const dismiss = (id) => {
  const index = state.notifications.findIndex((n) => n.id === id);
  if (index !== -1) {
    state.notifications.splice(index, 1);
  }
};

export default {
  state: readonly(state),
  push,
  hide,
  dismiss
};

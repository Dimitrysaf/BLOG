import { reactive } from 'vue';

// A reactive object to hold the loading state.
const state = reactive({
  isVisible: false,
});

// The service that components will use to show/hide the loader.
const loadingService = {
  // Expose the reactive state so components can react to it (e.g., v-if).
  state,

  // Method to turn the loading bar on.
  show() {
    state.isVisible = true;
  },

  // Method to turn the loading bar off.
  hide() {
    state.isVisible = false;
  },
};

// Export the service as the default export of this module.
export default loadingService;

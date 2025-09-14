
import { reactive, readonly } from 'vue';

const state = reactive({
  isVisible: false
});

const show = () => {
  state.isVisible = true;
};

const hide = () => {
  state.isVisible = false;
};

export default {
  state: readonly(state),
  show,
  hide
};

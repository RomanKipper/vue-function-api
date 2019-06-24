import { onMounted, onDestroyed } from 'vue';
import { showSmartBanner, hideSmartBanner } from 'blocks/common/django/smart-banner';

export default () => {
  onMounted(() => {
    hideSmartBanner();
  });
  onDestroyed(() => {
    showSmartBanner();
  });
};

import { computed } from 'vue';
import deviceProps from 'blocks/common/utils/device-props';

export default () => {
  const isMobile = computed(() => deviceProps.screenSize === 'phone' || deviceProps.screenSize === 'tablet');
  const isDesktop = computed(() => !isMobile.value);
  const isTouch = computed(() => deviceProps.isTouch);

  return {
    isMobile,
    isDesktop,
    isTouch,
  };
};

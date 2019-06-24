import deviceProps from 'blocks/common/utils/device-props';

/**
 * Миксин для responsive компонентов
 * @type {{computed: {isDesktop(): function, isMobile(): function}}}
 */
export default {
  computed: {
    isMobile() {
      return deviceProps.screenSize === 'phone' || deviceProps.screenSize === 'tablet';
    },
    isDesktop() {
      return !this.isMobile;
    },
    isTouch() {
      return deviceProps.isTouch;
    },
  },
};
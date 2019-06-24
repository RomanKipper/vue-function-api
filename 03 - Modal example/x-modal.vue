<template>
  <portal :to="`modal-${level}`">
    <v-swiper
      ref="swiperComponent"
      :options="swiperOptions"
      class="modal"
      :class="classModifiers"
      @ready="onSwiperReady"
      @slide-change-transition-end="onSlideChangeTransitionEnd"
    >
      <!-- Резервируем пустой слайд для целей анимации -->
      <v-swiper-slide/>
      <v-swiper-slide>
        <div
          v-on-click-away="onBackgroundClick"
          class="modal__container"
        >
          <div
            v-if="$slots.header || navControlType !== 'none'"
            :class="{ modal__header_transparent: !$slots.header }"
            class="modal__header"
          >
            <template v-if="navControlType === 'back'">
              <x-icon
                v-if="msite1671"
                :type="iconTypes.backward"
                :size="40"
                class="modal__back"
                @click="close"
              />
              <x-icon
                v-else
                :type="iconTypes.arrowNormalBlack"
                :size="40"
                direction="left"
                class="modal__back"
                @click="close"
              />
            </template>
            <!-- Здесь указывается текст заголовка -->
            <slot name="header"></slot>
            <x-icon
              v-if="navControlType === 'close'"
              :type="iconTypes.cross"
              :size="40"
              class="modal__close"
              @click="close"
            />
          </div>
          <div class="modal__body">
            <!-- Основная (прокручиваемая) область -->
            <slot></slot>
          </div>
          <div
            v-if="$slots.bottom"
            class="modal__bottom"
          >
            <!-- Нижняя прибитая часть -->
            <slot name="bottom"></slot>
          </div>
        </div>
      </v-swiper-slide>
    </v-swiper>
  </portal>
</template>

<script>
import Vue from 'vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { isExperimentOn } from 'blocks/common/utils/experiment';
import { showSmartBanner, hideSmartBanner } from 'blocks/common/django/smart-banner';
import iconTypes from 'blocks/x-icon/icon-types';
import Icon from 'blocks/x-icon/x-icon.vue';

const NAV_CONTROL_TYPES = ['back', 'close', 'none'];

const EMPTY_SLIDE_INDEX = 0;
const MODAL_SLIDE_INDEX = 1;

const sharedState = Vue.observable({
  /* Следим за уровнем вложенности модалов */
  topmostModalLevel: -1,
});

/* Запоминаем позицию скролла, чтобы после закрытия модала пользователя не выкидывало наверх */
let pageScrollY = 0;

export default {
  components: {
    'v-swiper': swiper,
    'v-swiper-slide': swiperSlide,
    'x-icon': Icon,
  },
  props: {
    navControlType: {
      type: String,
      validator: value => NAV_CONTROL_TYPES.includes(value),
      default: 'close',
    },
    isExpEnabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    sharedState.topmostModalLevel += 1;
    return {
      level: sharedState.topmostModalLevel,
      iconTypes,
    };
  },
  computed: {
    msite1671() {
      return this.isExpEnabled && isExperimentOn('MSITE_1671_modalwindow');
    },
    isTopmostModal() {
      return this.level === sharedState.topmostModalLevel;
    },
    classModifiers() {
      return {
        [`modal_nav_${this.navControlType}`]: true,
        modal_msite1671: this.msite1671,
      };
    },
    swiper() {
      return this.$refs.swiperComponent.swiper;
    },
    swiperOptions() {
      return {
        direction: 'vertical',
        allowTouchMove: false,
        initialSlide: this.msite1671 ? EMPTY_SLIDE_INDEX : MODAL_SLIDE_INDEX,
      };
    },
  },
  mounted() {
    if (this.level === 0) {
      if (this.msite1671) {
        document.body.classList.add('overflow');
      } else {
        pageScrollY = window.pageYOffset;
        // TODO: После включения класса fixed (position: fixed) body почему-то здорово разносит
        // чтобы этого избежать, вручную проставляем нормальные размеры
        document.body.style.width = '100%';
        document.body.classList.add('overflow', 'fixed');
        hideSmartBanner();
      }
    }
  },
  destroyed() {
    sharedState.topmostModalLevel -= 1;
    if (this.level === 0) {
      if (this.msite1671) {
        document.body.classList.remove('overflow');
      } else {
        document.body.classList.remove('overflow', 'fixed');
        document.body.style.width = '';
        showSmartBanner();
        window.scrollTo(0, pageScrollY);
      }
    }
  },
  methods: {
    close() {
      if (this.msite1671) {
        this.swiper.slideTo(EMPTY_SLIDE_INDEX);
      } else {
        this.commitClose();
      }
    },
    commitClose() {
      if (this.$listeners.close) {
        this.$emit('close');
      } else {
        this.$router.back();
      }
    },
    onSwiperReady() {
      if (this.msite1671) {
        this.swiper.slideTo(MODAL_SLIDE_INDEX);
      }
    },
    onSlideChangeTransitionEnd() {
      if (this.swiper.activeIndex === MODAL_SLIDE_INDEX) {
        this.swiper.allowTouchMove = true;
        this.swiper.allowSlideNext = false;
      } else if (this.swiper.activeIndex === EMPTY_SLIDE_INDEX) {
        this.commitClose();
      }
    },
    onBackgroundClick() {
      if (this.isTopmostModal) {
        this.close();
      }
    },
  },
};
</script>

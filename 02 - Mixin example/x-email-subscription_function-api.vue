<template>
  <div
    class="email-subscription"
  >
    <div class="email-subscription__head">
      <span class="email-subscription__icon"></span>
      <div>Подписаться на рассылку</div>
    </div>
    <div v-if="isMobile"> <!-- now it's obvious where this flag came from -->
      <div class="email-subscription__body">
        <x-input-email
          v-model="email"
          :enable-suggestions="true"
          class="email-subscription__input"
          name="email"
        >
          <x-button
            class="email-subscription__ok"
            theme="black"
            :size="32"
            label="Ok"
            @click="isConfirmed = !errors.any()"
          />
        </x-input-email>
      </div>
    </div>
    <div
      v-else
      class="email-subscription__body"
    >
      <x-input-email
        v-model="email"
        class="email-subscription__input"
        name="email"
      />
      <x-button
        class="email-subscription__gender"
        :size="32"
        theme="accented"
        label="Женщинам"
        @click="subscribeByGender('women')"
      />
      <x-button
        class="email-subscription__gender"
        :size="32"
        theme="accented"
        label="Мужчинам"
        @click="subscribeByGender('men')"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import * as ACTIONS from 'blocks/common/store/action-types';
import XButton from 'blocks/x-button/x-button.vue';
import XInputEmail from 'blocks/x-input-email/x-input-email.vue';
import XLink from 'blocks/x-link/x-link.vue';
import MModal from 'blocks/x-modal/x-modal.vue';
import useResponsive from './useResposive';

export default {
  components: {
    'x-link': XLink,
    'x-input-email': XInputEmail,
    'x-button': XButton,
    'm-modal': MModal,
  },
  mixins: [ResponsiveMixin],
  data() {
    return {
      email: '',
      isConfirmed: false,
    };
  },
  methods: {
    ...mapActions({
      subscribeNewsletter: ACTIONS.USER_SUBSCRIBE_NEWSLETTER,
    }),
    async subscribeByGender(gender) {
      await this.subscribeNewsletter({
        gender,
        email: this.email,
      });
    },
  },
  setup() {
    const { isMobile } = useResponsive();
    return { isMobile };
  },
};
</script>

<template lang="pug">
  .container
    h2.title 로그인

    form.form(v-model="form" @submit.prevent="submit")
      .form-control
        label(for="username") 아이디
        input.form-input(
          id="username"
          placeholder="아이디를 입력하세요."
          v-model="form.username"
        )

      .form-control
        label(for="password") 비밀번호
        input.form-input(
          id="password"
          type="password"
          placeholder="8자리 이상 입력하세요."
          v-model="form.password"
        )

      .form-control.buttons
        button.btn-login(type="button" @click="submit") 로그인
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import * as T from '@/store/auth/types';

const settingsStore = namespace('settings');
const authStore = namespace('auth');

@Component({
  components: {
  },
})
export default class Login extends Vue {
  @Prop()
  private header!: string | null;

  private form: T.ILoginForm = {
    username: '',
    password: '',
  };

  @settingsStore.Mutation private updateHeader!: (header: string | null) => void;
  @authStore.Action private postAuth!: (form: T.ILoginForm) => T.IUser;

  private async submit() {
    this.postAuth(this.form);
  }

  private mounted() {
    this.updateHeader(null);
  }
}
</script>

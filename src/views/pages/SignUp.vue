<template lang="pug">

  .container

    .container-step(
      :class="[`step-${step}`]"
      v-if="step === 1"
    )
      form(autocomplete="off" @submit.native.prevent="signup")
        .form-control
          label 아이디 입력
          input(placeholder="3~20 글자 길이로 입력해주세요.")

        .form-control
          label 이메일 입력
          input(type="email")

        .form-control
          label 이메일 재입력
          input(type="email")

        .form-control
          label 비밀번호 입력
          input(type="password")

        .agreement-guide
          | 확인을 누르면 서비스 약관 및 개인정보 보호정에 동의하는 것으로 간주합니다.

        .form-control
          button(type="submit") 확인

    .container-step(
      :class="[`step-${step}`]"
      v-if="step === 2"
    )
      h3 이메일 확인

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SignUp extends Vue {
  @Prop({ default: 1 }) private step!: number;

  private async signup() {
    this.step = 2;
  }
}
</script>

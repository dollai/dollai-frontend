<template lang="pug">

  .container

    .container-step.step-1(v-if="current === 1")
      validation-observer(v-slot="{ passes }")
        form(
          autocomplete="off"
          v-model="form"
          @submit.prevent="passes(signup)"
        )
          validation-provider(
            rules="required"
            v-slot="{ errors }"
            name="아이디 "
          )
            .form-control.form-username(:class="{'has-error': !!errors[0]}")
              label 아이디 입력
              input(
                placeholder="3~20 글자 길이로 입력해주세요."
                v-model="form.username"
              )
              .help-block(v-show="errors[0]") {{ errors[0] }}

          validation-provider(
            vid="email"
            rules="required|email"
            v-slot="{ errors }"
            name="이메일 "
          )
            .form-control.form-email(:class="{'has-error': !!errors[0]}")
              label 이메일 입력
              input(
                type="email"
                v-model="form.email"
              )
              .help-block(v-show="errors[0]") {{ errors[0] }}

          validation-provider(
            rules="confirmed:email"
            v-slot="{ errors }"
            name="이메일 재입력 "
          )
            .form-control.form-email-confirmation(:class="{'has-error': !!errors[0]}")
              label 이메일 재입력
              input(
                type="email"
                v-model="form.email_again"
              )
              .help-block(v-show="errors[0]") {{ errors[0] }}

          validation-provider(
            rules="required|password"
            v-slot="{ errors }"
            name="비밀번호 "
          )
            .form-control.form-password(:class="{'has-error': !!errors[0]}")
              label 비밀번호 입력
              input(
                type="password"
                v-model="form.password"
              )
              .help-block(v-show="errors[0]") {{ errors[0] }}

          .agreement-guide
            | 확인을 누르면 서비스 약관 및 개인정보 보호정책에 동의하는 것으로 간주합니다.

          .form-control
            button.btn-submit.btn-submit__step1(type="button" @click="passes(signup)") 확인

    .container-step.step-2(v-if="current === 2")
      h2 이제 하나만 더...

      p.guide-text.guide-check-email
        span.emphasized 이메일 받은 편지함
        | 에서
        span.emphasized 가입확인 버튼
        | 을 눌러주세요.

      p.guide-text.guide-check-spam
        span.emphasized 이메일을 받지 못하셨나요? 스팸 메일함
        | 또는

      p.guide-resend-email
        button.btn.btn-submit__step2(type="button" @click="current = 3") 가입 이메일 재발송 요청

    .container-step.step-3(v-if="current === 3")
      h2 가입 이메일 재발송

      validation-observer(v-slot="{ passes }")
        form(
          autocomplete="off"
          @submit.prevent="passes(resendVerifyingEmail)"
        )
          validation-provider(
            vid="email"
            rules="required|email"
            v-slot="{ errors }"
            name="이메일 "
          )
            .form-control.form-email(:class="{'has-error': !!errors[0]}")
              label 이메일(e-mail)
              input(
                type="email"
                v-model="form.email"
              )
              .help-block(v-show="errors[0]") {{ errors[0] }}

          p.guide-resend-email
            button.btn.btn-submit__step3(type="button" @click="passes(resendVerifyingEmail)") 확인

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class SignUp extends Vue {
  @Prop({ default: 1 }) private step!: number;

  private current: number = 0;

  private form = {
    username: '',
    email: '',
    email_again: '',
    password: '',
  };

  private async signup() {
    this.resetForm();
    this.current = 2;
  }

  private async resendVerifyingEmail() {
    this.current = 2;
  }

  private resetForm() {
    this.form = {
      username: '',
      email: '',
      email_again: '',
      password: '',
    };
  }

  private created() {
    this.current = this.step;
    this.resetForm();
  }
}
</script>

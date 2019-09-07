<template lang="pug">

  .container

    .container-step(
      :class="[`step-${step}`]"
      v-if="step === 1"
    )
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

    .container-step(
      :class="[`step-${step}`]"
      v-if="step === 2"
    )
      h2 이메일 확인

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class SignUp extends Vue {
  @Prop({ default: 1 }) private step!: number;

  private form = {
    username: '',
    email: '',
    email_again: '',
    password: '',
  };

  private async signup() {
    this.step = 2;
  }
}
</script>

<template lang="pug">
  modal.subjective-form(
    name="subjective-form"
    width="331px"
    height="auto"
  )
    .form-wrapper
      h5.title 내 습관 실행 내용 기록하기

      form.form(v-model="subjectiveForm")
        textarea.form-input.form-input__content(
          v-model="subjectiveForm.content"
          placeholder="글을 입력해 주세요"
        )
        .buttons
          button.btn.btn-submit(@click.prevent="submit") 완료
          button.btn.btn-cancel(@click.prevent="cancel") 취소
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import * as T from '@/store/story/types';

const storyStore = namespace('story');

@Component({
  components: {
  },
})
export default class SubjectiveForm extends Vue {
  @Prop() private data!: T.IMessage;

  private subjectiveForm: T.ISubjectiveForm = {
    message: null,
    content: '',
  };

  public show(message: T.IMessage | null) {
    this.subjectiveForm.message = message ? message.uid : null;
    this.$modal.show('subjective-form');
  }

  public hide() {
    this.$modal.hide('subjective-form');
  }

  private submit() {
    this.$modal.hide('subjective-form');
    this.$emit('submitForm', this.subjectiveForm);
  }

  private cancel() {
    this.$modal.hide('subjective-form');
    this.$emit('cancelForm');
  }

}
</script>

<style lang="stylus" scoped>
@import "~@/assets/styles/variables.styl"

.subjective-form::v-deep
  .v--modal-box
    border-radius 20px

  .form-wrapper
    padding 34px 25px 27px

  .title
    font-family $default-font-family
    font-size $default-font-size
    padding 8px 0 9.5px

  .form-input__content
    border none
    width 100%
    height 242px
    border-top 1px solid rgba(0, 0, 0, 0.63)
    border-bottom 1px solid rgba(0, 0, 0, 0.63)
    font-size 0.9375rem
    padding 11px 0

    &::placeholder, &::-webkit-input-placeholder
      color #bfbfbf

  .buttons
    display flex
    padding-top 25px

    .btn
      width 100%
      flex 1 0 0
      &:first-child
        margin-right 8px
</style>

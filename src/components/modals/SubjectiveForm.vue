<template lang="pug">
  modal.subjective-form(
    name="subjective-form"
    width="331px"
  )
    h5 내 습관 실행 내용 기록하기

    textarea(
      v-model="content"
      placeholder="글을 입력해 주세요"
    )
    .buttons
      button(@click.prevent="submit") 완료
      button(@click.prevent="cancel") 취소
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

  private content: string | null = null;

  private submit() {
    this.$modal.hide('subjective-form');
    this.$emit('submit');
  }

  private cancel() {
    this.$modal.hide('subjective-form');
    this.$emit('cancel');
  }

  private mounted() {
    this.$modal.show('subjective-form');
  }
}
</script>

<style lang="stylus" scoped>
</style>

<template lang="pug">
  .container.messaage-container.subjective-answer
    .body
      .player-names
        | {{ user.name }}
      .content()
        | {{ text }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import * as T from '@/store/story/types';
import * as authT from '@/store/auth/types';
import {
  formatting,
} from '@/filters/message';

const storyStore = namespace('story');
const authStore = namespace('auth');

@Component({
  components: {
  },
})
export default class SubjectiveAnswer extends Vue {
  @Prop() private text!: string;

  @authStore.Getter('user') private loggedUser!: authT.IUser | null;
  @authStore.Getter private anonymousUser!: authT.IUser;

  private get user(): authT.IUser {
    return this.loggedUser || this.anonymousUser;
  }
}
</script>

<style lang="stylus" scoped>
.subjective-answer
  display flex
  justify-content flex-end
  align-items flex-end
  padding-right 22px

  .body
    padding 12px 16px
    margin-left 12px
    text-align left
    border-top-left-radius 23px
    border-top-right-radius 23px
    border-bottom-left-radius 23px
    border 1px solid #000
    min-width 248px
    width 263px

    .player-names
      font-size 0.9375rem
      margin-bottom 5px

    .content
      font-size 0.9375rem
      line-height 1.33
</style>

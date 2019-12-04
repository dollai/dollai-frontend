<template lang="pug">
  .container.messaage-container.message-default
    .players
      img.player(:src="players[0].image")
    .body
      .player-names
        | {{ players[0].name }}
      .content()
        div(v-html="data.content")
        div(v-if="data.style.template === 'youtube-embed'")
          a(
            :href="`https://youtu.be/${data.attachments[0].url}`"
            target="_blank"
          ) 영상 보러가기
        div(v-else-if="data.style.template === 'link-url'")
          a(
            :href="data.attachments[0].url"
            target="_blank"
          ) 방문하기
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
export default class MessageDefault extends Vue {
  @Prop() private data!: T.IMessage;

  @storyStore.Getter('players') private storyPlayers!: T.IPlayer[];
  @storyStore.Mutation private updatePlayingYoutubeVideo!: void;

  private get players(): T.IPlayer[] {
    return this.storyPlayers.filter((o) => this.data.players.findIndex((p) => p.code === o.code));
  }

  private playYoutube(uid: string) {
    console.log(uid);
  }
}
</script>

<style lang="stylus" scoped>
.message-default
  display flex
  justify-content flex-start
  align-items flex-end
  padding 18px 36px 10px 18px

  .players
    width 46px
    height 46px
    .player
      border-radius 100%

  .body
    padding 12px 16px
    margin-left 12px
    text-align left
    background-color #1bd9bf
    border-top-left-radius 23px
    border-top-right-radius 23px
    border-bottom-right-radius 23px
    min-width 248px
    width 263px

    .player-names
      color #fff
      font-size 0.9375rem
      margin-bottom 5px

    .content
      color #fff
      font-size 0.9375rem
      line-height 1.33
</style>

<template lang="pug">
  .container
    .message-container(@click="nextAction")
      .message(
        v-for="item in messages"
      )
        span {{ item.content }}
        .objective-options(
          v-if="isVisibleObjectiveOptions(item)"
          v-for="opt in item.objective_options"
        )
          .option(@click="chooseObjectiveOption(opt)") {{ opt.content }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import * as T from '@/store/story/types';

const settingsStore = namespace('settings');
const storyStore = namespace('story');

@Component({
  components: {
  },
})
export default class StoryDetail extends Vue {
  @Prop()
  private header!: string | null;

  @settingsStore.Mutation private updateHeader!: (header: string | null) => void;
  @storyStore.Action('fetchStory') private fetchStoryAction!: (code: string) => Promise<any>;
  @storyStore.Action('fetchScene') private fetchSceneAction!: (uid: string) => Promise<any>;
  @storyStore.Action('fetchMessage') private fetchMessageAction!: (opt: {uid: string, params?: any}) => Promise<any>;
  @storyStore.Action('fetchObjectiveOptions') private fetchObjectiveOptionsAction!: (uid: string) => Promise<any>;

  private story: T.IStory | null = null;
  private scene: T.IScene | null = null;
  private messages: T.IMessage[] = [];
  private idleMessages: T.IMessage[] = [];
  private currentMessageIndex: number = -1;
  private dispatchTid: number | undefined = undefined;
  private objectiveOptions: T.IObjectiveOption[] = [];

  private async fetchStory() {
    const code = this.$route.params.code;
    this.story = await this.fetchStoryAction(code);
  }

  private async fetchScene(uid: string | null) {
    if (!uid) {
      return;
    }
    this.scene = await this.fetchSceneAction(uid);
  }

  private async fetchMessage(uid: string | null) {
    if (!uid) {
      return;
    }
    const message = await this.fetchMessageAction({uid});
    console.log(uid, message);
    this.idleMessages.push(message);
    this.currentMessageIndex = this.messages.length - 1;
  }

  private get isFinished(): boolean {
    const message = this.messages[this.currentMessageIndex];
    if (!message) { return false; }
    return this.idleMessages.length === 0
      && !message.next_scenes
      && (!message.nexts || !message.nexts.length);
  }

  private isVisibleObjectiveOptions(message: T.IMessage) {
    return message.kind === 'objectives'
      && message.objective_options
      && this.currentMessage
      && this.currentMessage.uid === message.uid;
  }

  private get currentMessage(): T.IMessage | null {
    return this.currentMessageIndex === -1 || !this.messages.length
      ? null
      : this.messages[this.currentMessageIndex];
  }

  private async nextAction() {
    if (this.isFinished) {
      alert('끝');
      return;
    }
    await this.nextScene();
    if (!this.idleMessages.length) {
      await this.nextMessage();
    }
  }

  private async nextScene() {
    if (!this.story) { return; }
    if (!this.scene) {
      await this.fetchScene((this.story as T.IStory).start_scene || null);
    }
    if (!this.messages.length && !this.idleMessages.length) {
      await this.fetchMessage((this.scene as T.IScene).start_message || null);
    }
  }

  private async nextMessage() {
    if (this.currentMessageIndex === -1 || !this.messages.length) { return; }
    if (!this.scene) { return; }

    const message = this.currentMessage as T.IMessage;
    if (!message.nexts || !message.nexts.length) { return; }

    if (message.kind === 'default' || message.kind === 'subjectives') {
      await this.fetchMessage(message.nexts[0]);
    }
  }

  private initDispatchMessage() {
    this.dispatchTid = setInterval(() => {
      if (!this.idleMessages.length) { return; }
      this.moveToNextMessage();
    }, 200);
  }

  private moveToNextMessage() {
    this.messages.push(this.idleMessages.splice(0, 1)[0]);
    this.currentMessageIndex = this.messages.length - 1;
  }

  private async chooseObjectiveOption(item: T.IObjectiveOption) {
    if (item.next_scene !== null) {
      await this.fetchSceneAction(item.next_scene);
    }
    await this.fetchMessage(item.next_message);
    this.moveToNextMessage();
  }

  private async mounted() {
    this.initDispatchMessage();
    await this.fetchStory();
    this.updateHeader(this.story ? this.story.name : null);
    await this.nextAction();
  }

  private beforeDestroy() {
    clearInterval(this.dispatchTid);
  }
}
</script>

<style lang="stylus">
  .message-container
    border: 1px solid #f00
</style>

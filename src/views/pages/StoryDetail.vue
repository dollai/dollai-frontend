<template lang="pug">
  .container
    h3.title(v-if="title") {{ title }}

    .message-container(@click="nextAction")
      .message(
        v-for="item in messages"
      )
        message-default(
          v-if="item.kind === 'default'"
          :data="item"
        )
        .objective-options(
          v-if="isVisibleObjectiveOptions(item)"
          v-for="opt in item.objective_options"
        )
          .option(@click="chooseObjectiveOption(opt)") {{ opt.content }}

      .subjectives-form-container(v-show="isVisibleSubjectiveForm")
        form.subjectives-form(
          v-model="subjectiveForm"
        )
          h4 내 습관 실행 내용 입력하기
          textarea(placeholder="글을 입력해 주세요.")
          button(@click.prevent="submitSubjectiveForm") 완료
          button(@click.prevent="cancelSubjectiveForm") 취소
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import * as T from '@/store/story/types';
import MessageDefault from '@/components/messages/MessageDefault.vue';

const settingsStore = namespace('settings');
const storyStore = namespace('story');

@Component({
  components: {
    MessageDefault,
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
  private isVisibleSubjectiveForm: boolean = false;
  private subjectiveForm: T.ISubjectiveForm = {
    message: null,
    content: '',
  };

  private get title(): string | null {
    return this.story ? this.story.name : null;
  }

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
    if (this.isVisibleSubjectiveForm) { return; }
    if (this.currentMessageIndex === -1 || !this.messages.length) { return; }
    if (!this.scene) { return; }

    const message = this.currentMessage as T.IMessage;
    if (!message.nexts || !message.nexts.length) { return; }

    if (message.kind === 'default') {
      await this.fetchMessage(message.nexts[0]);
    } else if (message.kind === 'subjectives') {
      this.isVisibleSubjectiveForm = true;
    }
  }

  private async submitSubjectiveForm() {
    this.isVisibleSubjectiveForm = false;
    const message = this.currentMessage as T.IMessage;
    await this.fetchMessage(message.nexts[0]);
  }

  private cancelSubjectiveForm() {
    this.isVisibleSubjectiveForm = false;
  }

  private initDispatchMessage() {
    this.dispatchTid = setInterval(() => {
      if (!this.idleMessages.length) { return; }
      this.moveIdleToActive();
    }, 200);
  }

  private moveIdleToActive() {
    this.messages.push(this.idleMessages.splice(0, 1)[0]);
    this.currentMessageIndex = this.messages.length - 1;
  }

  private async chooseObjectiveOption(item: T.IObjectiveOption) {
    if (item.next_scene !== null) {
      await this.fetchSceneAction(item.next_scene);
    }
    await this.fetchMessage(item.next_message);
    this.moveIdleToActive();
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

<style lang="stylus" scoped>
.message-container
  border: 1px solid #f00

.title
  background-color #000
  color #fff
  font-size 0.8125rem
  padding 2px
</style>

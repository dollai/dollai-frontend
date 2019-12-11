<template lang="pug">
  .container
    h3.title(v-if="title") {{ title }}

    .messages-container(ref="messageContainer" @click="nextAction")
      .message(
        v-for="item in messages"
      )
        message-default(
          v-if="item.kind === 'message'"
          :data="item.message"
        )

    .youtube-embed-container(v-show="playingYoutubeVideo")
      iframe(
        width="560" height="315"
        class="youtube-frame"
        frameborder="0" allow="autoplay; encrypted-media"
        allowfullscreen
        allowscriptaccess="always"
        :src="`https://www.youtube.com/embed/${playingYoutubeVideo}?enablejsapi=1`"
      )
    subjective-form.modal(
      ref="subjectiveForm"
      @submitForm="submitSubjectiveForm"
      @cancelForm="cancelSubjectiveForm"
    )
    objective-options.objective-options-container(
      ref="objectiveOptions"
      @chooseOption="chooseObjectiveOption"
    )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import * as T from '@/store/story/types';
import MessageDefault from '@/components/messages/MessageDefault.vue';
import ObjectiveOptions from '@/components/messages/ObjectiveOptions.vue';
import SubjectiveForm from '@/components/modals/SubjectiveForm.vue';
import * as authT from '@/store/auth/types';

const settingsStore = namespace('settings');
const storyStore = namespace('story');
const authStore = namespace('auth');

@Component({
  components: {
    MessageDefault,
    ObjectiveOptions,
    SubjectiveForm,
  },
})
export default class StoryDetail extends Vue {
  @Prop()
  private header!: string | null;

  @settingsStore.Mutation private updateHeader!: (header: string | null) => void;
  @storyStore.Action private fetchPlayers!: (params?: any) => Promise<any>;
  @storyStore.Action('fetchStory') private fetchStoryAction!: (code: string) => Promise<any>;
  @storyStore.Action('fetchScene') private fetchSceneAction!: (uid: string) => Promise<any>;
  @storyStore.Action('fetchMessage') private fetchMessageAction!: (opt: {uid: string, params?: any}) => Promise<any>;
  @storyStore.Action('fetchObjectiveOptions') private fetchObjectiveOptionsAction!: (uid: string) => Promise<any>;
  @storyStore.Getter private playingYoutubeVideo!: string | null;
  @authStore.Getter private user!: authT.IUser | null;

  private story: T.IStory | null = null;
  private scene: T.IScene | null = null;
  private messages: T.IUserMessage[] = [];
  private idleMessages: T.IMessage[] = [];
  private currentMessageIndex: number = -1;
  private dispatchTid: number | undefined = undefined;
  private objectiveOptions: T.IObjectiveOption[] = [];
  private isVisibleSubjectiveForm: boolean = false;

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
    this.idleMessages.push(message);
    this.currentMessageIndex = this.messages.length - 1;
  }

  private get isFinished(): boolean {
    const userMessage = this.messages[this.currentMessageIndex];
    if (!userMessage) { return false; }
    const message = userMessage.message as T.IMessage;
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

  private get currentMessage(): T.IUserMessage | null {
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

    const userMessage = this.currentMessage as T.IUserMessage;
    const message = userMessage.message as T.IMessage;
    if (!message.nexts || !message.nexts.length) { return; }

    if (userMessage.kind === 'default') {
      await this.fetchMessage(message.nexts[0]);
    } else if (userMessage.kind === 'subjectives') {
      this.isVisibleSubjectiveForm = true;
      (this.$refs as any).subjectiveForm.show(message);
    } else if (userMessage.kind === 'objectives') {
      (this.$refs as any).objectiveOptions.show(message);
      this.$nextTick(() => {
        this.moveToBottomMessageContainer();
      });
    }
  }

  private async submitSubjectiveForm(form: T.ISubjectiveForm) {
    this.isVisibleSubjectiveForm = false;
    const userMessage = this.currentMessage as T.IUserMessage;
    await this.fetchMessage(userMessage.message!.nexts[0]);
  }

  private async cancelSubjectiveForm() {
    this.isVisibleSubjectiveForm = false;
    const userMessage = this.currentMessage as T.IUserMessage;
    await this.fetchMessage(userMessage.message!.nexts[0]);
  }

  private initDispatchMessage() {
    this.dispatchTid = setInterval(() => {
      if (!this.idleMessages.length) { return; }
      this.moveIdleToActive();
    }, 200);
  }

  private moveIdleToActive() {
    this.convertMessageToUserMessage(this.idleMessages.splice(0, 1)[0]);
    this.currentMessageIndex = this.messages.length - 1;
    this.moveToBottomMessageContainer();
  }

  private convertMessageToUserMessage(message: T.IMessage) {
    const data = {
      user: this.user ? this.user.username : '',
      message,
    };
    this.addToUserMessage('message', data);
  }

  private addToUserMessage(kind: string, data: any) {
    const message = {
      uid: `${(new Date().getDate())}`,
      user_story: this.story!.code,
      user: null,
      kind,
      message: null,
      objective_option: null,
      prev: null,
      user_input: null,
    };
    Object.assign(message, data);
    this.messages.push(message);
  }

  private async chooseObjectiveOption(item: T.IObjectiveOption) {
    if (item.next_scene !== null) {
      await this.fetchSceneAction(item.next_scene);
    }
    await this.fetchMessage(item.next_message);
    this.moveIdleToActive();
  }

  private moveToBottomMessageContainer() {
    this.$nextTick(() => {
      const el = ((this.$refs as any).messageContainer as Element);
      el.scrollTop = el.scrollHeight;
    });
  }

  private async mounted() {
    this.initDispatchMessage();
    await this.fetchStory();
    await this.fetchPlayers({ story: (this.story as T.IStory).code });
    this.updateHeader(this.story ? this.story.name : null);
    await this.nextAction();
  }

  private beforeDestroy() {
    clearInterval(this.dispatchTid);
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/assets/styles/variables.styl"

.title
  background-color #000
  color #fff
  font-size 0.8125rem
  padding 2px

.messages-container
  height calc(100vh - 100px)
  overflow-y auto

  .message:last-of-type
    margin-bottom 150px

.objective-options-container
  position fixed
  z-index 500
  bottom 0
  width $break-small-min
  padding 22px
</style>

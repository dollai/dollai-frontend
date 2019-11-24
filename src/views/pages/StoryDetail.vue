<template lang="pug">
  .container
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

  private story: T.IStory | null = null;
  private scene: T.IScene | null = null;

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

  private async mounted() {
    await this.fetchStory();
    await this.fetchScene((this.story as T.IStory).start_scene || null);
    this.updateHeader(this.story ? this.story.name : null);
  }
}
</script>

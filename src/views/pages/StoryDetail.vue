<template lang="pug">
  .container
    | hello world
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

  @settingsStore.Mutation private updateHeader!: (header: string) => void;
  @storyStore.Action('fetchStory') private fetchStoryAction!: (code: string) => Promise<any>;

  private story!: T.IStory;

  private async fetchStory() {
    // const code = this.$route.params.code;
    const code = 'story1';
    this.story = await this.fetchStoryAction(code);
  }

  private async mounted() {
    await this.fetchStory();
    this.updateHeader(this.story.name);
  }
}
</script>

<template lang="pug">
  .container
    | hello world
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const settingsStore = namespace('settings');

@Component({
  components: {
  },
})
export default class StoryDetail extends Vue {
  @Prop()
  private header!: string | null;

  @settingsStore.Mutation private updateHeader!: (header: string) => void;

  private async mounted() {
    this.updateHeader('lorem');
  }
}
</script>

<template lang="pug">
  span {{ data.content }}
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
  @Prop()
  private data!: T.IMessage;
}
</script>

<template lang="pug">
  ul.objective-options-container(v-if="isVisible")
    li.btn-option(
      v-for="item in options"
      @click="choose(item)"
    )
      | {{ item.content }}
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
export default class ObjectiveOptions extends Vue {
  private data: T.IMessage | null = null;
  private isVisible: boolean = false;

  public show(message: T.IMessage | null) {
    this.data = message;
    this.isVisible = true;
  }

  public hide() {
    this.data = null;
    this.isVisible = false;
  }

  private get options(): T.IObjectiveOption[] {
    return this.data ? this.data.objective_options || [] : [];
  }

  private choose(item: T.IObjectiveOption) {
    this.hide();
    this.$emit('chooseOption', item);
  }
}
</script>

<style lang="stylus" scoped>
.objective-options-container
  .btn-option
    border-radius 23px
    box-shadow 0 0 10px 0 rgba(0, 0, 0, 0.35)
    background-color #fff
    font-family NotoSansCJKkr
    font-size 0.9375rem
    font-weight: 500
</style>

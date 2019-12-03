<template lang="pug">
  .detail-layer
    detail-header.detail-header
    router-view.detail-content
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import DetailHeader from './components/DetailHeader.vue';

const settingsStore = namespace('settings');

@Component({
  components: {
    DetailHeader,
  },
})
export default class Detail extends Vue {
  @Prop()
  private header!: string;

  @settingsStore.Getter('header') private getterHeader!: string | null;

  private get computedHeader(): string | null {
    return this.header || this.getterHeader || null;
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/variables.styl'

.detail-header
  height $navbar-height
  position fixed
  top 0
  left 50%
  transform translate(-50%, 0)
  width $break-small-min
  min-width 360px

.detail-content
  margin $navbar-height 0 0 0
</style>

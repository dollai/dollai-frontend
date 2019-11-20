<template lang="pug">
  .detail-layer
    detail-header(:header="computedHeader")
    router-view
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

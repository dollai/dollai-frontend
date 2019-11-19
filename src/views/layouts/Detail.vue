<template lang="pug">
  .detail-layer
    detail-header(:header="computedHeader")
    router-view
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DetailHeader from './components/DetailHeader.vue';

@Component({
  components: {
    DetailHeader,
  },
})
export default class Detail extends Vue {
  @Prop()
  private header!: string;

  private get computedHeader(): string | null {
    return null;
  }
}
</script>

<template lang="pug">
  .header-container
    .wrapper
      h2 doll.ai
    h3.title(v-if="header") {{ header }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class DetailHeader extends Vue {
  @Prop()
  private header!: string | null;
}
</script>

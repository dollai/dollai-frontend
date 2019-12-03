<template lang="pug">
  .header-container
    .wrapper
      h2.logo
        img.logo-image(src="/images/logo.svg" alt="doll.ai")
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

<style lang="stylus">
.header-container
  height 64px

.logo
  padding 12px 0
  text-align center

.logo-image
  width 100px
  height 40px
</style>

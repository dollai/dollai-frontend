<template lang="pug">
  .header-container
    .wrapper
      h2.logo
        img.logo-image(src="/images/logo.svg" alt="doll.ai")
      .btn-gnb
        img.icon.icon-hamburg(src="/images/icon-hamburg-menu.svg" alt="")
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

<style lang="stylus" scoped>
.logo
  padding 12px 0
  text-align center

.logo-image
  width 100px
  height 40px

.btn-gnb
  position absolute
  top 0
  right 5px
  transform translate(0, 50%)
  width 34px
  height 34px

</style>

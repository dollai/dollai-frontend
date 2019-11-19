<template lang="pug">
  .detail-layer
    detail-header
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
}
</script>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import * as authT from '@/store/auth/types';

const authStore = namespace('auth');

@Component({
  components: {
  },
})
export default class App extends Vue {
  @authStore.Action private fetchUser!: (username: string) => Promise<any>;
  @authStore.Getter private user!: authT.IUser | null;

  private async created() {
    const username = localStorage.getItem('username');
    if (username && !this.user) {
      await this.fetchUser(username);
    }
  }
}
</script>

<style lang="stylus">
@import '~@/assets/styles/variables.styl';
@import '~@/assets/styles/buttons.styl';

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  width $break-small-min
  height 100vh
  margin 0 auto
  border 1px solid #000
</style>

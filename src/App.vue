<template>
  <div id="app">
    <router-view/>
  </div>
</template>

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

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <LayOut/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import LayOut from '@/components/LayOut.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    LayOut
  }
}
</script>

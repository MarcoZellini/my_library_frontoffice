<script>
import { state } from './state.js';

import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  data() {
    return {
      state
    }
  },
  components: {
    AppHeader,
    AppFooter
  },
  created() {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    // console.log('user: ', userLocal);
    if (userLocal) {
      this.state.user = userLocal;
    }
  }
}
</script>

<template>
  <AppHeader />
  <router-view />
  <AppFooter />
</template>

<style></style>

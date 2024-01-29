import { createApp } from 'vue';
import './assets/scss/style.scss';
import App from './App.vue';
import * as bootstrap from 'bootstrap';
import { router } from './router.js'


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faTwitter, faInstagram, faFacebook)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app');

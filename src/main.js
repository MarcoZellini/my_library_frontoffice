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
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faTwitter, faInstagram, faFacebook, faArrowLeft, faPenToSquare, faTrash, faPlus)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');



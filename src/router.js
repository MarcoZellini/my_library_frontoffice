import { state } from './state.js';
import { createWebHashHistory, createRouter } from 'vue-router';


import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import BookListPage from './pages/BookListPage.vue';
import SingleBookPage from './pages/SingleBookPage.vue';
import NewBookPage from './pages/NewBookPage.vue';
import EditBookPage from './pages/EditBookPage.vue';
import NotFound from './pages/NotFound.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
    },
    {
        path: '/books',
        name: 'books',
        component: BookListPage,
    },
    {
        path: '/books/:id',
        name: 'book',
        component: SingleBookPage,
    },
    {
        path: '/books/create',
        name: 'new_book',
        component: NewBookPage,
    },
    {
        path: '/books/:id/edit',
        name: 'edit_book',
        component: EditBookPage
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from) => {
    // console.log('changing page');
    const userLocal = JSON.parse(localStorage.getItem('user'));
    // console.log(userLocal);
    if ((!state.user || !userLocal) && (to.name !== 'login' && to.name !== 'home')) {
        router.push({ name: 'login' })
    }
    if (to.name !== 'books') {
        state.bookDeleted = false;
    }
    // return false
})

export { router }
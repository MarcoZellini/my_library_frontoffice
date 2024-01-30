import { createWebHashHistory, createRouter } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import BookListPage from './pages/BookListPage.vue';
import SingleBookPage from './pages/SingleBookPage.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/books',
        name: 'books',
        component: BookListPage
    },
    {
        path: '/books/:id',
        name: 'book',
        component: SingleBookPage
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export { router }
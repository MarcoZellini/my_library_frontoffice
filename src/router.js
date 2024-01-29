import { createWebHashHistory, createRouter } from 'vue-router';

import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import BookListPage from './pages/BookListPage.vue'

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
        path: '/bookList',
        name: 'book_list',
        component: BookListPage
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export { router }
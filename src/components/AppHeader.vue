<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" :to="{ name: 'home' }">My Library</router-link>
            <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" :class="this.$route.name === 'home' ? 'active' : ''"
                            :to="{ name: 'home' }" @click="this.handleNavbarCollapse()">Home</router-link>
                    </li>
                    <li class="nav-item" v-if="!this.state.user">
                        <router-link class="nav-link" :class="this.$route.name === 'login' ? 'active' : ''"
                            :to="{ name: 'login' }" @click="this.handleNavbarCollapse()">Log
                            in</router-link>
                    </li>
                    <li class="nav-item" v-if="!this.state.user">
                        <router-link class="nav-link" :class="this.$route.name === 'register' ? 'active' : ''"
                            :to="{ name: 'register' }" @click="this.handleNavbarCollapse()">Register</router-link>
                    </li>
                    <li class="nav-item" v-if="this.state.user">
                        <router-link class="nav-link" :class="this.$route.name === 'books' ? 'active' : ''"
                            :to="{ name: 'books' }" @click="this.handleNavbarCollapse()">Book
                            List</router-link>
                    </li>
                    <li class="nav-item" v-if="this.state.user">
                        <router-link class="nav-link" :class="this.$route.name === 'logout' ? 'active' : ''"
                            :to="{ name: 'login' }" @click="logout(); this.handleNavbarCollapse()">Log
                            out</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

import { state } from '../state.js';

export default {
    data() {
        return {
            state
        }
    },
    methods: {
        logout() {
            this.state.user = null;
            localStorage.removeItem('user');
        },
        handleNavbarCollapse() {
            const navbarCollapse = document.getElementById('collapsibleNavId');
            navbarCollapse.classList.toggle('show');
        }
    }
}
</script>

<style lang="scss" scoped></style>
<template>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="#">My Library</a>
            <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" :class="this.$route.name === 'home' ? 'active' : ''"
                            data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                            :to="{ name: 'home' }">Home</router-link>
                    </li>
                    <li class="nav-item" v-if="!this.state.userId">
                        <router-link class="nav-link" :class="this.$route.name === 'login' ? 'active' : ''"
                            data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" :to="{ name: 'login' }">Log
                            in</router-link>
                    </li>
                    <li class="nav-item" v-if="this.state.userId">
                        <router-link class="nav-link" :class="this.$route.name === 'book_list' ? 'active' : ''"
                            data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                            :to="{ name: 'book_list' }">Book List</router-link>
                    </li>
                    <li class="nav-item" v-if="this.state.userId">
                        <router-link class="nav-link" :class="this.$route.name === 'logout' ? 'active' : ''"
                            data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" :to="{ name: 'login' }"
                            @click="logout()">Log out</router-link>
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
    }, methods: {
        logout() {
            state.userId = null;
        }
    }
}
</script>

<style lang="scss" scoped></style>
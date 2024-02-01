<template>
    <div id="site_main" class="vh-100">
        <div class="container py-5 h-100">
            <div class="row h-100 align-items-center">
                <div class="col text-center py-5" v-if="!this.state.user">
                    <h1 class="display-1 fw-bold mt-4">Welcome to My Library</h1>
                    <p class="display-6 my-4">Join Us to manage all your books!</p>
                    <div class="d-flex justify-content-center align-items-center py-5">
                        <router-link :to="{ name: 'login' }" class="btn btn-primary px-3 py-2">Log
                            in</router-link>
                        <div class="px-3">or</div>
                        <router-link :to="{ name: 'register' }" class="btn btn-primary px-3 py-2">Register</router-link>
                    </div>
                </div>
                <div class="col text-center py-5" v-if="this.state.user">
                    <h1 class="display-1 fw-bold">Welcome to<span class="text_primary d-block">My Library</span></h1>
                    <p class="display-6 my-4">Go to the book list page to manage all your books!</p>
                    <router-link :to="{ name: 'books' }" class="btn btn-primary px-3 py-2">Book
                        List</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { state } from '../state.js'

export default {
    data() {
        return {
            state
        }
    }
}
</script>

<style lang="scss" scoped></style>
<template>
    <div id="site_main">
        <div class="container py-5">
            <div class="row ">
                <div class="col text-center py-5" v-if="!this.state.user">
                    <h1 class="display-1 fw-bold">Welcome to My Library</h1>
                    <p class="display-6 my-4">Join Us to manage all your books!</p>
                    <router-link :to="{ name: 'login' }" class="btn btn-primary px-3 py-2">Log
                        in</router-link>
                </div>
                <div class="col text-center py-5" v-if="this.state.user">
                    <h1 class="display-1 fw-bold">Welcome to My Library</h1>
                    <p class="display-6 my-4">Go to the book list page to manage all your books!</p>
                    <router-link :to="{ name: 'books' }" class="btn btn-primary px-3 py-2">Book List Page</router-link>
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
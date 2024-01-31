<template>
    <div>

        <div v-if="this.state.book" class="p-5 rounded-3">
            <div class="container py-0">
                <div class="row">
                    <div class="col-lg-2 d-none d-lg-block"></div>
                    <div class="col-12 col-lg-8">
                        <button class="btn btn-primary btn mb-3" type="button" @click="this.goBack()">
                            <font-awesome-icon :icon="['fas', 'arrow-left']" /> Back
                        </button>
                        <h1 class="fw-bold flex-grow-1">{{ this.state.book.title }}</h1>
                        <div class="col-lg-2 d-none d-lg-block"></div>
                    </div>
                    <div class="container py-3">
                        <div class="row">
                            <div class="col-lg-2 d-none d-lg-block"></div>
                            <div class="col-12 col-lg-4 pt-3">
                                <img class="img-fluid" src="../assets/img/copertina_libro.jpg" alt="">
                            </div>
                            <div class="col-lg-4">
                                <div class="d-flex align-items-center">
                                    <button type="button" class="btn btn-primary btn-sm me-2 mt-2">
                                        <font-awesome-icon :icon="['fas', 'plus']" />
                                    </button>
                                    <small>
                                        <strong>Totale Letture: </strong>
                                        {{ this.state.book.total_readings }}
                                    </small>
                                </div>
                                <div class="my-2">
                                    <p class="m-0"><strong>Author: </strong>{{ this.state.book.author }}</p>
                                    <p class="m-0"><strong>ISBN: </strong>{{ this.state.book.isbn }}</p>
                                </div>
                                <p class="fs-6 my-2" v-if="this.state.book?.plot">
                                    <strong>Plot: </strong>{{ this.state.book.plot }}
                                </p>
                                <router-link class="btn btn-warning btn-lg me-2 my-2" :to="{ name: 'edit_book' }">
                                    <font-awesome-icon :icon="['far', 'pen-to-square']" />
                                    Modifica
                                </router-link>
                                <button class="btn btn-danger btn-lg me-2 my-2" type="button">
                                    <font-awesome-icon :icon="['fas', 'trash']" />
                                    Elimina
                                </button>
                            </div>
                            <div class="col-lg-2 d-none d-lg-block"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h1 class="text-center my-3"> Sorry, this book is unavailable! </h1>
        </div>

    </div>
</template>

<script>
import { state } from '../state.js'
import { router } from '../router.js'


export default {
    data() {
        return {
            state,
        }
    },
    methods: {
        goBack() {
            this.state.book = null;
            router.push({ name: 'books' })
        }
    },
    mounted() {
        if (!this.state.user) {
            router.push({ name: 'login' })
        }
        const url = `${this.state.baseURL}/books/${this.$route.params.id}`;
        this.state.fetchSingleBook(url);
    }
}
</script>

<style lang="scss" scoped></style>
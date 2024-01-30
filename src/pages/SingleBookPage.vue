<template>
    <div>

        <div v-if="this.state.book" class="p-5 bg-light rounded-3">
            <div class="container py-0">
                <div class="d-flex justify-content-betweem">
                    <h1 class="fw-bold flex-grow-1">{{ this.state.book.title }}</h1>
                    <div>
                        <button type="button" class="btn btn-primary btn-sm me-2"><font-awesome-icon
                                :icon="['fas', 'plus']" /></button>
                        <small><strong>Totale Letture: </strong>{{ this.state.book.total_readings }}</small>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-primary btn me-2 mb-2" type="button" @click="this.goBack()">
                        <font-awesome-icon :icon="['fas', 'arrow-left']" /> Back
                    </button>
                    <div>
                        <p class="text-end m-0"><strong>Author: </strong>{{ this.state.book.author }}</p>
                        <p class="text-end m-0"><strong>ISBN: </strong>{{ this.state.book.isbn }}</p>
                    </div>
                </div>
                <img class="img-fluid my-2" src="../assets/img/copertina_libro.jpg" alt="">


                <p class="fs-6">
                    <strong>Plot: </strong>{{ this.state.book.plot }}
                </p>
                <button class="btn btn-warning btn-lg me-2" type="button">
                    <font-awesome-icon :icon="['far', 'pen-to-square']" />
                    Modifica
                </button>
                <button class="btn btn-danger btn-lg me-2" type="button">
                    <font-awesome-icon :icon="['fas', 'trash']" />
                    Elimina
                </button>
            </div>
        </div>
        <div v-else> Sorry, this book is unavialable! </div>

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
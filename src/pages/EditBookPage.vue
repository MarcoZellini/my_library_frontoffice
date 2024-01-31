<template>
    <div class="container my-5">
        <div class="btn btn-primary mb-3">
            <router-link :to="{ name: 'book', params: { id: this.$route.params.id } }"
                class="text-white text-decoration-none">
                <font-awesome-icon :icon="['fas', 'arrow-left']" class="me-2" />Back
            </router-link>
        </div>

        <h2 class="text-center mb-3">Fill out this form to edit your book!</h2>
        <div v-if="this.message" class="alert alert-success" role="alert">
            <strong>Message</strong> {{ this.message }}
        </div>

        <form @submit.prevent="this.editBook()">
            <div class="form-floating mb-3">
                <input v-if="this.state.book" type="text" class="form-control" name="title" id="title" placeholder=""
                    v-model="this.state.book.title" />
                <label for="title" class=" text-capitalize">title</label>
                <small class="text-danger" v-if="this.errors?.title">{{ this.errors.title }}</small>
            </div>
            <div class="form-floating mb-3">
                <input v-if="this.state.book" type="text" class="form-control" name="author" id="author" placeholder=""
                    v-model="this.state.book.author" />
                <label for="author" class=" text-capitalize">author</label>
                <small class="text-danger" v-if="this.errors?.author">{{ this.errors.author }}</small>
            </div>
            <div class="form-floating mb-3">
                <input v-if="this.state.book" type="text" class="form-control" name="isbn" id="isbn" placeholder=""
                    v-model="this.state.book.isbn" />
                <label for="isbn" class="text-uppercase">isbn</label>
                <small class="text-danger" v-if="this.errors?.isbn">{{ this.errors.isbn }}</small>
            </div>
            <div class="form-floating mb-3">
                <textarea v-if="this.state.book" class="form-control" name="plot" id="plot" placeholder=""
                    v-model="this.state.book.plot"></textarea>
                <label for="plot" class=" text-capitalize">plot</label>
                <small class="text-danger" v-if="this.errors?.plot">{{ this.errors.plot }}</small>
            </div>
            <button type="submit" class="btn btn-warning">
                <font-awesome-icon :icon="['far', 'pen-to-square']" />
                Edit Book
            </button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { state } from '../state.js'
import { router } from '../router.js'

export default {
    data() {
        return {
            state,
            book: {
                title: '',
                author: '',
                isbn: '',
                plot: '',
            },
            errors: null,
            message: ''
        }
    },
    methods: {
        editBook() {
            this.message = '';
            this.errors = null;
            const book = {
                user_id: this.state.user.id,
                title: this.state.book.title,
                author: this.state.book.author,
                isbn: this.state.book.isbn,
                plot: this.state.book.plot,
            }
            axios
                .patch(`${this.state.baseURL}/books/${this.$route.params.id}/edit`, book)
                .then(response => {
                    console.log(response);
                    if (response.data.success) {
                        this.message = 'Book Edited Successfully';
                    }

                })
                .catch(error => {
                    console.log(error);
                    if (error.response.data.errors) {
                        this.errors = error.response.data.errors
                    }
                })
        }
    },
    mounted() {
        if (!this.state.book) {
            const url = `${this.state.baseURL}/books/${this.$route.params.id}`;
            this.state.fetchSingleBook(url);
        }
        this.book = this.state.book
    }
}
</script>

<style lang="scss" scoped></style>
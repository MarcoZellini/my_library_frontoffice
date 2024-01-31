<template>
    <div class="container my-5">
        <div class="btn btn-primary mb-3">
            <router-link :to="{ name: 'books' }" class="text-white text-decoration-none">
                <font-awesome-icon :icon="['fas', 'arrow-left']" class="me-2" />Back
            </router-link>
        </div>

        <h2 class="text-center mb-3">Fill out this form to add a new book to your library!</h2>
        <div v-if="this.message" class="alert alert-success" role="alert">
            <strong>Message</strong> {{ this.message }}
        </div>
        <form @submit.prevent="this.createBook()">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" name="title" id="title" placeholder="" v-model="this.book.title" />
                <label for="title" class=" text-capitalize">title</label>
                <small class="text-danger" v-if="this.errors?.title">{{ this.errors.title }}</small>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" name="author" id="author" placeholder=""
                    v-model="this.book.author" />
                <label for="author" class=" text-capitalize">author</label>
                <small class="text-danger" v-if="this.errors?.author">{{ this.errors.author }}</small>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" name="isbn" id="isbn" placeholder="" v-model="this.book.isbn" />
                <label for="isbn" class="text-uppercase">isbn</label>
                <small class="text-danger" v-if="this.errors?.isbn">{{ this.errors.isbn }}</small>
            </div>
            <div class="form-floating mb-3">
                <textarea class="form-control" name="plot" id="plot" placeholder="" v-model="this.book.plot"></textarea>
                <label for="plot" class=" text-capitalize">plot</label>
                <small class="text-danger" v-if="this.errors?.plot">{{ this.errors.plot }}</small>
            </div>
            <button type="submit" class="btn btn-primary">Create Book</button>
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
        createBook() {
            this.message = '';
            this.errors = null;

            const book = {
                user_id: this.state.user.id,
                title: this.book.title,
                author: this.book.author,
                isbn: this.book.isbn,
                plot: this.book.plot,
            }

            axios
                .post(`${this.state.baseURL}/books/create`, book)
                .then(response => {
                    if (response.data.success) {
                        this.message = 'Book Created Successfully';
                    }
                })
                .catch(error => {
                    console.log(error);
                    if (error.response.data.errors) {
                        this.errors = error.response.data.errors
                    }
                })
        }
    }
}
</script>

<style lang="scss" scoped></style>
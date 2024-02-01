<template>
    <div class="container p-5">
        <h2 class="text-center mb-3">Fill out this form to <span class="text_primary">add</span> a new book to your library!
        </h2>

        <div v-if="this.message" class="alert alert-success mx-5" role="alert">
            <strong>Message: </strong> {{ this.message }}
        </div>
        <form class="p-5" @submit.prevent="this.createBook()">
            <div class="form-floating mb-4">
                <input type="text" class="form-control" name="title" id="title" placeholder="" v-model="this.book.title" />
                <label for="title" class=" text-capitalize">title</label>
                <small class="text-danger" v-if="this.errors?.title">{{ this.errors.title }}</small>
            </div>
            <div class="form-floating mb-4">
                <input type="text" class="form-control" name="author" id="author" placeholder=""
                    v-model="this.book.author" />
                <label for="author" class=" text-capitalize">author</label>
                <small class="text-danger" v-if="this.errors?.author">{{ this.errors.author }}</small>
            </div>
            <div class="form-floating mb-4">
                <input type="text" class="form-control" name="isbn" id="isbn" placeholder="" v-model="this.book.isbn" />
                <label for="isbn" class="text-uppercase">isbn</label>
                <small class="text-danger" v-if="this.errors?.isbn">{{ this.errors.isbn }}</small>
            </div>
            <div class="form-floating mb-4">
                <textarea class="form-control" name="plot" id="plot" placeholder="" v-model="this.book.plot"></textarea>
                <label for="plot" class=" text-capitalize">plot</label>
                <small class="text-danger" v-if="this.errors?.plot">{{ this.errors.plot }}</small>
            </div>
            <div class="btn btn-secondary mb-4">
                <router-link :to="{ name: 'books' }" class="text-white text-decoration-none">
                    <font-awesome-icon :icon="['fas', 'arrow-left']" class="me-2" />Back
                </router-link>
            </div>
            <button type="submit" class="btn btn-primary mb-4 mx-2">Create Book</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { state } from '../state.js'

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
                        this.message = 'Book Created Successfully!';
                        this.book = {
                            title: '',
                            author: '',
                            isbn: '',
                            plot: '',
                        };
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
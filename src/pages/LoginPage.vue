<template>
    <div class="container py-5">
        <div class="d-flex justify-content-center">
            <form class="bg-secondary-subtle p-3 rounded-3" @submit.prevent="login()">
                <h2 class="text-center mb-4">Enter your email to log in!</h2>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" name="email" id="email" placeholder="" v-model="email" />
                    <label for="email">E-mail</label>
                </div>
                <button type="submit" class="btn btn-primary">Log in</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { state } from '../state.js';
import { router } from '../router.js'

export default {
    data() {
        return {
            state,
            email: '',
        }
    },
    methods: {
        login() {

            const payload = {
                email: this.email
            }

            axios
                .post(state.baseURL + '/login', payload)
                .then(response => {

                    if (response.data.success) {
                        this.state.bookList = response.data.result.books;
                        this.state.userId = response.data.result.user_id
                        router.push({ name: 'book_list' })
                    }

                })
                .catch(error => {
                    console.error(error);
                })
        }
    }
}
</script>

<style lang="scss" scoped></style>
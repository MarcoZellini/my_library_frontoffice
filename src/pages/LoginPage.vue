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
                    // console.log(response.data.result);
                    if (response.data.success) {
                        const user = {
                            id: response.data.result.user_id,
                            name: response.data.result.user_name,
                            lastname: response.data.result.user_lastname
                        }
                        this.state.user = user;

                        // this.state.user_id = response.data.result.user_id;
                        router.push({ name: 'books' })
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
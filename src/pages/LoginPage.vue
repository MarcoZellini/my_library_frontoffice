<template>
    <div class="container py-5">
        <div class="d-flex justify-content-center">
            <form class="bg-secondary-subtle p-3 rounded-3" @submit.prevent="login()">
                <h2 class="text-center mb-4 mx-5">Enter your email to log in!</h2>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" name="email" id="email" placeholder="" v-model="email" />
                    <label for="email">E-mail</label>
                    <small class="text-danger" v-if="this.error">{{ this.error }}</small>
                </div>
                <button type="submit" class="btn btn-primary d-block mx-auto">Log in</button>
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
            error: null
        }
    },
    methods: {
        login() {

            if (this.email) {
                const payload = {
                    email: this.email
                }

                axios
                    .post(state.baseURL + '/login', payload)
                    .then(response => {
                        console.log(response);
                        if (response.data.success) {
                            const user = {
                                id: response.data.result.user_id,
                                name: response.data.result.user_name,
                                lastname: response.data.result.user_lastname
                            }
                            this.state.user = user;

                            // this.state.user_id = response.data.result.user_id;
                            router.push({ name: 'books' })
                        } else {
                            this.error = response.data.error;
                        }

                    })
                    .catch(error => {
                        console.error(error);
                    })
            } else {
                this.error = 'You cannot leave this space empty!';
            }
        }
    },
    mounted() {
        if (this.state.user) {
            router.push({ name: 'home' })
        }
    }
}
</script>

<style lang="scss" scoped></style>
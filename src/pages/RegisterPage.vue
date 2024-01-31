<template>
    <div class="container py-5">
        <div class="d-flex flex-column justify-content-center">
            <form class="bg-secondary-subtle p-3 rounded-3" @submit.prevent="this.register()">
                <h2 class="text-center mb-4 mx-3">Fill out this form to register</h2>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" name="name" id="name" placeholder="" v-model="this.name" />
                    <label for="name">Name</label>
                    <small class="text-danger" v-if="this.error">{{ this.error.name }}</small>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" name="lastname" id="lastname" placeholder=""
                        v-model="this.lastname" />
                    <label for="lastname">Lastname</label>
                    <small class="text-danger" v-if="this.error">{{ this.error.lastname }}</small>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" name="email" id="email" placeholder="" v-model="this.email" />
                    <label for="email">E-mail</label>
                    <small class="text-danger" v-if="this.error">{{ this.error.email }}</small>
                </div>
                <button type="submit" class="btn btn-primary d-block mx-auto">Register</button>
            </form>
            <p class="text-center pt-4">If you already have an account
                <router-link :to="{ name: 'login' }">Log in</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { state } from '../state.js';
import { router } from '../router.js';

export default {
    data() {
        return {
            state,
            name: '',
            lastname: '',
            email: '',
            error: null
        }
    },
    methods: {
        register() {

            const payload = {
                name: this.name,
                lastname: this.lastname,
                email: this.email
            }

            axios
                .post(`${this.state.baseURL}/register`, payload)
                .then(response => {
                    console.log('register response: ', response);
                    // router.push({ name: 'home' })

                    if (response.data.success) {
                        const user = {
                            id: response.data.result.id,
                            name: response.data.result.name,
                            lastname: response.data.result.lastname
                        }
                        this.state.user = user;
                        localStorage.setItem('user', JSON.stringify(this.state.user));

                        router.push({ name: 'home' })

                    } else {
                        this.error = response.response.data.errors;
                    }

                })
                .catch(error => {
                    console.log('register error: ', error.response.data.errors);
                    this.error = {
                        name: error.response.data.errors.name,
                        lastname: error.response.data.errors.lastname,
                        email: error.response.data.errors.email
                    }
                })
        }
    }
}
</script>

<style lang="scss" scoped></style>
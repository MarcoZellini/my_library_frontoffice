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
                                    <button type="button" class="btn btn-primary btn-sm me-2 mt-2"
                                        @click="this.updateTotalReadings()">
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
                                <!-- Modal trigger button -->
                                <button type="button" class="btn btn-danger btn-lg" data-bs-toggle="modal"
                                    data-bs-target="#delete_book">
                                    <font-awesome-icon :icon="['fas', 'trash']" />
                                    Elimina
                                </button>

                                <!-- Modal Body -->
                                <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
                                <div class="modal fade" id="delete_book" tabindex="-1" data-bs-backdrop="static"
                                    data-bs-keyboard="false" role="dialog" aria-labelledby="modal" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
                                        role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="modal">
                                                    Delete Book
                                                </h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">Warning! This operation cannot be undone!</div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                                    Close
                                                </button>
                                                <button type="button" class="btn btn-danger"
                                                    @click="this.deleteBook(this.$route.params.id)">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
import axios from 'axios'
import * as bootstrap from 'bootstrap'


export default {
    data() {
        return {
            state,
        }
    },
    methods: {
        updateTotalReadings() {
            const payload = {
                user_id: this.state.user.id
            }

            axios
                .patch(`${this.state.baseURL}/books/${this.$route.params.id}/update_readings`, payload)
                .then(response => {
                    console.log(response);
                    this.updatePageBook();
                })
                .catch(error => {
                    console.error(error);
                })
        },
        updatePageBook() {
            const url = `${this.state.baseURL}/books/${this.$route.params.id}`;
            this.state.fetchSingleBook(url);
        },
        deleteBook() {
            const payload = {
                user_id: this.state.user.id
            }

            axios.delete(`${this.state.baseURL}/books/${this.$route.params.id}/delete`, { data: payload })
                .then(response => {
                    // console.log(response);

                    const deleteModal = new bootstrap.Modal(document.getElementById('delete_book'));
                    deleteModal.hide();
                    const backdrop = document.querySelector('.modal-backdrop.fade.show')
                    backdrop.parentNode.removeChild(backdrop);

                    const bodyElement = document.querySelector('body'); // Get the element to remove the class from
                    const className = 'modal-open'; // The class to remove

                    if (bodyElement.classList.contains(className)) {
                        bodyElement.classList.remove(className);
                        bodyElement.style.overflow = 'auto';
                        bodyElement.style.paddingRight = '0';
                    }

                    this.state.book = null;
                    this.state.bookDeleted = true;

                    router.push({ name: 'books' })
                })
                .catch(error => {
                    console.error(error);
                })

        },
        goBack() {
            this.state.book = null;
            router.push({ name: 'books' })
        }
    },
    mounted() {
        /* const url = `${this.state.baseURL}/books/${this.$route.params.id}`;
        this.state.fetchSingleBook(url); */
        this.updatePageBook();
    }
}
</script>

<style lang="scss" scoped></style>
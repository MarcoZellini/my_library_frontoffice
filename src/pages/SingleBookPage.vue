<template>
    <div>

        <div v-if="this.state.book" class="py-3 rounded-3">
            <div class="container py-5">
                <div class="row">
                    <div class="col-lg-2 d-none d-lg-block"></div>
                    <div class="col-12 col-lg-8">

                        <h1 class="fw-bold flex-grow-1 text-center text-lg-start mb-0">{{ this.state.book.title }}</h1>
                        <small class="text-center text-lg-start pb-3 mb-0 d-block">{{ this.state.book.author }}</small>
                        <div class="col-lg-2 d-none d-lg-block"></div>
                    </div>

                    <div class="container">
                        <div class="row">
                            <div class="col-lg-2 d-none d-lg-block"></div>
                            <div class="col-12 col-lg-4 pb-3">
                                <!-- <img class="img-fluid rounded-3 book_image" src="../assets/img/copertina_libro.jpg" alt=""> -->
                                <div class="d-flex justify-content-center align-items-center book_cover text-white">
                                    <h1>COVER</h1>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="mb-2">
                                    <p class="text-center text-lg-start mb-0">ISBN Code: {{ this.state.book.isbn }}</p>
                                </div>
                                <p class="text-center text-lg-start mb-2" v-if="this.state.book?.plot">
                                    Plot: {{ this.state.book.plot }}
                                </p>
                                <div class="d-flex align-items-center justify-content-center justify-content-lg-start my-2">
                                    <button type="button" class="btn btn-outline-dark  btn-sm me-2"
                                        @click="this.subtractTotalReadings()">
                                        <font-awesome-icon :icon="['fas', 'minus']" class="text_dark" />
                                    </button>
                                    <button type="button" class="btn btn-primary btn-sm me-2"
                                        @click="this.addTotalReadings()">
                                        <font-awesome-icon :icon="['fas', 'plus']" />
                                    </button>
                                    <small>
                                        <strong>Total Readings: </strong>
                                        {{ this.state.book.total_readings }}
                                    </small>
                                </div>

                                <div class="d-flex justify-content-center  justify-content-lg-start">
                                    <router-link class="btn btn-secondary mx-2 ms-lg-0 my-2" :to="{ name: 'books' }">
                                        <font-awesome-icon :icon="['fas', 'arrow-left']" /> Back
                                    </router-link>
                                    <router-link class="btn btn-warning mx-2 ms-lg-0 my-2" :to="{ name: 'edit_book' }">
                                        <font-awesome-icon :icon="['far', 'pen-to-square']" />
                                        Edit
                                    </router-link>
                                    <!-- Modal trigger button -->
                                    <!-- Modal trigger button -->
                                    <button type="button" class="btn btn-danger mx-2 ms-lg-0 my-2" data-bs-toggle="modal"
                                        data-bs-target="#delete_book">
                                        <font-awesome-icon :icon="['fas', 'trash']" />
                                        Delete
                                    </button>
                                </div>

                                <!-- Modal Body -->
                                <div class="modal fade" id="delete_book" tabindex="-1" role="dialog"
                                    aria-labelledby="modalTitleId" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
                                        role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="modalTitleId">
                                                    Delete Book
                                                </h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body"><strong>Warning!</strong> This operation cannot be
                                                undone!
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                                    Close
                                                </button>
                                                <button type="button" class="btn btn-primary"
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
        addTotalReadings() {
            const payload = {
                user_id: this.state.user.id,
                total_readings: ++this.state.book.total_readings
            }

            axios
                .patch(`${this.state.baseURL}/books/${this.$route.params.id}/update_readings`, payload)
                .then(response => {
                })
                .catch(error => {
                    console.error(error);
                })
        },
        subtractTotalReadings() {

            let readings_counter;

            if (this.state.book.total_readings > 0) {
                readings_counter = --this.state.book.total_readings
            } else {
                return false
            }


            const payload = {
                user_id: this.state.user.id,
                total_readings: readings_counter
            }

            axios
                .patch(`${this.state.baseURL}/books/${this.$route.params.id}/update_readings`, payload)
                .then(response => {
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

        }
    },
    mounted() {
        this.updatePageBook();
    }
}
</script>

<style lang="scss" scoped>
.book_image {
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: bottom;
}
</style>
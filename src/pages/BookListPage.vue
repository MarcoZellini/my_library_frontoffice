<template>
    <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container py-5">
            <h1 class="display-3 fw-bold">All Your Books Are Here!</h1>
            <p class="col-md-8 fs-4">
                Scroll this page to look at all your books!
            </p>
        </div>
    </div>
    <div id="book_list" class="py-3 py-md-5">
        <div class="container">
            <nav aria-label="Page navigation">
                <ul class="pagination    ">
                    <!-- <li class="page-item disabled">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li> -->
                    <li class="page-item" :class="this.currentPage === parseInt(link.label) ? 'active' : ''"
                        aria-current="page" v-for="link in this.links">
                        <span @click="this.fetchData(link.url)" class="page-link" href="#"><span
                                v-html="link.label"></span></span>
                    </li>
                    <!-- <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li> -->
                </ul>
            </nav>

            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-4">
                <div class="col" v-for="book in state.bookList">
                    <AppBook :title="book.title" :author="book.author" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { state } from '../state.js';
import { router } from '../router.js'
import AppBook from '../components/AppBook.vue';
import axios from 'axios';



export default {
    data() {
        return {
            state,
            links: null, //number of pages containing books
            currentPage: 1
        }
    },
    components: {
        AppBook
    },
    methods: {
        fetchData(url) {

            const payload = {
                user_id: state.userId
            }

            axios.post(url, payload)
                .then(response => {
                    console.log(response.data);
                    this.state.bookList = response.data.result.books.data;
                    this.currentPage = response.data.result.books.current_page;
                    this.links = response.data.result.books.links;
                })
                .catch(error => {
                    console.error(error);
                })
        }
    },
    mounted() {
        if (!state.userId) {
            router.push({ name: 'login' })
        }

        this.fetchData(state.baseURL + `/books?page=${this.currentPage}`);
    }
}
</script>

<style lang="scss"></style>
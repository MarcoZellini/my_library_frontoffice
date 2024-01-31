<template>
    <div class="p-5 bg-light rounded-3">
        <div class="container py-5">
            <h1 class="display-3 fw-bold">Hi {{ `${this.state.user?.name}` }} </h1>
            <h2 class="fs-2">Check out all your Books!</h2>
            <div v-if="this.state.bookDeleted && !this.state.book" class="alert alert-danger" role="alert">
                <strong>Message</strong> {{ this.message }}
            </div>
        </div>

    </div>
    <div id="book_list" class="py-3 py-md-5">
        <div class="container">
            <div class="row justify-content-between">
                <div class="col-12 col-md-3 d-flex justify-content-center justify-content-md-start">
                    <router-link class="btn btn-primary mb-3" :to="{ name: 'new_book' }">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                        Aggiungi Libro</router-link>
                </div>
                <nav class="col-12 col-md-9" aria-label="Page navigation">
                    <ul class="pagination justify-content-center justify-content-md-end">
                        <li role="button" class="page-item"
                            :class="this.state.currentPage === parseInt(link.label) ? 'active' : ''" aria-current="page"
                            v-if="this.state.links" v-for=" link  in  this.state.links "
                            @click="this.state.fetchData(link.url)">
                            <span class="page-link" href="#"><span v-html="link.label"></span></span>
                        </li>
                    </ul>
                </nav>
            </div>

            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-4">
                <div v-if="this.state.bookList.length > 0" class="col" v-for=" book  in  this.state.bookList ">
                    <AppBook :bookId="book.id" :title="book.title" :author="book.author" />
                </div>
                <div v-else class="mx-auto text-center fs-1">There are no books in here! Start adding one!</div>
            </div>
        </div>
    </div>
</template>

<script>
import { state } from '../state.js';
import AppBook from '../components/AppBook.vue';

export default {
    data() {
        return {
            state,
            message: 'Book Deleted Successfully!'
        }
    },
    methods: {
        beforeRouteUpdate(to, from, next) {
            this.state.bookDeleted = false;
            next();
        }
    },
    components: {
        AppBook
    },
    mounted() {
        this.state.fetchData(this.state.baseURL + `/books?page=${this.state.currentPage}`);
    }
}
</script>

<style lang="scss"></style>
<template>
    <div class="p-5 bg-light rounded-3">
        <div class="container">
            <h1 class="display-3 fw-bold">Hi {{ `${this.state.user?.name}` }} </h1>
            <h2 class="fs-2">Check out all your Books!</h2>
            <div class="row pt-3">
                <div class="col-12 col-md-3 d-flex justify-content-start">
                    <router-link class="btn btn-primary" :to="{ name: 'new_book' }">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                        Add Book
                    </router-link>
                </div>
            </div>
            <div v-if="this.state.bookDeleted && !this.state.book" class="alert alert-danger mt-4" role="alert">
                <strong>Message</strong> {{ this.message }}
            </div>
        </div>

    </div>
    <div id="book_list" class="">
        <div class="container p-5">
            <div class="row justify-content-between align-items-center g-3">
                <nav v-if="this.state.bookList.length > 0" class="col-12" aria-label="Page navigation">
                    <ul class="pagination justify-content-start mb-0">
                        <li role="button" class="page-item"
                            :class="this.state.currentPage === parseInt(link.label) ? 'active' : ''" aria-current="page"
                            v-if="this.state.links" v-for=" link  in  this.state.links "
                            @click="this.state.fetchData(link.url)">
                            <span class="page-link" href="#"><span v-html="link.label"></span></span>
                        </li>
                    </ul>
                </nav>
            </div>

            <div v-if="this.state.bookList.length > 0" class="row row-cols-1 row-cols-md-3 row-cols-lg-4 gy-4 py-5">
                <div class="col" v-for=" book  in  this.state.bookList ">
                    <AppBook :bookId="book.id" :title="book.title" :author="book.author" />
                </div>
            </div>
            <div v-else class="mx-auto text-center fs-1" :class="this.state.bookList.length === 0 ? 'py-5' : ''">There are
                no
                books in here! Start adding one!</div>
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
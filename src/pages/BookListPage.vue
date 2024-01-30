<template>
    <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container py-5">
            <h1 class="display-3 fw-bold">Hi {{ `${this.state.user?.name}` }} </h1>
            <h2 class="fs-2">Check out all your Books!</h2>
            <!-- <p class="col-md-8 fs-4">
                Scroll this page to look at all your books!
            </p> -->
        </div>
    </div>
    <div id="book_list" class="py-3 py-md-5">
        <div class="container">
            <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-primary mb-3 me-3">
                    <font-awesome-icon :icon="['fas', 'plus']" />
                    Aggiungi Libro
                </button>
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li role="button" class="page-item"
                            :class="this.state.currentPage === parseInt(link.label) ? 'active' : ''" aria-current="page"
                            v-if="this.state.links" v-for="link in this.state.links"
                            @click="this.state.fetchData(link.url)">
                            <span class="page-link" href="#"><span v-html="link.label"></span></span>
                        </li>
                    </ul>
                </nav>
            </div>

            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-4">
                <div v-if="this.state.bookList" class="col" v-for="book in this.state.bookList">
                    <AppBook :bookId="book.id" :title="book.title" :author="book.author" />
                </div>
                <div v-else>There are no books in here! Start adding one!</div>
            </div>
        </div>
    </div>
</template>

<script>
import { state } from '../state.js';
import { router } from '../router.js'
import AppBook from '../components/AppBook.vue';

export default {
    data() {
        return {
            state,
        }
    },
    components: {
        AppBook
    },
    mounted() {
        if (!this.state.user) {
            router.push({ name: 'login' })
        }

        this.state.fetchData(this.state.baseURL + `/books?page=${this.state.currentPage}`);
    }
}
</script>

<style lang="scss"></style>
<template>
    <router-link :to="{
        name: 'book',
        params: {
            id: bookId
        }
    }">
        <div class="book">
            <!-- <img class="img-fluid card-img-top book_image" src="../assets/img/copertina_libro.jpg" alt="book cover image"> -->
            <div class="book_cover"></div>
            <div class="book_info">
                <div class="fs-4 book_title">{{ title }}</div>
                <div class="book_author">{{ author }}</div>
            </div>
        </div>
    </router-link>
</template>

<script>

import { state } from '../state.js';

export default {
    data() {
        return {
            state
        }
    },
    props: {
        bookId: Number,
        title: String,
        author: String
    }
}
</script>

<style lang="scss" scoped></style>
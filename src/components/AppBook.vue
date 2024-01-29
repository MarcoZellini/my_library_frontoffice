<template>
    <div class="book">
        <img class="img-fluid card-img-top book_image" src="../assets/img/copertina_libro.jpg" alt="book cover image">
        <div class="book_info">
            <div class="fs-3 book_title">{{ title }}</div>
            <div class="book_author">{{ author }}</div>
        </div>
    </div>
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
        title: String,
        author: String
    }
}
</script>

<style lang="scss" scoped>
.book {
    position: relative;

    .book_image {
        border-radius: 10px;
    }

    .book_info {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        display: none;

        .book_title {
            color: black;
            text-align: center;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
    }

    &:hover {
        cursor: pointer;

        .book_info {
            display: flex;

        }

        .book_image {
            opacity: 60%;
        }
    }
}
</style>
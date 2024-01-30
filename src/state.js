import { reactive } from 'vue';
import axios from 'axios';


export const state = reactive({
    baseURL: 'http://127.0.0.1:8000/api',
    bookList: [],
    book: null,
    // userId: null,
    user: null,
    links: [], //number of pages containing books
    currentPage: 1,
    fetchData(url) {

        if (url && this.user) {
            const payload = {
                user_id: this.user.id
            }

            axios.post(url, payload)
                .then(response => {
                    // console.log(response.data);
                    this.bookList = response.data.result.books.data;
                    this.currentPage = response.data.result.books.current_page;
                    this.links = response.data.result.books.links;
                })
                .catch(error => {
                    console.error(error);
                })
        }
    },
    fetchSingleBook(url) {

        if (url && this.user) {
            const payload = {
                user_id: this.user.id
            }

            axios.post(url, payload)
                .then(response => {
                    this.book = response.data.result;
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }
})
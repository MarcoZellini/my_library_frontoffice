import { reactive } from 'vue'

export const state = reactive({
    baseURL: 'http://127.0.0.1:8000/api',
    bookList: [],
    userId: null
})
import axios from 'axios'

export default axios.create({
    baseURL: `https://bookstore-9d596.firebaseio.com/`,
})

import { createStore } from 'vuex'
// import mutations from './mutations'
// import storage from '../utils/storage'
import user from './user'



export default createStore({
    modules: {
        'm_user': user
    }
})
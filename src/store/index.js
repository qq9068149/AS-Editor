import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    state () {
        return {
            count: "我是vuex的count"
        }
    },
});

export default store;
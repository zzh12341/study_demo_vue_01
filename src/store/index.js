import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import Dashboard from './modules/Dashboard'
// import dispatchSupplier from './modules/dispatchSupplier'
const store = new Vuex.Store({
    // ...
    modules:{
        Dashboard,
        // dispatchSupplier
    },
  
});
   
export default store 
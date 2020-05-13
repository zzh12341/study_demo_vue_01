import { myListUser, addMyListUser, dropListUser, searchOneUser, deleteListUser, updateListUser, exportData,resetdata } from '../../lib/users'
import { Notification } from 'element-ui'
import router from '../../router/index'
import axios from 'axios'
const state = {
    searchFrom: {
        userId: '',
        name:'',
        pagingDto: {
            pageNo: 1,
            pageSize: 10,
            pageTotal: 0,
        }
    },
    resetSearchFrom:{
            userId: '',
            name:'',
            pagingDto: {
                pageNo: 1,
                pageSize: 10,
                pageTotal: 0,
            
        },
    },
    form: {
        id: '',
        code: '',
        name: '',
        password: '',
        photoUrl: '',
    },
    retform: {
        id: '',
        code: '',
        name: '',
        password: '',
        photoUrl: '',
    },
    myListData: [], //列表数据
    dropData: {},   //下拉列表
}

const actions = {
    async myListUserA({ commit, state }) {
        let res = await myListUser(state.searchFrom)
        if (res.flag) {
            commit('myListUserM', res)
        }
    },
    async addMyListUserA({ state, dispatch}) {
        let res = await addMyListUser(state.form)
        if (res.flag) {
            Notification({ title: '成功', message: res.msg, type: 'success' })
            dispatch('myListUserA')
            router.push({ path: '/' })
        } else {
            Notification({ title: '失败', message: res.msg, type: 'error' })
        }
    },
    async dropListUserA({ commit }) {
        let res = await dropListUser()
        commit('dropListUserM', res)
    },
    async searchOneUserA({ commit, state }){
        let res = await searchOneUser(state.searchFrom.userId)
        commit('searchOneUserM', res)
    },
    async deleteListUserA({ dispatch }, params) {
        let res = await deleteListUser(params)
        if (res.flag) {
            Notification({ title: '成功', message: res.msg, type: 'success' })
            dispatch('myListUserA')
        } else {
            Notification({ title: '失败', message: res.msg, type: 'error' })
         }
    },
    async updateListUserA({ state,dispatch}) {
        let res = await updateListUser(state.form)
        if (res.flag) {
            Notification({ title: '成功', message: res.msg, type: 'success' })
            dispatch('myListUserA')
            router.push({ path: '/' })
        } else {
            Notification({ title: '失败', message: res.msg, type: 'error' })
        }
    },
    async exportDataA({ state }) {
        const obj = JSON.parse(JSON.stringify(state.searchFrom))
        delete obj.pagingDto
        // let res = await exportData(obj)
        axios.post(`http://localhost:8769/demo//user/excel/export`, obj)
        .then(res=>{
            const blob = new Blob([res.data])
            const downloadElement = document.createElement('a');
            const href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = `文档.xlsx`; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        
       

    },
}

const mutations = {
    myListUserM(state, data) {
        state.myListData = data.rows
        state.searchFrom.pagingDto.pageTotal = data.total
    },
    dropListUserM(state, data) {
        state.dropData = data.obj
    },
    searchOneUserM(state, data) {
        state.myListData = data.rows
        state.searchFrom.pagingDto.pageTotal = data.total
    },
    clearSearchFormM (state) {
        Object.assign(state.searchFrom, state.resetSearchFrom)
     },
    // resetdata(state,data){
        
    //Object.assign(state.searchFrom, state.resetsearchFrom)
       
    // }
}

const getters = {}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}
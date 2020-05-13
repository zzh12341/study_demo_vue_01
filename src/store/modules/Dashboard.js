import { ListUser, AddListUser, DropListUser, SearchListUser, DelListUser, UpdateListUser,DelbatchUser,exportData } from '../../lib/api'
import { Notification } from 'element-ui'
import router from '../../router/index'
import axios from 'axios'
const state = {
    searchFrom: {
        userId: '',
        listId:[],
        pagingDto: {
            pageNo: 1,
            pageSize: 10,
            pageTotal: 0,
        }
    },
    retsearchFrom: {
        userId: '',
        pagingDto: {
            pageNo: 1,
            pageSize: 10,
            pageTotal: 0,
        }
    },
    form: {
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
    async ListUserA({ commit, state }) {
        let res = await ListUser(state.searchFrom)
        if (res.flag) {
            commit('ListUserM', res)
        }
    },
    async AddListUserA({ state, dispatch}) {
        let res = await AddListUser(state.form)
        if (res.flag) {
            Notification({ title: '成功', message: res.msg, type: 'success' })
            dispatch('ListUserA')
            router.push({ path: '/' })
        } else {
            Notification({ title: '失败', message: res.msg, type: 'error' })
        }
    },
    async DropListUserA({ commit }) {
        let res = await DropListUser()
        commit('DropListUserM', res)
    },
    async SearchListUserA({ commit, state }) {
        let res = await SearchListUser(state.searchFrom.userId)
        commit('SearchListUserM', res)
    },
    async DelListUserA({ dispatch }, params) {
        let res = await DelListUser(params)
        if (res.flag) {
            Notification({ title: '成功', message: res.msg, type: 'success' })
            dispatch('ListUserA')
        } else {
            Notification({ title: '失败', message: res.msg, type: 'error' })
        }
    },
    async DelbatchUserA({commit,state,dispatch},ids){
        const res = await DelbatchUser({"listId":ids})
        if (res.flag) {
            commit('emptyDateM')
            dispatch('ListUserA',state.searchFrom)
            Notification({showClose: true, title: "投保提示", message:res.msg, type: 'success', });
        }else{
            Notification({showClose: true, title: "投保提示", message:res.msg, type: 'error', });
        }
    },
    async UpdateListUserA({ state,dispatch}) {
        let res = await UpdateListUser(state.form)
        if (res.flag) {
            Notification({ title: '成功', message: res.msg, type: 'success' })
            dispatch('ListUserA')
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
    ListUserM(state, data) {
        state.myListData = data.rows
        state.searchFrom.pagingDto.pageTotal = data.total
    },
    DropListUserM(state, data) {
        state.dropData = data.obj
    },
    SearchListUserM(state, data) {
        state.myListData = data.rows
        state.searchFrom.pagingDto.pageTotal = data.total
    },
    emptyDateM(state){
        state.searchFrom.listId=[]
    },
}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
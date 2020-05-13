import http from './http'
// import request from '@/utils/request'


export const myListUser = (data) => http(`user/list`, data, 'POST',); // 列表
export const addMyListUser = (data) => http(`user/save_json`, data, 'POST',); // 新增
export const dropListUser = (data) => http(`/user/drop`, data, 'GET',); // 下拉
export const searchOneUser = (data) => http(`/user/path/${data}`, data, 'GET',); // 查询一个

export const deleteListUser = (data) => http(`/user/delete/${data}`, data, 'DELETE',); // 删除
export const updateListUser= (data) => http(`/user/update`, data, 'PUT',); // 编辑
// export const exportData = (data) => http(`/user/excel/export`, data, 'POST',); // 导出
// export const resetdata = (data) => http(`/user/data/reset`, data, 'GET',);
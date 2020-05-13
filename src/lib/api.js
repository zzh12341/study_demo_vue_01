import http from './http'
export const ListUser=(data)=>http(`user/list`,data,'POST',)
export const SearchListUser=(data)=>http(`user/path/${data}`,data,'GET',)
export const AddListUser=(data)=>http(`user/save_json`,data,'POST',)
export const UpdateListUser=(data)=>http(`user/update`,data,'PUT',)
export const DelListUser=(data)=>http(`user/delete/${data}`,data,'DELETE',)
export const DropListUser=(data)=>http(`user/drop`,data,'GET',)
export const DelbatchUser=(data)=>http(`demo/user/deleteBatch?listId=${data}`,data,'POST',)
// export const DelbatchUser=(data)=>http(`demo/user/deleteBatch`,data,'POST',)
export const exportData = (data) => http(`/user/excel/export`, data, 'POST',); // 导出
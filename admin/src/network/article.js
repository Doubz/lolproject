import {
  request
} from "network/request"

export function CreateCategory(body) {

  return request({
    url: "/rest/articles",
    method: 'post',
    data: body
  })

}

export function SelectCategory() {

  return request({
    url: "/rest/articles"
  })
}

export function SelectOneCategory(id) {
  return request({
    url: `/rest/articles/${id}`
  })
}

export function UpdateOneCategory(id, body) {
  return request({
    url: `/rest/articles/${id}`,
    method: "put",
    data:body
  })
}

export function DeleteById(id){
  return request({
    url:`/rest/articles/${id}`,
    method:"delete"
  })
}


export function getCategoryData(){
  return request({
    url:"/rest/categories"
  })
}

export function UploadFile(file){
  return request({
    url:"/upload",
    data:file,
    method:"post"
  })
}
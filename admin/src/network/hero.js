import {
  request
} from "network/request"

export function CreateCategory(body) {

  return request({
    url: "/rest/heros",
    method: 'post',
    data: body
  })

}

export function SelectCategory() {

  return request({
    url: "/rest/heros"
  })
}

export function SelectOneCategory(id) {
  return request({
    url: `/rest/heros/${id}`
  })
}

export function UpdateOneCategory(id, body) {
  return request({
    url: `/rest/heros/${id}`,
    method: "put",
    data:body
  })
}

export function DeleteById(id){
  return request({
    url:`/rest/heros/${id}`,
    method:"delete"
  })
}

export function fetchCategories(){
  return request({
    url:"/rest/categories"
  })
}

export function fetchItems(){
  return request({
    url:"/rest/items"
  })
}


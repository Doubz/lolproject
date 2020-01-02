import {
  request
} from "network/request"

export function CreateCategory(body) {

  return request({
    url: "/rest/ads",
    method: 'post',
    data: body
  })

}

export function SelectCategory() {

  return request({
    url: "/rest/ads"
  })
}

export function SelectOneCategory(id) {
  return request({
    url: `/rest/ads/${id}`
  })
}

export function UpdateOneCategory(id, body) {
  return request({
    url: `/rest/ads/${id}`,
    method: "put",
    data:body
  })
}

export function DeleteById(id){
  return request({
    url:`/rest/ads/${id}`,
    method:"delete"
  })
}
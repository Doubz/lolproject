import axios from "axios"
import Vue from "vue"
import router from "../router"

export function request(config) {
  const instance = axios.create({
    baseURL: "http://localhost:3000/admin/api",
    timeout: 5000
  })

  instance.interceptors.request.use(config =>{

    if(localStorage.token){
      config.headers.Authorization = "Bearer " +  localStorage.token
      
    }

    return config

  },err=>{
    return Promise.reject(err)
  })

  instance.interceptors.response.use(res => {

    return res

  }, err => {

    console.log(err)

    // 只要不是2xx的范围响应码 
    if (err.response.data.message) {
      Vue.prototype.$message({
        message: err.response.data.message,
        type: 'error'
      })


      if(err.response.status === 401){
        router.push("/login")
      }
    }


    return Promise.reject(err)
  })


  return instance(config)
}
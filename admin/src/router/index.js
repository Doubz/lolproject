import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Main = () => import("views/Main/Main")
const Login = () => import("views/Login/Login")
const CategoryEdit = () => import("views/Category/CategoryEdit")
const CategoryList = () => import("views/Category/CategoryList")

const ItemEdit = () => import("views/Item/ItemEdit")
const ItemList = () => import("views/Item/ItemList")

const HeroEdit = () => import("views/Hero/HeroEdit")
const HeroList = () => import("views/Hero/HeroList")

const ArticleEdit = () => import("views/Article/ArticleEdit")
const ArticleList = () => import("views/Article/ArticleList")

const AdsEdit = () => import("views/Ads/AdsEdit")
const AdsList = () => import("views/Ads/AdsList")

const AdminUserEdit = () => import("views/AdminUser/AdminUserEdit")
const AdminUserList = () => import("views/AdminUser/AdminUserList")



const routes = [
  {
    path:"/login",
    name:"login",
    component:Login,
    meta:{
      isPublic:true
    }
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {
        path:"categories/create",
        component:CategoryEdit
      },
      {
        path:"categories/edit/:id",
        component:CategoryEdit,
        props:true
      },
      {
        path:"categories/list",
        component:CategoryList
      },
      
      {
        path:"items/create",
        component:ItemEdit
      },
      {
        path:"items/edit/:id",
        component:ItemEdit,
        props:true
      },
      {
        path:"items/list",
        component:ItemList
      },

      {
        path:"heros/create",
        component:HeroEdit
      },
      {
        path:"heros/edit/:id",
        component:HeroEdit,
        props:true
      },
      {
        path:"heros/list",
        component:HeroList
      },

      {
        path:"articles/create",
        component:ArticleEdit
      },
      {
        path:"articles/edit/:id",
        component:ArticleEdit,
        props:true
      },
      {
        path:"articles/list",
        component:ArticleList
      },

      {
        path:"ads/create",
        component:AdsEdit
      },
      {
        path:"ads/edit/:id",
        component:AdsEdit,
        props:true
      },
      {
        path:"ads/list",
        component:AdsList
      },

      {
        path:"admin_users/create",
        component:AdminUserEdit
      },
      {
        path:"admin_users/edit/:id",
        component:AdminUserEdit,
        props:true
      },
      {
        path:"admin_users/list",
        component:AdminUserList
      },



    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {

  if(!to.meta.isPublic && !localStorage.token){
    return next({path:"/login"})
  }

  next()

})

export default router

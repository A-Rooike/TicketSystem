
import Router from 'vue-router'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Tickit from '../pages/Tickit'
import Personal from '../pages/Personal'
import Order from '../pages/Personal/order'
import Passwd from '../pages/Personal/passwd'
import Buy from '../pages/Tickit/Buy'
import Show from '../pages/Tickit/Show'
export default  new Router({
  routes:[
  {path:'/',redirect:'/home'},
  {path:'/home',component:Home},
  {path:'/login',component:Login},
  {path:'/register',component:Register},
  {
    path:'/tickit',
    component:Tickit,
    redirect:'/tickit/show',
    children:[
      {name:'buy',path:'/tickit/buy',component:Buy},
      {path:'/tickit/show',component:Show},
    ]
  },
  {
    path:'/personal',
    component:Personal,
    redirect:'/personal/order',
    children:[
      {
        path:'/personal/order',component:Order
      },
      {
        path:'/personal/passwd',component:Passwd
      }
    ]
  },
]
}) 
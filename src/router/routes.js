/*---------------------------------
* Layouts
*--------------------------------*/
const Dashboard = () => import('layouts/Dashboard.vue')
const Default   = () => import('layouts/Default.vue')
// const Auth      = () => import('layouts/Auth.vue')
// const User      = () => import('layouts/User.vue')

/*---------------------------------
* Pages
*--------------------------------*/
const Devices       = () => import('pages/dashboard/Devices.vue')
const Animals       = () => import('pages/dashboard/Animals.vue')
const Groups        = () => import('pages/dashboard/Groups.vue')
const Messages      = () => import('pages/dashboard/Messages.vue')
const Boluses       = () => import('pages/dashboard/Bolus.vue')
const Confirmation  = () => import('pages/user/Confirmation.vue')
const Login         = () => import('pages/auth/Login.vue')
const Register      = () => import('pages/auth/Register.vue')
const Organisations = () => import('pages/admin/index.vue')
const NotFound      = () => import('pages/ErrorNotFound.vue')



const routes = [
  // {path: '/', redirect: '/dashboard'},
  {
    path: '/',
    component: Dashboard,
    meta: {requiresAuth: true},
    // redirect: '/dashboard/devices',
    children: [
      {path: '', component: Devices, props: true},
      {path: 'animals', component: Animals, props: true},
      {path: 'groups', component: Groups, props: true},
      {path: 'messages', component: Messages, props: true},
      {path: 'boluses', component: Boluses, props: true},
    ]
  },
  {
    path: '/user',
    component: Default,
    meta: {requiresAuth: true},
    children: [
      {path: 'confirm', component: Confirmation}
    ]
  },
  {
    path: '/auth',
    component: Default,
    meta: {requiresUnAuth: true},
    children: [
      {path: 'login', component: Login, props: {routerLink: '/'}},
      {path: 'register', component: Register},
    ]
  },
  {
    path: '/admin',
    component: Default,
    meta: {requiresAdmin: true},
    children: [
      {path: '', component: Login, props: {routerLink: '/admin/organisations', admin: true}},
      {path: 'organisations', component: Organisations, meta: {requiresAuth: true}},
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: NotFound
  }
]

export default routes

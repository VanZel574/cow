/*---------------------------------
* Layouts
*--------------------------------*/
const Dashboard = () => import('layouts/Dashboard.vue')
const Auth      = () => import('layouts/Auth.vue')

/*---------------------------------
* Pages
*--------------------------------*/
const Devices   = () => import('pages/dashboard/Devices.vue')
const Animals   = () => import('pages/dashboard/Animals.vue')
const Groups    = () => import('pages/dashboard/Groups.vue')
const Messages  = () => import('pages/dashboard/Messages.vue')
const Boluses   = () => import('pages/dashboard/Bolus.vue')
const Login     = () => import('pages/auth/Login.vue')
const Register  = () => import('pages/auth/Register.vue')
const Key       = () => import('pages/auth/Key.vue')
const NotFound  = () => import('pages/ErrorNotFound.vue')



const routes = [
  // {path: '/', redirect: '/dashboard'},
  {
    path: '/',
    component: Dashboard,
    meta: {requiresAuth: true},
    // redirect: '/dashboard/devices',
    children: [
      {path: '', component: Devices, props: true, meta: {requiresAuth: true}},
      {path: 'animals', component: Animals, props: true, meta: {requiresAuth: true}},
      {path: 'groups', component: Groups, props: true, meta: {requiresAuth: true}},
      {path: 'messages', component: Messages, props: true, meta: {requiresAuth: true}},
      {path: 'boluses', component: Boluses, props: true, meta: {requiresAuth: true}},
    ]
  },
  {
    path: '/auth',
    component: Auth,
    meta: {requiresUnAuth: true},
    children: [
      {path: 'login', component: Login, props: true, meta: {requiresUnAuth: true}},
      {path: 'register', component: Register, props: true, meta: {requiresUnAuth: true}},
      {path: 'key', component: Key, props: true, meta: {requiresUnAuth: true}},
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

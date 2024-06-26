import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import AuthPage from "@/views/AuthPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },

  {
    path: '/tabs/',
    component: TabsPage,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/TabHome.vue')
      },
      {
        path: 'calendar/:id?',
        name: 'agenda',
        component: () => import('@/views/TabAgenda.vue'),
      },
      {
        path: '/session/:id',
        name: 'SessionDetail',
        component: () => import('@/views/TabSessionDetails.vue')
      },
      {
        path: '/calendar-view',
        name: 'CalendarView',
        component: () => import('@/views/TabCalendar.vue')
      },
      {
        path: 'attendees',
        component: () => import('@/views/TabAttendees.vue'),
      },
      {
        path: '/attendee/:id',
        name: 'AttendeeDetail',
        component: () => import('@/views/TabAttendeeDetail.vue')
      },
      {
        path: 'images/:id?',
        component: () => import('@/views/TabGallery.vue')
      },
      {
        path: 'images/myGallery',
        component: () => import('@/views/TabMyGallery.vue')
      },
      {
        path: 'singleimage/:imageId',
        component: () => import('@/views/TabGallerySingleImage.vue')
      },
      {
        path: 'page/:id',
        component: () => import('@/views/TabSinglePage.vue')
      },
      {
        path: 'about',
        component: () => import('@/views/TabAbout.vue')
      }
    ]
  },
  {
    path: '/auth/',
    component: AuthPage,
    children: [
      {
        path: '',
        redirect: '/auth/login'
      },
      {
        path: 'login',
        component: () => import('@/views/AuthLogin.vue')
      },
      {
        path: 'register/:token',
        component: () => import('@/views/AuthRegister.vue'),
        props: true // Pass route.params to the component as props
      },
      {
        path: 'login/resetpassword',
        component: () => import('@/views/AuthResetPassword.vue')
      },
      {
        path: 'login/resetpassword/:token',
        component: () => import('@/views/AuthResetPasswordWithToken.vue'),
        props: true // Pass route.params to the component as props
      }
    ]
  },
  {
    path: '/profile/',
    component: ProfilePage,
    children: [
      {
        path:'',
        redirect: '/profile/settings'
      },
      {
        path:'settings',
        component: () => import('@/views/ProfileSettings.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //Authentication check
    const token = localStorage.getItem('accessToken');
    if (token) {
      return next();
    }
    return next('/auth/login');
  }
  next();
})


export default router

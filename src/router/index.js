import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
 
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  const isAuthenticated = localStorage.getItem('auth');
  if (['/login'].includes(to.path) || isAuthenticated) {
    next(); // allow to enter route
  } else {
    if (['/footer'].includes(to.path)){
      next();
    }else{
     next('/login'); // go to '/login';
    } 
  }
})

export default router

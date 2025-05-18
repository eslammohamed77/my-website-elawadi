import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Shop from '@/views/Shop.vue'
import Contact from '@/views/Contact.vue'
import About from '@/views/About.vue'
import Cart from '@/components/CartModal.vue'
import Wishlist from '@/views/Wishlist.vue'
import ProductDetails from "@/views/ProductDetails.vue";

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/about', name: 'About', component: About },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/wishlist', name: 'Wishlist', component: Wishlist },
  {
    path: "/product/:id",
    name: "ProductDetails",
    component: () => import('@/views/ProductDetails.vue'),
    props: true, // ✅ ده اللي لازم تضيفه
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AboutUs from "../views/AboutUs.vue";
import Products from "../views/Products.vue";
import Newsroom from "../views/Newsroom.vue";
import ContactUs from "../views/ContactUs.vue";
import ProductView from "../views/ProductView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    component: AboutUs,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/newsroom",
    name: "Newsroom",
    component: Newsroom,
  },
  {
    path: "/contactus",
    name: "ContactUs",
    component: ContactUs,
  },
  {
    path: "/product/:productTitle",
    name: "ProductRoute",
    component: ProductView,
    props(route){
      return { productObject : route.params.productObject}
    } 
      
    
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

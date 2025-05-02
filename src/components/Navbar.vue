<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 fixed-top">
      <div class="container">
        <!-- Logo and Site Name -->
        <router-link class="navbar-brand d-flex align-items-center no-hover" to="/">
          <img :src="logo" alt="Logo" class="navbar-logo" />
          <span class="fw-bold ms-2">Furniro</span>
        </router-link>
  
        <!-- Hamburger Menu for Mobile -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <!-- Navbar Content -->
        <div class="collapse navbar-collapse" id="navbarContent">
          <!-- Links Centered -->
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <router-link class="nav-link custom-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link custom-link" to="/shop">Shop</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link custom-link" to="/contact">Contact</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link custom-link" to="/about">About</router-link>
            </li>
          </ul>
  
          <!-- Icons on the right -->
          <div class="d-flex align-items-center gap-3">
            <router-link to="/profile" class="text-dark fs-5 no-hover">
              <i class="fas fa-user"></i>
            </router-link>
            <router-link to="/search" class="text-dark fs-5 no-hover">
              <i class="fas fa-search"></i>
            </router-link>
            <router-link to="/Wishlist" class="text-dark fs-5 no-hover">
              <i class="fas fa-heart"></i>
            </router-link>
            <router-link to="/cart" class="text-dark fs-5 no-hover position-relative">
                <i class="fas fa-cart-plus"></i>                                <!-- ايكونة عربة التسوق -->
                <!-- ممكن تحط عدد المنتجات هنا كـ Badge -->
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import logo from "@/assets/images/2727769ba74736d502746301ed573ed8940fc322.png";
  
  export default {
    name: "Navbar",
    data() {
      return {
        logo: logo,
      };
    },
  };
  </script>
  
  <style scoped>
  /* تنسيق اللوجو */
  .navbar-logo {
    width: 40px;
    height: auto;
  }
  
  /* جعل الـ navbar ثابت في الأعلى */
  .navbar {
    z-index: 1000;
  }
  
  /* منع الهوفر عن اللوجو والأيقونات */
  .no-hover:hover {
    text-decoration: none;
    background: none;
    color: inherit;
  }
  .nav-link:hover {
  background-color: transparent !important; /* إزالة الخلفية */
  color: #2b2b2b !important; /* ممكن تختار لون النص لما تعمل Hover */
}
.navbar-brand img {
  height: 50px; /* الطول الجديد للصورة */
  width: auto; /* العرض يتناسب تلقائيًا مع الطول */
}


  
  /* تأثير الهوفر على اللينكات فقط */
  .custom-link {
    position: relative;
    transition: color 0.3s;
  }
  
  .custom-link:hover {
    color: #007bff; /* لون الخط عند الهوفر */
  }
  
  /* إخفاء اسم الموقع في الشاشات الصغيرة */
  @media (max-width: 767px) {
    .navbar-brand span {
      display: none;
    }
  }
  </style>
  
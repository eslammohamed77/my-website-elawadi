<template>
  <footer class="footer  ">
    <div class="container">
      <div class="cont d-flex flex-wrap justify-content-between">
        <!-- أول جزء: اسم الموقع -->
        <div class="footer-item">
          <h5 class="fw-bold mb-3">Furniro.</h5>
          <p>400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
        </div>

        <!-- ثاني جزء: Links -->
        <div class="footer-item leftt">
          <h6 class="fw-bold mb-4">Links</h6>
          <ul class="list-unstyled">
            <li><router-link class="footer-link text-dark" to="/">Home</router-link></li>
            <li>
              <router-link class="footer-link text-dark" to="/shop">Shop</router-link>
            </li>
            <li>
              <router-link class="footer-link text-dark" to="/contact"
                >Contact</router-link
              >
            </li>
            <li>
              <router-link class="footer-link text-dark" to="/about">About</router-link>
            </li>
          </ul>
        </div>

        <!-- ثالث جزء: Help -->
        <div class="footer-item">
          <h6 class="fw-bold mb-4">Help</h6>
          <ul class="list-unstyled ">
            <li><a href="#" class="footer-link text-dark">Payment Options</a></li>
            <li><a href="#" class="footer-link text-dark">Returns</a></li>
            <li><a href="#" class="footer-link text-dark">Privacy Policies</a></li>
          </ul>
        </div>

        <!-- رابع جزء: Newsletter -->
        <div class="footer-item">
          <h6 class="fw-bold mb-4">Newsletter</h6>
          <form class="d-flex flex-column flex-sm-row">
            <input
              type="email"
              class="form-control mb-2 mb-sm-0 me-sm-2"
              placeholder="Enter your email"
            />
            <button class="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  </footer>
</template>
  
  <script>
export default {
  name: "FooterSection",
};
</script>
  
  <style scoped>
.footer {
  width: 100%;
  /* height: 505px; */
  padding-top: 5vh;
  border-top: 2px solid rgba(0, 0, 0, 0.158);
  
}

.footer-item {
  flex: 1 1 200px; /* كل جزء بياخد مساحة مرنة */
  margin-bottom: 20px;

}
.leftt{
  margin-left: 5vh;
  padding-right: 0;
}
.footer-item p {
  margin-top: 4vh;
  font: .8em sans-serif;
  margin-right: 1vh;
  color: #9F9F9F;
}
.footer-item h6{
  margin-bottom: 10vh;
  color: #9F9F9F;
  font: 1em sans-serif;
}

.footer-link {
  color: white;
  text-decoration: none;
  margin-bottom: 10vh;
}

.footer-link:hover {
  color: gold;
  /* text-decoration: underline; */
}

footer form input {
  min-width: 200px;
}

@media (max-width: 768px) {
  .footer-item {
    flex: 1 1 100%; /* لما الشاشة تصغر كل ديف ياخد صف كامل */
  }
}
</style>
  
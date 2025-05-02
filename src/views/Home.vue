<template>
  <div>
    <!-- Hero Section -->
    <section class="hero">
      <div class="containerr">
        <h6>New Arrival</h6>
        <h1 class="display-4 fw-bold">Discover Our New Collection</h1>
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis.
        </p>
        <div class="boutommmm">
          <router-link to="/shop" class="btnnnn btn btn-primary">
            Shop Now
          </router-link>
        </div>
      </div>
    </section>

    <!-- Browse Section -->
    <section class="Browse">
      <div class="cont">
        <h3>Browse The Range</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div class="photo00">
        <div class="photo1">
          <div class="img">
            <img src="../assets/images/dining.png" alt="" />
          </div>
          <h2>Dining</h2>
        </div>
        <div class="photo1">
          <div class="img">
            <img src="../assets/images/living.png" alt="" />
          </div>
          <h2>Living</h2>
        </div>
        <div class="photo1">
          <div class="img">
            <img src="../assets/images/bedroom.png" alt="" />
          </div>
          <h2>Bedroom</h2>
        </div>
      </div>
    </section>

    <!-- Our Products Section -->
    <section class="our-products">
      <h2>Our Products</h2>
    <div class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.sku"
        :product="product"
      />
    </div>
    <div class="boutommmmm">
      <router-link to="/shop" class="btnnnn btn btn-primary">
        Show More
      </router-link>
    </div>
  </section>

  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'Shop',
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    try {
      const response = await fetch(
        'https://furniture-api.fly.dev/v1/products?limit=8'
      );
      const result = await response.json();

      if (result.success) {
        this.products = result.data;
      } else {
        console.error('Failed to fetch products:', result.error);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
};
</script >

<style scoped lang="scss">
/* Hero Section */
.hero {
  width: 100%;
  background-image: url("@/assets/images/home.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2vh;
}

.containerr {
  background-color: #fff3e3;
  width: 40%;
  display: flex;
  flex-direction: column;
  padding: 5vh;
  margin-right: 10vh;
  margin-top: 10vh;
  text-align: left;
}

.containerr h6 {
  font: 1em sans-serif;
}

.containerr h1 {
  font: 3em sans-serif;
  color: #b88e2f;
}

.containerr p {
  font: 0.9em sans-serif;
  color: #333333;
}

.containerr .boutommmm .btnnnn {
  background-color: #b88e2f;
  border: 0;
  border-radius: 0;
  padding: 15px 35px;
  font: 0.8em sans-serif;
  color: white;
}

.containerr .boutommmm .btnnnn:hover {
  background-color: #a0741f;
  color: white;
}

/* Responsive Hero */
@media (max-width: 992px) {
  .containerr {
    width: 50%;
    margin-right: 5vh;
    padding: 4vh;
  }

  .containerr h1 {
    font-size: 2.5em;
  }
}

@media (max-width: 768px) {
  .hero {
    justify-content: center;
    text-align: center;
  }

  .containerr {
    width: 85%;
    margin: 5vh auto;
    align-items: center;
    text-align: center;
  }

  .containerr h1 {
    font-size: 2em;
  }

  .containerr p {
    font-size: 0.85em;
  }

  .btnnnn {
    padding: 12px 30px;
  }
}

/* Browse Section */
.Browse {
  margin-top: 4vh;
  margin-bottom: 4vh;
  text-align: center;
}

.cont {
  margin-bottom: 5vh;
}

.cont h3 {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 1vh;
}

.cont p {
  color: #666;
  font-size: 1em;
}

.photo00 {
  display: flex;
  justify-content: center;
  gap: 3vh;
  flex-wrap: wrap;
}

.photo1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 410px;
}

.photo1 .img img {
  width: 100%;
  height: 550px;
  object-fit: cover;
  border-radius: 8px;
}

.photo1 h2 {
  margin-top: 2vh;
  font-size: 1.3em;
  color: #333;
}

@media (max-width: 768px) {
  .photo1 {
    width: 80%;
  }
}

/* Our Products Section */
.our-products {
  width: 100%;
  margin-top: 7vh ;
  padding: 40px;
  text-align: center;
}

.our-products .cont h2 {
  font-size: 32px;
  margin-bottom: 10px;
}

.our-products .cont p {
  font-size: 16px;
}

.our-products .cont span {
  font-weight: bold;
  color: #ffc107;
}

.our-products h2 {
  margin-bottom: 32px;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 0 20px;
}
/* Show More Button */
.our-products .boutommmmm .btnnnn {
  background-color: white;
  color: #b88e2f;
  border: #b88e2f solid 1px;
  border-radius: 0;
  padding: 10px 60px;
  margin-top: 5vh;
}

.our-products .boutommmmm .btnnnn:hover {
  background-color: #b88e2f;
  color: #eee;
}

/* Responsive Product Cards */
@media (max-width: 1024px) {
  .product-card {
    width: 48%;
  }
}

@media (max-width: 768px) {
  .product-card {
    width: 100%;
  }
}

/* ✅ لأجهزة أصغر مثل الموبايلات الصغيرة */
@media (max-width: 576px) {
  .product-card {
    width: 100%;
    margin: 10px 0; /* تخلي فيه تباعد علوي وسفلي فقط */
  }

  .wishlist-item {
    width: 100%;
  }

  .wishlist-page {
    padding: 10px;
    width: 94%;
  }

  .our-products .cont {
    padding: 40px 20px;
  }

  .our-products .cont h2 {
    font-size: 24px;
  }

  .our-products .cont p {
    font-size: 14px;
  }
}

</style>

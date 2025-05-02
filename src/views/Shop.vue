<template>
  <section class="our-products">
    <div class="cont">
      <div class="overlay"></div> <!-- فلتر تعتيم -->
      <div class="content">
        <h2>Shop</h2>
        <p>Home > <span>Shop</span></p>
      </div>
    </div>

    <div class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.sku"
        :product="product"
        @product-added="showCartModalHandler"
      />
    </div>

    <!-- إظهار الـ Modal عند إضافة منتج -->
    <CartModal
      v-if="showCartModal"
      :product="lastAddedProduct"
      @close="showCartModal = false"
    />
  </section>
  <div class="scorl">
    <h4>1</h4>
    <h4>2</h4>
    <h4>3</h4>
    <h4>Next</h4>
  </div>

</template>



<script>
import ProductCard from '@/components/ProductCard.vue';
import CartModal from '@/components/CartModal.vue';

export default {
  name: 'Shop',
  components: {
    ProductCard,
    CartModal
  },
  data() {
    return {
      products: [],
      showCartModal: false,
      lastAddedProduct: null
    };
  },
  async mounted() {
    try {
      const response = await fetch(
        'https://furniture-api.fly.dev/v1/products?limit=20'
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
  methods: {
    showCartModalHandler(product) {
      this.lastAddedProduct = product;
      this.showCartModal = true;

      // إغلاق نافذة الـ modal بعد 3 ثواني
      setTimeout(() => {
        this.showCartModal = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.our-products {
  width: 100%;
  margin-top: 4vh ;
  padding: 40px;
  text-align: center;
}
.our-products .cont {
  position: relative;
  background-image: url(../assets/images/back2.jpg);
  background-size: cover;
  background-position: center;
  width: 100%;
  padding: 80px 0;
  margin-bottom: 5vh;
  overflow: hidden;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;}

/* فلتر تعتيم */
.our-products .cont .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4); /* تعتيم خفيف */
  z-index: 1;
}

/* النص */
.our-products .cont .content {
  position: relative;
  z-index: 2;
}

.our-products .cont h2 {
  font-size: 32px;
  margin-bottom: 10px;
  margin-top: 10px;
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
.scorl{
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: auto;
  width: 20%;
  margin-bottom:4vh ;
}
.scorl h4{
  background-color: #B88E2F;
  padding: 10px 15px ;
  border-radius: 8px;
  font: 1em sans-serif;
  color:white;
  

}

</style>

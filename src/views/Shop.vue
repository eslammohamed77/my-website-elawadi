<template>
  <section class="shop-page-container">
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Our Shop</h1>
        <p>Home &gt; <span>Shop</span></p>
      </div>
    </div>

    <div class="products-grid-wrapper">
      <div v-if="loading" class="loading-products">
        <div class="spinner"></div>
        <p>Loading products...</p>
      </div>
      <div v-else-if="products.length === 0" class="no-products">
        <p>No products found at the moment.</p>
        <router-link to="/" class="back-home-btn">Go to Home</router-link>
      </div>
      <div v-else class="products-grid">
        <ProductCard
          v-for="product in products"
          :key="product.sku"
          :product="product"
          @product-added="showCartModalHandler"
        />
      </div>
    </div>

    <div class="pagination-controls" v-if="products.length > 0">
      <button class="pagination-btn active">1</button>
      <button class="pagination-btn">2</button>
      <button class="pagination-btn">3</button>
      <button class="pagination-btn next">Next</button>
    </div>

    <CartModal
      v-if="showCartModal"
      :product="lastAddedProduct"
      @close="showCartModal = false"
    />
  </section>
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
      loading: true, // إضافة حالة تحميل للمنتجات
      showCartModal: false,
      lastAddedProduct: null
    };
  },
  async mounted() {
    try {
      this.loading = true; // بدء التحميل
      const response = await fetch(
        'https://furniture-api.fly.dev/v1/products?limit=20'
      );
      const result = await response.json();

      if (result.success) {
        this.products = result.data;
        console.log('Shop: Products loaded with SKUs:', this.products.map(p => p.sku));
      } else {
        console.error('Failed to fetch products:', result.error);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      this.loading = false; // انتهاء التحميل
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
/* Base Styles & Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.shop-page-container {
    margin-top: 10vh;
  width: 100%;
  padding-bottom: 60px; /* Increased bottom padding for overall page */
  font-family: 'Arial', sans-serif;
  background-color: #f8f8f8; /* Light background for the whole page */
}

/* --- Hero Section Styling (Updated for better centering) --- */
.hero-section {
  position: relative;
  background-image: url(../assets/images/back2.jpg);
  background-size: cover;
  background-position: center;
  width: 100%;
  padding: 10px 20px; /* Increased padding for more vertical space */
  margin-bottom: 50px;
  color: white;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center;     /* Center vertically */
  text-align: center;      /* Ensure text itself is centered */
  min-height: 250px; /* Give it a minimum height */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* More prominent shadow */
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.55); /* Slightly darker overlay for contrast */
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  width: 100%; /* Ensure it takes full width for centering */
  animation: fadeIn 1s ease-out forwards;
}

.hero-content h1 {
  font-size: 52px; /* Larger heading */
  margin-bottom: 15px;
  font-weight: 800; /* Extra bold */
  text-transform: uppercase; /* Uppercase for modern feel */
  letter-spacing: 2px;
}

.hero-content p {
  font-size: 20px; /* Slightly larger paragraph */
  letter-spacing: 1px;
}

.hero-content span {
  font-weight: bold;
  color: #ffc107; /* Accent color */
}

/* --- Products Grid Styling --- */
.products-grid-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  justify-content: center;
}

/* Loading and No Products states */
.loading-products,
.no-products {
  font-size: 20px;
  color: #666;
  padding: 80px 20px; /* Increased padding */
  text-align: center;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex; /* For centering spinner */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px; /* Ensure it has some height */
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #B88E2F; /* Accent color for spinner */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-products p {
    margin-bottom: 25px;
    font-size: 22px;
    color: #444;
}

.back-home-btn {
    display: inline-block;
    background-color: #3498db;
    color: white;
    padding: 12px 25px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 18px;
    font-weight: 600;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.back-home-btn:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
}

/* --- Pagination Styling --- */
.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 12px; /* Increased spacing between buttons */
  margin-top: 60px; /* More spacing above pagination */
  margin-bottom: 20px;
}

.pagination-btn {
  background-color: #f0f0f0;
  color: #555;
  padding: 14px 22px; /* More padding */
  border: none;
  border-radius: 10px; /* Slightly more rounded */
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.pagination-btn:hover {
  background-color: #e5e5e5;
  transform: translateY(-3px); /* Slight lift on hover */
}

.pagination-btn.active {
  background-color: #B88E2F; /* Your brand color for active */
  color: white;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.25);
  transform: translateY(-2px);
}

.pagination-btn.next {
  background-color: #3498db;
  color: white;
}
.pagination-btn.next:hover {
  background-color: #2980b9;
}

/* --- Animations --- */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 42px;
  }
  .hero-content p {
    font-size: 18px;
  }
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Smaller min-width for cards */
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 32px;
  }
  .hero-content p {
    font-size: 16px;
  }
  .pagination-btn {
    padding: 10px 15px;
    font-size: 15px;
  }
  .products-grid-wrapper {
      padding: 15px;
  }
  .loading-products,
  .no-products {
      padding: 50px 15px;
  }
}
</style>
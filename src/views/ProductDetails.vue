<template>
  <div class="product-details-page">
    <div v-if="product" class="product-details-container">
      <div class="product-info-section">
        <div class="product-image-gallery">
          <img :src="product.image_path" :alt="product.name" class="main-image" />
        </div>

        <div class="product-details-content">
          <h1>{{ product.name }}</h1>
          <p class="product-sku">SKU: {{ product.sku }}</p>
          <p class="product-price">Rp {{ formattedPrice(product.price) }}</p>

          <div class="product-rating">
            <span v-for="star in 5" :key="star" :class="{ 'filled-star': star <= 4 }">★</span>
            <span class="rating-count"> ({{ product.rating_count || 150 }} reviews)</span>
          </div>
          
          <p class="product-description">{{ product.description }}</p>

          <div class="options-section">
            <div class="color-options">
              <span class="option-label">Color:</span>
              <div class="colors">
                <div
                  v-for="color in product.colors"
                  :key="color.name"
                  class="color-dot"
                  :style="{ backgroundColor: color.hex }"
                  :class="{ 'selected-color': selectedColor === color.name }"
                  @click="selectedColor = color.name"
                ></div>
              </div>
            </div>

            <div class="size-options">
              <span class="option-label">Size:</span>
              <select v-model="selectedSize" class="size-select">
                <option v-for="size in product.sizes" :key="size" :value="size">{{ size }}</option>
              </select>
            </div>
          </div>

          <div class="quantity-add-to-cart">
            <div class="quantity-controls">
              <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
              <input type="number" v-model.number="quantity" min="1" />
              <button @click="increaseQuantity">+</button>
            </div>
            <button class="add-to-cart-btn" @click="addToCart(product)">Add to Cart</button>
          </div>
        </div>
      </div>
      
      <div class="product-tabs">
        <div class="tabs-header">
          <div :class="{ 'active-tab': activeTab === 'description' }" @click="activeTab = 'description'">Description</div>
          <div :class="{ 'active-tab': activeTab === 'additional' }" @click="activeTab = 'additional'">Additional Information</div>
          <div :class="{ 'active-tab': activeTab === 'reviews' }" @click="activeTab = 'reviews'">Reviews ({{ product.rating_count || 150 }})</div>
        </div>
        <div class="tab-content">
          <div v-show="activeTab === 'description'">
            <p>{{ product.full_description || product.description }}</p>
          </div>
          <div v-show="activeTab === 'additional'">
            <p><strong>Weight:</strong> {{ product.weight || '12 kg' }}</p>
            <p><strong>Dimensions:</strong> {{ product.dimensions || '150 x 80 x 75 cm' }}</p>
            <p><strong>Materials:</strong> {{ product.materials || 'Solid Oak, Steel' }}</p>
          </div>
          <div v-show="activeTab === 'reviews'">
            <p>No customer reviews yet. Be the first to review this product!</p>
          </div>
        </div>
      </div>
      
      <div class="related-products-section">
        <h2>You Might Also Like</h2>
        <div class="products-grid">
          <ProductCard v-for="recProduct in relatedProducts" :key="recProduct.sku" :product="recProduct" />
        </div>
        <div class="view-shop-container">
          <router-link to="/shop" class="view-shop-btn">View All Products</router-link>
        </div>
      </div>
    </div>
    
    <div v-else class="loading-state">
      <div class="spinner"></div>
      <p>Loading product details...</p>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'ProductDetails',
  components: {
    ProductCard,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      product: null,
      relatedProducts: [],
      quantity: 1,
      selectedColor: '',
      selectedSize: '',
      activeTab: 'description',
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  watch: {
    // Watch for changes in the 'id' prop to fetch new product data
    id: {
      immediate: true,
      handler(newId) {
        this.fetchProductDetails(newId);
        this.fetchRelatedProducts(); // Fetch new related products for the new product
        window.scrollTo(0, 0); // Scroll to the top when a new product loads
      },
    },
  },
  methods: {
    async fetchProductDetails(sku) {
      this.product = null; // Reset product data to show loading state
      try {
        const response = await fetch(`https://furniture-api.fly.dev/v1/products/${sku}`);
        const result = await response.json();
        
        if (result.success && result.data) {
          this.product = result.data;
          this.selectedColor = this.product.colors?.[0]?.name || ''; // Default to the first color
          this.selectedSize = this.product.sizes?.[0] || ''; // Default to the first size
        } else {
          console.error('Product not found:', result.error);
          this.product = null;
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        this.product = null;
      }
    },
    async fetchRelatedProducts() {
      try {
        const response = await fetch('https://furniture-api.fly.dev/v1/products?limit=8');
        const result = await response.json();
        
        if (result.success) {
          // Filter out the current product from the related products list
          this.relatedProducts = result.data.filter(p => p.sku !== this.id);
        } else {
          console.error('Failed to fetch related products:', result.error);
          this.relatedProducts = [];
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
        this.relatedProducts = [];
      }
    },
    formattedPrice(price) {
      return price ? price.toLocaleString("id-ID") : "0";
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToCart(product) {
      if (!this.selectedColor && product.colors?.length > 0) {
        alert('Please select a color.');
        return;
      }
      if (!this.selectedSize && product.sizes?.length > 0) {
        alert('Please select a size.');
        return;
      }

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const itemSku = product.sku;
      const existingItemIndex = cart.findIndex(item => item.sku === itemSku);

      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += this.quantity;
      } else {
        cart.push({
          ...product,
          quantity: this.quantity,
          selectedColor: this.selectedColor,
          selectedSize: this.selectedSize,
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${this.quantity} x ${product.name} added to cart!`);
    },
  },
};
</script>

<style scoped>
/* Main Container */
.product-details-page {
  margin-top: 10vh;
  font-family: 'Arial', sans-serif;
  padding: 80px 20px;
  background-color: #f8f8f8;
}

/* Loading Spinner */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  font-size: 20px;
  color: #666;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #B88E2F;
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

/* Product Info Section */
.product-details-container {
  max-width: 1200px;
  margin: 0 auto;
}

.product-info-section {
  display: flex;
  gap: 50px;
  background-color: #fff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 60px;
}

.product-image-gallery {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-image {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

.product-details-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-details-content h1 {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 10px;
  color: #333;
}

.product-sku {
  font-size: 16px;
  color: #888;
  margin-bottom: 15px;
}

.product-price {
  font-size: 32px;
  font-weight: bold;
  color: #B88E2F;
  margin-bottom: 20px;
}

.product-rating {
  font-size: 22px;
  color: #ccc;
  margin-bottom: 25px;
}
.product-rating .filled-star {
  color: #ffc107;
}
.rating-count {
  font-size: 16px;
  color: #777;
}

.product-description {
  font-size: 18px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 30px;
}

/* Options Section */
.options-section {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 40px;
}

.option-label {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-right: 15px;
}

.color-options .colors {
  display: flex;
  gap: 12px;
}

.color-dot {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid transparent;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.color-dot.selected-color {
  border-color: #B88E2F;
  transform: scale(1.1);
}

.size-select {
  padding: 12px 15px;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  min-width: 150px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13.2-6.4H18.6c-5%200-9.3%201.8-13.2%206.4-3.9%204.5-5.9%2010.5-5.5%2016.5l145%20145c3.2%203.2%207.2%204.8%2012%204.8s8.8-1.6%2012-4.8l145-145c4-6%203.8-12%200-16.5z%22%2F%3E%3C%2Fsvg%3E') no-repeat right 15px center;
  background-size: 12px;
  background-color: white;
}

/* Quantity & Add to Cart */
.quantity-add-to-cart {
  display: flex;
  align-items: center;
  gap: 25px;
}

.quantity-controls {
  display: flex;
  border: 2px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  height: 60px;
}

.quantity-controls button {
  width: 60px;
  font-size: 28px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.quantity-controls button:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.quantity-controls button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.quantity-controls input {
  width: 80px;
  text-align: center;
  border: none;
  font-size: 20px;
  font-weight: bold;
  -moz-appearance: textfield;
  outline: none;
}
.quantity-controls input::-webkit-outer-spin-button,
.quantity-controls input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.add-to-cart-btn {
  padding: 15px 40px;
  background-color: #B88E2F;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  height: 60px;
}

.add-to-cart-btn:hover {
  background-color: #a37b2a;
  transform: translateY(-3px);
}

/* Tabs Section */
.product-tabs {
  max-width: 1200px;
  margin: 60px auto;
  background-color: #fff;
  padding: 30px 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.tabs-header {
  display: flex;
  border-bottom: 2px solid #eee;
  margin-bottom: 20px;
}

.tabs-header div {
  font-size: 22px;
  font-weight: bold;
  padding: 15px 30px;
  cursor: pointer;
  color: #999;
  position: relative;
  transition: color 0.3s ease;
}

.tabs-header div.active-tab {
  color: #B88E2F;
}

.tabs-header div.active-tab::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #B88E2F;
}

.tab-content {
  padding: 20px 0;
}

.tab-content p {
  font-size: 17px;
  line-height: 1.8;
  color: #666;
  margin-bottom: 15px;
}

.tab-content strong {
  color: #333;
}

/* Related Products Section (NEW) */
.related-products-section {
  max-width: 1200px;
  margin: 80px auto 40px;
  text-align: center;
}

.related-products-section h2 {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 50px;
  color: #333;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  justify-content: center;
  margin-bottom: 40px;
}

/* View All Products Button */
/* ... (كود الستايل السابق) ... */

/* Related Products Section */
.related-products-section {
  max-width: 1200px;
  margin: 80px auto 40px;
  text-align: center;
}

.related-products-section h2 {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 50px;
  color: #333;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  justify-content: center;
  margin-bottom: 40px;
}

/* --- View All Products Button (Updated to match your style) --- */
.view-shop-container {
  margin-top: 40px; /* Adjusted margin */
}

.view-shop-btn {
  /* Matching your button style */
  background-color: white;
  color: #b88e2f;
  border: #b88e2f solid 1px;
  border-radius: 0; /* Remove border-radius */
  padding: 15px 60px; /* Increased padding */
  font-size: 18px; /* Adjusted font size */
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: none; /* Removed box-shadow */
}

.view-shop-btn:hover {
  background-color: #b88e2f;
  color: #eee;
  transform: translateY(0); /* Remove the lift effect */
  box-shadow: none;
}

/* ... (باقي كود الستايل) ... */
.view-shop-btn:hover {
  background-color: #b88e2f;
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .product-info-section {
    flex-direction: column;
    gap: 30px;
    padding: 30px;
  }
  .product-details-content {
    text-align: center;
    margin-top: 20px;
  }
  .product-image-gallery, .main-image {
    max-width: 100%;
  }
  .options-section, .quantity-add-to-cart {
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  .related-products-section h2 {
      font-size: 36px;
  }
}

@media (max-width: 768px) {
  .product-details-content h1 {
    font-size: 40px;
  }
  .product-details-content .product-price {
    font-size: 28px;
  }
  .product-tabs {
    margin: 40px auto;
    padding: 20px;
  }
  .tabs-header div {
    font-size: 18px;
    padding: 15px;
  }
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  .view-shop-btn {
    padding: 15px 40px;
    font-size: 18px;
  }
}

@media (max-width: 576px) {
  .product-details-content h1 {
    font-size: 32px;
  }
  .product-details-content .product-price {
    font-size: 24px;
  }
  .options-section {
    flex-direction: column;
  }
  .related-products-section h2 {
      font-size: 30px;
      margin-bottom: 30px;
  }
  .products-grid {
    grid-template-columns: 1fr;
    max-width: 350px;
    margin: 0 auto 30px;
  }
}
</style>
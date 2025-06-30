<template>
  <div class="cart-page-container">
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Your Shopping Cart</h1>
        <p>Home &gt; <span>Cart</span></p>
      </div>
    </div>

    <div class="cart-content-wrapper">
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Your cart is empty. Start shopping now!</p>
        <router-link to="/shop" class="shop-now-btn">Shop Now</router-link>
      </div>

      <div v-else class="cart-layout">
        <div class="cart-items-list">
          <h2 class="section-title">My Items ({{ totalItemsInCart }})</h2>
          <transition-group name="fade" tag="div">
            <div v-for="item in cartItems" :key="item.sku" class="cart-item-card">
              <div class="item-image">
                <img :src="item.image_path" :alt="item.name" />
              </div>
              <div class="item-details">
                <router-link :to="{ name: 'ProductDetails', params: { id: item.sku } }" class="item-name">
                  {{ item.name }}
                </router-link>
                <p class="item-price">Rp {{ formattedPrice(item.price) }}</p>
                <div v-if="item.selectedColor" class="item-color">
                  Color: <span :style="{ backgroundColor: getColorHex(item.selectedColor) }" class="color-dot"></span> {{ item.selectedColor }}
                </div>
                <div class="quantity-controls">
                  <button @click="decreaseQuantity(item.sku)" :disabled="item.quantity <= 1">-</button>
                  <input type="number" v-model.number="item.quantity" min="1" @change="updateQuantity(item.sku, item.quantity)" />
                  <button @click="increaseQuantity(item.sku)">+</button>
                </div>
              </div>
              <button class="remove-item-btn" @click="removeItem(item.sku)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            </div>
          </transition-group>
        </div>

        <div class="order-summary-card">
          <h2 class="section-title">Order Summary</h2>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>Rp {{ formattedPrice(cartSubtotal) }}</span>
          </div>
          <div class="summary-row">
            <span>Shipping Estimate</span>
            <span>Rp {{ formattedPrice(shippingCost) }}</span>
          </div>
          <div class="summary-row total">
            <span>Order Total</span>
            <span>Rp {{ formattedPrice(orderTotal) }}</span>
          </div>
          <button class="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartPage',
  data() {
    return {
      cartItems: [],
      allColors: [
        { name: 'Brown', hex: '#8B4513' },
        { name: 'Gray', hex: '#808080' },
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Black', hex: '#000000' },
      ],
    };
  },
  computed: {
    totalItemsInCart() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    cartSubtotal() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    shippingCost() {
      return this.cartItems.length > 0 ? 50000 : 0;
    },
    orderTotal() {
      return this.cartSubtotal + this.shippingCost;
    }
  },
  methods: {
    formattedPrice(price) {
      return price ? price.toLocaleString("id-ID") : "0";
    },
    getColorHex(colorName) {
      const color = this.allColors.find(c => c.name === colorName);
      return color ? color.hex : '#000000';
    },
// ... داخل methods
loadCartItems() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    this.cartItems = JSON.parse(storedCart);
  } else {
    this.cartItems = [
      {
        sku: '9da38fbe-e54c-4b33-b120-af09a2a2c9e2',
        name: 'Elegant Chair',
        price: 1200000,
        image_path: 'https://picsum.photos/id/237/200/200', // <-- رابط صورة مؤقتة
        quantity: 2,
        selectedColor: 'Brown'
      },
      {
        sku: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
        name: 'Spacious Wooden Table',
        price: 2800000,
        image_path: 'https://picsum.photos/id/20/200/200', // <-- رابط صورة مؤقتة
        quantity: 1,
        selectedColor: 'Black'
      }
    ];
    this.saveCartItems();
  }
},
    saveCartItems() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    },
    increaseQuantity(sku) {
      const item = this.cartItems.find(i => i.sku === sku);
      if (item) {
        item.quantity++;
        this.saveCartItems();
      }
    },
    decreaseQuantity(sku) {
      const item = this.cartItems.find(i => i.sku === sku);
      if (item && item.quantity > 1) {
        item.quantity--;
        this.saveCartItems();
      }
    },
    updateQuantity(sku, newQuantity) {
      const item = this.cartItems.find(i => i.sku === sku);
      if (item) {
        item.quantity = Math.max(1, parseInt(newQuantity) || 1);
        this.saveCartItems();
      }
    },
    removeItem(sku) {
      this.cartItems = this.cartItems.filter(item => item.sku !== sku);
      this.saveCartItems();
    }
  },
  mounted() {
    this.loadCartItems();
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

.cart-page-container {
  margin-top: 10vh;
  width: 100%;
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f8f8f8; /* Light background for the whole page */
  padding-bottom: 60px; /* Consistent bottom padding */
}

/* --- Hero Section Styling (Updated for better centering) --- */
.hero-section {
  position: relative;
  background-image: url(../assets/images/back2.jpg); /* تأكد من المسار الصحيح */
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

/* Cart Content Wrapper */
.cart-content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 30px;
  text-align: left;
}

/* Empty Cart State */
.empty-cart {
  text-align: center;
  padding: 100px 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.empty-cart p {
  font-size: 20px;
  color: #555;
  margin-bottom: 30px;
}

.shop-now-btn {
  display: inline-block;
  background-color: #B88E2F;
  color: white;
  padding: 15px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.shop-now-btn:hover {
  background-color: #a37b2a;
  transform: translateY(-2px);
}

/* Cart Layout (Items + Summary) */
.cart-layout {
  display: grid;
  grid-template-columns: 2fr 1fr; /* Items list takes 2/3, summary takes 1/3 */
  gap: 40px;
  align-items: flex-start; /* Aligns content to the top */
}

/* Cart Items List */
.cart-items-list {
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.cart-item-card {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  gap: 20px;
}

.cart-item-card:last-child {
  border-bottom: none;
}

.item-image {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex-grow: 1;
  text-align: left;
}

.item-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  transition: color 0.2s ease;
}

.item-name:hover {
  color: #B88E2F;
}

.item-price {
  font-size: 16px;
  color: #555;
  margin-top: 5px;
}

.item-color {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  display: flex;
  align-items: center;
}

.color-dot {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin-right: 5px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.quantity-controls button {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quantity-controls button:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls input[type="number"] {
  width: 50px;
  height: 35px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  -moz-appearance: textfield;
}

.quantity-controls input[type="number"]::-webkit-outer-spin-button,
.quantity-controls input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.remove-item-btn {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.remove-item-btn:hover {
  background-color: #ffebeb;
  color: #c0392b;
}
.remove-item-btn svg {
  width: 20px;
  height: 20px;
}

/* Order Summary Card */
.order-summary-card {
  background-color: #fff; /* Consistent with item list */
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.order-summary-card .section-title {
  margin-bottom: 25px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 16px;
  color: #555;
}

.summary-row.total {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  border-top: 1px solid #eee;
  padding-top: 20px;
  margin-top: 10px;
}

.checkout-btn {
  width: 100%;
  background-color: #B88E2F; /* Your brand color for checkout */
  color: white;
  padding: 15px 25px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 30px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.checkout-btn:hover {
  background-color: #a37b2a;
  transform: translateY(-2px);
}

/* Transition for removing items */
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.fade-leave-active {
  position: absolute;
  width: calc(100% - 60px); /* Adjust width to fit container padding */
}

/* Animations */
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

/* Responsive Design */
@media (max-width: 992px) {
  .cart-layout {
    grid-template-columns: 1fr; /* Stack columns on smaller screens */
    gap: 30px;
  }
  .section-title {
    text-align: center; /* Center titles on smaller screens */
  }
}

@media (max-width: 576px) {
  .hero-content h1 {
    font-size: 36px;
  }
  .hero-content p {
    font-size: 16px;
  }
  .cart-item-card {
    flex-wrap: wrap; /* Allow item details to wrap below image */
    text-align: center;
    justify-content: center;
    padding-top: 40px; /* Adjust padding for button */
    position: relative; /* For absolute positioning of remove button */
  }
  .item-image {
    width: 80px;
    height: 80px;
  }
  .item-details {
    width: 100%; /* Take full width */
  }
  .quantity-controls {
    justify-content: center; /* Center quantity controls */
  }
  .remove-item-btn {
    position: absolute; /* Position remove button top-right */
    top: 10px;
    right: 10px;
  }
  .cart-content-wrapper {
      padding: 0 15px;
  }
}
</style>
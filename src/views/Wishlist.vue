<template>
  <div class="wishlist-page-container">
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Your Wishlist</h1>
        <p>Home &gt; <span>Wishlist</span></p>
      </div>
    </div>

    <div class="wishlist-content-wrapper">
      <div v-if="wishlist.length === 0" class="empty-wishlist">
        <p>Your wishlist is empty. Start adding some favorite items!</p>
        <router-link to="/shop" class="shop-now-btn">Explore Products</router-link>
      </div>

      <div v-else class="wishlist-grid">
        <transition-group name="fade" tag="div" class="grid-container">
          <div v-for="item in wishlist" :key="item.sku" class="wishlist-item-card">
            <div class="item-image-wrapper">
              <img :src="item.image_path" :alt="item.name" class="item-image" />
            </div>
            <div class="item-info">
              <router-link :to="{ name: 'ProductDetails', params: { id: item.sku } }" class="item-name">
                {{ item.name }}
              </router-link>
              <p class="item-price">Rp {{ formattedPrice(item.price) }}</p>
              <p v-if="item.description" class="item-description">{{ truncateDescription(item.description, 80) }}</p>
            </div>
            <div class="item-actions">
              <button class="add-to-cart-btn" @click="addToCart(item)">Add to Cart</button>
              <button class="remove-btn" @click="removeItem(item.sku)">Remove</button>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wishlist',
  data() {
    return {
      wishlist: [],
    };
  },
  mounted() {
    this.loadWishlist();
  },
  methods: {
  // ... داخل methods
// ... داخل methods في src/views/Wishlist.vue
loadWishlist() {
  const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  this.wishlist = storedWishlist;

  if (this.wishlist.length === 0) {
    this.wishlist = [
      {
        sku: '9da38fbe-e54c-4b33-b120-af09a2a2c9e2',
        name: 'Elegant Chair',
        description: 'A beautifully designed chair for modern living spaces, combining comfort and style.',
        price: 1200000,
        image_path: 'https://picsum.photos/id/60/300/220', // استخدم هذا الرابط مؤقتًا
      },
      {
        sku: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
        name: 'Minimalist Coffee Table',
        description: 'Sleek and functional coffee table, perfect centerpiece for your lounge area.',
        price: 950000,
        image_path: 'https://picsum.photos/id/1080/300/220', // استخدم هذا الرابط مؤقتًا
      },
      {
        sku: 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
        name: 'Comfortable Sofa',
        description: 'Plush three-seater sofa, ideal for relaxing with family and friends. High-quality fabric.',
        price: 3500000,
        image_path: 'https://picsum.photos/id/40/300/220', // استخدم هذا الرابط مؤقتًا
      },
      {
        sku: 'c3d4e5f6-a7b8-c9d0-e1f2-3a4b5c6d7e8f',
        name: 'Rustic Bookshelf',
        description: 'Sturdy wooden bookshelf with multiple compartments for all your storage needs.',
        price: 1800000,
        image_path: 'https://picsum.photos/id/70/300/220', // استخدم هذا الرابط مؤقتًا
      }
    ];
    this.saveWishlist();
  }
},

    saveWishlist() {
      localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
    },
    formattedPrice(price) {
      return price ? price.toLocaleString("id-ID") : "0";
    },
    truncateDescription(description, maxLength) {
      if (!description) return '';
      if (description.length <= maxLength) return description;
      return description.substring(0, maxLength) + '...';
    },
    addToCart(item) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItemIndex = cart.findIndex(cartItem => cartItem.sku === item.sku);

      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1; // Increment quantity if item exists
      } else {
        cart.push({ ...item, quantity: 1, selectedColor: item.selectedColor || null }); // Add new item
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${item.name} added to cart!`);
      this.removeItem(item.sku); // Optional: remove from wishlist after adding to cart
    },
    removeItem(sku) {
      this.wishlist = this.wishlist.filter(item => item.sku !== sku);
      this.saveWishlist();
    }
  },
};
</script>

<style scoped>
/* Base Styles & Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wishlist-page-container {
  margin-top: 10vh;
  width: 100%;
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f8f8f8; /* Light background for the whole page */
  padding-bottom: 60px; /* Consistent bottom padding */
}

/* --- Hero Section Styling (Consistent with Shop & Cart) --- */
.hero-section {
  position: relative;
  background-image: url(../assets/images/back2.jpg); /* Ensure the path is correct */
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

/* Wishlist Content Wrapper */
.wishlist-content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Empty Wishlist State */
.empty-wishlist {
  text-align: center;
  padding: 100px 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.empty-wishlist p {
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

/* Wishlist Grid & Item Styling */
.wishlist-grid {
  /* This wrapper doesn't need much style if grid-container handles layout */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px; /* Spacing between cards */
  justify-content: center; /* Center cards horizontally */
}

.wishlist-item-card {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08); /* Soft, prominent shadow */
  overflow: hidden; /* Ensures image corners are rounded */
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative; /* For transition-group */
}

.wishlist-item-card:hover {
  transform: translateY(-8px); /* Lift effect on hover */
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15); /* More intense shadow on hover */
}

.item-image-wrapper {
  width: 100%;
  height: 220px; /* Fixed height for consistent image size */
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the area without distortion */
  transition: transform 0.3s ease;
}

.wishlist-item-card:hover .item-image {
  transform: scale(1.05); /* Slight zoom on image on hover */
}

.item-info {
  padding: 20px;
  flex-grow: 1; /* Allows info section to expand */
}

.item-name {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  text-decoration: none;
  margin-bottom: 8px;
  display: block; /* Make it a block for margin */
  transition: color 0.2s ease;
}

.item-name:hover {
  color: #B88E2F; /* Accent color on hover */
}

.item-price {
  font-size: 18px;
  font-weight: bold;
  color: #3498db; /* Blue for price */
  margin-bottom: 10px;
}

.item-description {
  font-size: 15px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 15px;
}

.item-actions {
  display: flex;
  gap: 10px;
  padding: 0 20px 20px; /* Padding for buttons at the bottom */
  width: 100%;
  justify-content: center; /* Center buttons */
}

.add-to-cart-btn,
.remove-btn {
  flex: 1; /* Allow buttons to take equal width */
  padding: 12px 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.add-to-cart-btn {
  background-color: #3498db; /* Blue for Add to Cart */
  color: white;
}

.add-to-cart-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.remove-btn {
  background-color: #e74c3c; /* Red for Remove */
  color: white;
}

.remove-btn:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
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

/* Transition for removing items */
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.9); /* Shrink effect */
}
.fade-leave-active {
  position: absolute; /* Allows items to animate out without collapsing space */
  width: calc((100% - 60px) / 3); /* Adjust width for grid items to prevent layout shift */
  /* This calculation assumes 3 items per row and 20px padding on wrapper */
  /* You may need to adjust if your grid layout is different or gap changes */
}


/* Responsive Design */
@media (max-width: 992px) {
  .hero-content h1 {
    font-size: 42px;
  }
  .hero-content p {
    font-size: 18px;
  }
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Smaller min-width for cards */
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 36px;
  }
  .hero-content p {
    font-size: 16px;
  }
  .wishlist-item-card {
    margin: auto; /* Center items if they don't fill a row */
  }
  .fade-leave-active {
    width: calc((100% - 40px) / 2); /* Adjust for 2 items per row on smaller screens */
  }
}

@media (max-width: 576px) {
  .hero-content h1 {
    font-size: 32px;
  }
  .hero-content p {
    font-size: 14px;
  }
  .wishlist-content-wrapper {
    padding: 0 15px;
  }
  .grid-container {
    grid-template-columns: 1fr; /* Single column on very small screens */
    gap: 20px;
  }
  .wishlist-item-card {
    max-width: 350px; /* Limit width on single column layout */
    margin: 0 auto; /* Center single column cards */
  }
  .fade-leave-active {
    width: calc(100% - 30px); /* Adjust for single column */
  }
}
</style>
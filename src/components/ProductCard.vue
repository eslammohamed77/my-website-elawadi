<template>
  <div class="product-card" @click="goToDetails">
    <div class="image-container">
      <img :src="product.image_path" :alt="product.name" class="product-image" />
      <div v-if="product.discount_price" class="discount-badge">
        -{{ discountPercent }}%
      </div>

      <div class="actions-overlay">
        <button class="action-btn" @click.stop="toggleWishlist">
          <svg
            :class="{ liked: isLiked }"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            ></path>
          </svg>
        </button>
        <button class="action-btn" @click.stop>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="8 21 3 21 3 16"></polyline><line x1="15" y1="4" x2="3" y2="16"></line></svg>
        </button>
      </div>

      <div class="add-to-cart-container">
        <button class="add-to-cart-btn" @click.stop="addToCart">
          Add to Cart
        </button>
      </div>
    </div>

    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-desc">{{ product.description }}</p>
      <p class="price">
        Rp {{ formattedPrice(product.price) }}
        </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"], 
  data() {
    return {
      isLiked: false,
    };
  },
  computed: {
    discountPercent() {
      if (this.product.discount_price && this.product.price) {
        return (
          100 -
          Math.round((this.product.discount_price / this.product.price) * 100)
        );
      }
      return 0;
    },
  },
  methods: {
    formattedPrice(price) {
      return price ? price.toLocaleString("id-ID") : "0";
    },
    addToCart() {
      this.$emit("product-added", this.product);
    },
    toggleWishlist() {
      this.isLiked = !this.isLiked;
      this.$emit("add-to-wishlist", this.product);

      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (this.isLiked) {
        if (!wishlist.some((item) => item.sku === this.product.sku)) { // استخدم product.sku
          wishlist.push(this.product);
        }
      } else {
        wishlist = wishlist.filter(item => item.sku !== this.product.sku); // استخدم product.sku
      }
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    },
    goToDetails() {
      this.$router.push({
        name: "ProductDetails",
        params: { id: this.product.sku }, 
      });
    },
    checkIfLiked() {
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (wishlist.some(item => item.sku === this.product.sku)) { 
        this.isLiked = true;
      }
    }
  },
  created() {
    this.checkIfLiked();
  }
};
</script>

<style scoped>
/* التنسيقات (CSS) لم تتغير */
.product-card {
  width: 100%;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.image-container {
  position: relative;
  aspect-ratio: 1 / 1.1;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.discount-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #e74c3c;
  color: white;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 20px;
  z-index: 2;
}

.actions-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 3;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s ease-in-out;
}

.product-card:hover .actions-overlay {
  opacity: 1;
  transform: translateX(0);
}

.action-btn {
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #eee;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.action-btn:hover {
  background-color: white;
  transform: scale(1.1);
}
.action-btn svg {
  color: #333;
}
.action-btn svg.liked {
  fill: #e74c3c;
  stroke: #e74c3c;
}

.add-to-cart-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    transform: translateY(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 3;
}
.product-card:hover .add-to-cart-container {
    transform: translateY(0);
}

.add-to-cart-btn {
  width: 100%;
  background: #3498db;
  color: white;
  border: none;
  padding: 12px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #2980b9;
}


.product-info {
  padding: 16px;
  text-align: left;
  background-color: #fff;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #2c3e50;
}

.product-desc {
  font-size: 14px;
  color: #7f8c8d;
  margin: 0 0 12px 0;
  flex-grow: 1;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #3498db;
  margin: 0;
  display: flex;
  align-items: center;
}

.old-price {
  text-decoration: line-through;
  color: #95a5a6;
  margin-left: 8px;
  font-size: 14px;
  font-weight: normal;
}
</style>
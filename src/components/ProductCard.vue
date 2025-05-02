<template>
  <div class="product-card">
    <div class="image-container">
      <img :src="product.image_path" :alt="product.name" />
      <div v-if="product.discount_price" class="discount-badge">
        -{{ discountPercent }}%
      </div>
      <div class="hover-overlay">
        <button class="add-to-cart" @click="addToCart">Add to cart</button>
        <div class="actions">
          <span>💬 Share</span>
          <span>🔁 Compare</span>
          <span @click="addToWishlist" class="like-button">🤍 Like</span>
        </div>
      </div>
    </div>
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p class="desc">{{ product.description }}</p>
      <p class="price">
        Rp {{ formattedPrice(product.discount_price || product.price) }}
        <span v-if="product.discount_price" class="old-price">
          Rp {{ formattedPrice(product.price) }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    discountPercent() {
      if (this.product.discount_price) {
        return (
          100 - Math.round((this.product.discount_price / this.product.price) * 100)
        );
      }
      return 0;
    },
  },
  methods: {
    formattedPrice(price) {
      if (price) {
        return price.toLocaleString("id-ID");
      }
      return "0";
    },
    addToCart() {
      this.$emit("product-added", this.product); // إبلاغ المكون الأب
    },
    addToWishlist() {
      this.$emit("add-to-wishlist", this.product);
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (!wishlist.some(item => item.id === this.product.id)) {
        wishlist.push(this.product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      }
    },
  },
};
</script>

<style scoped>
.product-card {
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  background: #fff;
  overflow: hidden;
  transition: 0.3s;
  position: relative;
}

.image-container {
  position: relative;
  height: 500px; /* ارتفاع ثابت للصور */
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* يجعل الصور تغطي المساحة دون تشويه */
  /* display: block; */
}

.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4d4f;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 3px;
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.product-card:hover .hover-overlay {
  opacity: 1;
}

.add-to-cart {
  background: white;
  border: none;
  padding: 8px 16px;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
}

.actions span {
  color: white;
  margin: 0 5px;
  font-size: 14px;
}

.product-info {
  padding: 15px;
  text-align: left;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.like-button {
  cursor: pointer;
}

.product-info h3 {
  font-size: 16px;
  font-weight: 600;
}

.desc {
  font-size: 13px;
  color: gray;
  margin: 5px 0;
  overflow: hidden;
}

.price {
  font-weight: bold;
  margin-top: 10px;
}

.old-price {
  text-decoration: line-through;
  color: gray;
  margin-left: 8px;
  font-weight: normal;
}
</style>

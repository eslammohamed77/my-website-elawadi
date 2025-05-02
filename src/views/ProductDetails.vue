<template>
    <div v-if="product" class="product-details">
      <div class="container">
        <img :src="product.image_path" alt="Product Image" class="product-image" />
        <div class="info">
          <h1>{{ product.name }}</h1>
          <p class="desc">{{ product.description }}</p>
          <p class="price">
            Rp {{ formattedPrice(product.discount_price || product.price) }}
            <span v-if="product.discount_price" class="old-price">
              Rp {{ formattedPrice(product.price) }}
            </span>
          </p>
          <!-- Add to cart, color, size, etc. -->
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "ProductDetails",
    data() {
      return {
        product: null,
      };
    },
    async created() {
      const id = this.$route.params.id;
      const response = await axios.get(`https://furniture-api.fly.dev/api/products/${id}`);
      this.product = response.data.data;
    },
    methods: {
      formattedPrice(price) {
        return price ? price.toLocaleString("id-ID") : "0";
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    gap: 40px;
    padding: 40px;
  }
  
  .product-image {
    width: 400px;
    height: auto;
    object-fit: contain;
  }
  
  .info {
    flex: 1;
  }
  
  .price {
    font-weight: bold;
    font-size: 20px;
    margin-top: 10px;
  }
  
  .old-price {
    text-decoration: line-through;
    color: gray;
    margin-left: 10px;
    font-weight: normal;
  }
  </style>
  
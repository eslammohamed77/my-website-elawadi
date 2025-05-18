<template>
  <div v-if="product">
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <img :src="product.image_path" alt="Product Image" />
    <p>Price: Rp {{ formattedPrice(product.price) }}</p>
    <p v-if="product.discount_price">
      Discounted Price: Rp {{ formattedPrice(product.discount_price) }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      product: null,
    };
  },
  async created() {
    await this.fetchProductDetails();
  },
  methods: {
    async fetchProductDetails() {
      try {
        const response = await fetch(`https://furniture-api.fly.dev/v1/products/${this.id}`);
        if (!response.ok) {
          throw new Error('لم يتم العثور على المنتج');
        }
        const data = await response.json();
        this.product = data.data; // البيانات الخاصة بالمنتج موجودة في data
      } catch (error) {
        console.error('خطأ في جلب بيانات المنتج:', error);
      }
    },
    formattedPrice(price) {
      return price ? price.toLocaleString('id-ID') : '0';
    },
  },
};
</script>



<style scoped>
.product-details {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background: #fff;
  border: 1px solid #ddd;
}

.product-details img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 20px;
}

.old-price {
  text-decoration: line-through;
  color: gray;
  margin-left: 10px;
}

.loading {
  text-align: center;
  padding: 50px;
  font-size: 18px;
}
</style>

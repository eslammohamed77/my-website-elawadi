<template>
  <div class="wishlist-page">
    <div class="loo">
      <h2>Your Wishlist</h2>
    </div>
    <div v-if="wishlist.length === 0">
      <p>Your wishlist is empty. Start adding some items!</p>
    </div>
    <div v-else class="wishlist-items">
      <div v-for="item in wishlist" :key="item.id" class="wishlist-item">
        <img :src="item.image_path" :alt="item.name" />
        <div>
          <h4>{{ item.name }}</h4>
          <p>{{ item.description }}</p>
          <p>Rp {{ formattedPrice(item.price) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wishlist: [],
    };
  },
  mounted() {
    this.loadWishlist();
  },
  methods: {
    loadWishlist() {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      this.wishlist = storedWishlist;
    },
    formattedPrice(price) {
      return price.toLocaleString("id-ID");
    },
  },
};
</script>

<style scoped>
.wishlist-page {
  padding: 20px;
  margin-top: 10vh;
  width: 90%; /* تعديل العرض بحيث يكون مناسب */
  margin-left: 5%; /* ترك مسافة من اليسار */
  margin-right: 5%; /* ترك مسافة من اليمين */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; /* محاذاة العناصر إلى اليسار */
}

.loo h2 {
  font-size: 24px;
  margin-bottom: 20px; /* إضافة مسافة أسفل العنوان */
  text-align: left; /* محاذاة العنوان إلى اليسار */
}

.wishlist-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* توزيع العناصر بالتساوي مع المسافة */
}

.wishlist-item {
  width: 250px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wishlist-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.wishlist-item h4 {
  font-size: 16px;
  margin: 10px 0;
}

.wishlist-item p {
  font-size: 14px;
  color: gray;
}
</style>

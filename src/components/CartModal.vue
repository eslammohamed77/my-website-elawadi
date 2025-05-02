<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-content">
      <h3>✅ تمت إضافة المنتج إلى العربة</h3>
      <p>{{ product.name }}</p>
      <router-link to="/cart">
        <button class="go-to-cart">اذهب إلى العربة</button>
      </router-link>
      <button @click="close" class="close-btn">إغلاق</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.modal-content {
  background: white;
  padding: 25px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}
.go-to-cart, .close-btn {
  margin-top: 15px;
  padding: 10px 20px;
  border: none;
  background: #28a745;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
.close-btn {
  background: gray;
}
</style>
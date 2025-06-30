<template>
  <section class="contact-page-wrapper">
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Contact Us</h1>
        <p>Home > <span>Contact</span></p>
      </div>
    </div>

    <section class="text-secondary py-5 mt-2">
      <div class="container py-5">
        <div class="row">
          <div class="col-lg-8 mb-4">
            <div class="bg-light rounded p-4 position-relative" style="height: 100%;">
              <iframe
                src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                width="100%" height="100%" frameborder="0" style="filter: grayscale(1) contrast(1.2) opacity(0.4); position: absolute; top: 0; left: 0;"
                loading="lazy" referrerpolicy="no-referrer-when-downgrade">
              </iframe>
              <div class="bg-white position-relative p-4 shadow rounded">
                <div class="row">
                  <div class="col-md-6">
                    <h6 class="text-uppercase fw-bold text-muted small">Address</h6>
                    <p>Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter</p>
                  </div>
                  <div class="col-md-6 mt-4 mt-md-0">
                    <h6 class="text-uppercase fw-bold text-muted small">Email</h6>
                    <a href="#" class="text-primary d-block">example@email.com</a>
                    <h6 class="text-uppercase fw-bold text-muted small mt-3">Phone</h6>
                    <p>123-456-7890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <h4 class="text-dark mb-3">Feedback</h4>
            <p class="text-secondary mb-4">Post-ironic portland shabby chic echo park, banjo fashion axe</p>
            <form>
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" id="name" name="name" class="form-control">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" name="email" class="form-control">
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">Message</label>
                <textarea id="message" name="message" rows="4" class="form-control"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Button</button>
              <p class="text-muted mt-3 small">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
// No script changes needed for this update
export default {
  name: 'Contact',
};
</script>

<style scoped>
/* Hero Section Styling (Copied from Shop.vue) */
.hero-section {
  margin-top: 10vh;
  position: relative;
  background-image: url(../assets/images/back2.jpg); /* Make sure this path is correct */
  background-size: cover;
  background-position: center;
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 50px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 250px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.55);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  width: 100%;
  animation: fadeIn 1s ease-out forwards;
}

.hero-content h1 {
  font-size: 52px;
  margin-bottom: 15px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.hero-content p {
  font-size: 20px;
  letter-spacing: 1px;
}

.hero-content span {
  font-weight: bold;
  color: #ffc107;
}

/* Add some basic container styling to wrap the content */
.contact-page-wrapper {
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f8f8f8;
}

/* Optional: Add some basic responsiveness for the hero section */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 42px;
  }
}
</style>
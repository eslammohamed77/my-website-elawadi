<template>
<!-- Bootstrap Contact Section -->
<section class="text-secondary py-5 mt-2">
  <div class="container py-5">
    <div class="row">
      <!-- Map and Info -->
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
      <!-- Contact Form -->
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
  </template>
  
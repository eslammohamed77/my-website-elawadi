<template>
  <div class="about-page-container">
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>About Us</h1>
        <p>Home > <span>About</span></p>
      </div>
    </div>

    <section class="intro-section">
      <div class="intro-content">
        <div class="text-content">
          <h2>Creating a Home that Inspires You</h2>
          <p class="subtitle">
            At **Furniro**, we believe that a home is more than just a place to live; it's a reflection of who you are. Our mission is to provide beautiful, high-quality furniture that transforms your living spaces into havens of comfort and style.
          </p>
          <p>
            Founded on the principles of craftsmanship, sustainability, and exceptional design, we curate a collection that blends timeless elegance with modern functionality. Every piece is selected to help you create a space that feels uniquely yours.
          </p>
        </div>
        <div class="image-content">
          <!-- <img src="@/assets/images/" alt="Stylish living room" class="main-about-img" /> -->
        </div>
      </div>
    </section>
    
    <section class="story-section">
      <div class="story-content">
        <div class="story-image">
          <!-- <img src="@/assets/images/" alt="Furniture workshop" class="story-img" /> -->
        </div>
        <div class="story-text">
          <h3>Our Journey</h3>
          <p>
            **Furniro** began in 2018 with a simple idea: to make quality furniture accessible to everyone. Our founder, a passionate designer, started by crafting pieces in a small workshop. Soon, the demand for our unique designs grew, and we expanded our operations, always staying true to our core values.
          </p>
          <p>
            Today, we are proud to work with skilled artisans and sustainable suppliers from around the world. We combine traditional techniques with cutting-edge technology to bring you furniture that is not only beautiful but built to last.
          </p>
        </div>
      </div>
    </section>

    <section class="team-section">
      <h2>Meet the Team</h2>
      <div class="team-grid">
        <div class="team-member">
          <!-- <img src="@/assets/images/" alt="Team member 1" /> -->
          <h4>Alex R.</h4>
          <p>Lead Designer</p>
        </div>
        <div class="team-member">
          <!-- <img src="@/assets/images/" alt="Team member 2" /> -->
          <h4>Sarah L.</h4>
          <p>Operations Manager</p>
        </div>
        <div class="team-member">
          <!-- <img src="@/assets/images/" alt="Team member 3" /> -->
          <h4>Michael B.</h4>
          <p>Craftsmanship Lead</p>
        </div>
        <div class="team-member">
          <!-- <img src="@/assets/images/" alt="Team member 4" /> -->
          <h4>Jessica P.</h4>
          <p>Customer Experience</p>
        </div>
      </div>
    </section>
    
    <section class="values-section">
      <h2>Why Choose Furniro?</h2>
      <div class="values-grid">
        <div class="value-item">
          <i class="fas fa-hand-holding-heart"></i>
          <h4>Exceptional Craftsmanship</h4>
          <p>Every piece is crafted with attention to detail and a commitment to quality.</p>
        </div>
        <div class="value-item">
          <i class="fas fa-leaf"></i>
          <h4>Sustainable Sourcing</h4>
          <p>We use eco-friendly materials and responsible production methods.</p>
        </div>
        <div class="value-item">
          <i class="fas fa-couch"></i>
          <h4>Modern & Timeless Designs</h4>
          <p>Our furniture blends contemporary style with timeless elegance.</p>
        </div>
        <div class="value-item">
          <i class="fas fa-truck"></i>
          <h4>Fast & Reliable Delivery</h4>
          <p>We ensure your furniture arrives safely and on time, every time.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style scoped>
/* Main Container */
.about-page-container {
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f8f8f8;
  padding-bottom: 80px;
}

/* --- 1. Hero Section (Consistent Style) --- */
.hero-section {
  position: relative;
  background-image: url(../assets/images/back2.jpg); /* Make sure this path is correct */
  background-size: cover;
  background-position: center;
  width: 100%;
  padding: 100px 20px;
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

/* --- 2. Introduction Section --- */
.intro-section {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;
}

.intro-content {
  display: flex;
  align-items: center;
  gap: 60px;
}

.intro-content .text-content {
  flex: 1;
  padding: 20px;
}

.intro-content .text-content h2 {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 25px;
  color: #B88E2F;
  line-height: 1.2;
}

.intro-content .text-content .subtitle {
  font-size: 20px;
  line-height: 1.6;
  color: #555;
  font-style: italic;
  margin-bottom: 30px;
}

.intro-content .text-content p {
  font-size: 18px;
  line-height: 1.7;
  color: #666;
  margin-bottom: 20px;
}

.intro-content .image-content {
  flex: 1;
  text-align: center;
}

.main-about-img {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

/* --- 3. Our Story Section --- */
.story-section {
  background-color: #fff;
  padding: 80px 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
}

.story-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row-reverse; /* Puts image on the right */
  align-items: center;
  gap: 60px;
}

.story-image {
  flex: 1;
  text-align: center;
}

.story-img {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.story-text {
  flex: 1;
  padding: 20px;
}

.story-text h3 {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 25px;
  color: #333;
}

.story-text p {
  font-size: 18px;
  line-height: 1.7;
  color: #666;
  margin-bottom: 20px;
}

/* --- 4. Our Team Section --- */
.team-section {
  text-align: center;
  max-width: 1200px;
  margin: 100px auto 50px;
  padding: 0 20px;
}

.team-section h2, .values-section h2 {
  font-size: 44px;
  font-weight: 800;
  margin-bottom: 60px;
  color: #333;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.team-member {
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.team-member img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 4px solid #f0f0f0;
}

.team-member h4 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 5px;
  color: #333;
}

.team-member p {
  font-size: 16px;
  color: #B88E2F;
  font-weight: 600;
}

/* --- 5. Our Values Section --- */
.values-section {
  text-align: center;
  max-width: 1200px;
  margin: 100px auto;
  padding: 0 20px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.value-item {
  background-color: #fff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.value-item i {
  font-size: 60px;
  color: #B88E2F;
  margin-bottom: 25px;
}

.value-item h4 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333;
}

.value-item p {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

/* --- Responsive Adjustments --- */
@media (max-width: 992px) {
  .intro-content, .story-content {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
  .intro-content .text-content, .story-text {
    padding: 0;
  }
  .intro-content .text-content h2, .story-text h3 {
    font-size: 40px;
  }
  .story-content {
    flex-direction: column-reverse; /* Restore original order on mobile */
  }
}

@media (max-width: 768px) {
  .intro-content .text-content h2, .story-text h3 {
    font-size: 36px;
  }
  .team-section h2, .values-section h2 {
    font-size: 38px;
    margin-bottom: 40px;
  }
}

@media (max-width: 576px) {
  .hero-content h1 {
    font-size: 42px;
  }
  .intro-content .text-content h2, .story-text h3 {
    font-size: 30px;
  }
  .team-grid, .values-grid {
    gap: 30px;
  }
  .team-member, .value-item {
    padding: 25px;
  }
}

/* Fade In Animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
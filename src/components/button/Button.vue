<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="footer-logo">
            <img src="../../assets/img/logo.png" height="200" alt="Matjo Restaurant Logo">
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget lacus eget nunc tincidunt laoreet.
          </p>
        </div>
        <div class="col-md-4">
          <div class="footer-links">
            <h4>Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Menu</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-4">
          <div class="footer-contact">
            <h4>Contact</h4>
            <p>
              123 Main Street<br>
              Anytown, CA 12345<br>
              (123) 456-7890
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
.footer {
  background-color: #f5f5f5;
  padding: 30px 0;
}

.footer-logo {
  margin-bottom: 20px;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #333;
}

.footer-contact {
  margin-bottom: 20px;
}

.footer-contact p {
  margin-bottom: 0;
}
</style>

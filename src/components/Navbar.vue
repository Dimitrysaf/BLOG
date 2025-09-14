<template>
  <nav class="navbar">
    <Container>
      <div class="navbar-content">
        <a href="/" class="logo">To Ιστολόγιο<br /><span class="sublogo">του Δημήτρη</span></a>
        <div class="navbar-actions">
          <Search />
          <AccountMenu />
        </div>
      </div>
    </Container>
  </nav>
</template>

<script setup>
import Container from './Container.vue';
import AccountMenu from './AccountMenu.vue';
import Search from './Search.vue';
</script>

<style scoped>
.navbar {
  height: 60px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #e7e7e7;
  width: 100%;
  border-bottom: solid 2px #c8ccd1;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 63px;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  color: #333;
  display: inline-block;
  line-height: 0.6;
}

.sublogo {
  font-family: 'Times New Roman', Times, serif;
  font-size: 1.0rem;
  font-weight: lighter;
  font-style: italic;
  text-decoration: none;
  color: #333;
}

.navbar-logo {
  height: 30px;
  width: auto;
}

.logo .blue {
  color: #3366cc;
  font-weight: normal;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem; 
}
</style>

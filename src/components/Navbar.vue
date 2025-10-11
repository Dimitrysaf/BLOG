<template>
  <nav class="navbar">
    <Container>
      <div class="navbar-content">
        <router-link to="/" class="logo">To Ιστολόγιο<br /><span class="sublogo">του Δημήτρη</span></router-link>
        <div class="navbar-actions">
          <Search />
          </div>
      </div>
    </Container>
    <transition name="fade">
      <cdx-progress-bar v-if="loadingState.isVisible" class="navbar-progress-bar" inline aria-label="Loading..."></cdx-progress-bar>
    </transition>
  </nav>
</template>

<script setup>
import Container from './Container.vue';
// AccountMenu import αφαιρέθηκε
import Search from './Search.vue';
import { CdxProgressBar } from '@wikimedia/codex';
import loadingService from '../loading';

const loadingState = loadingService.state;
</script>

<style scoped>
/* Τα styles παραμένουν ίδια */
.navbar {
  height: 60px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #e7e7e7;
  width: 100%;
  border-bottom: solid 2px #c8ccd1;
  position: relative; /* Needed for positioning the progress bar */
}

.navbar-progress-bar {
  position: absolute;
  bottom: -2px; /* Position it on top of the bottom border */
  left: 0;
  width: 100%;
  height: 2px; /* Match the border thickness */
}

/* Vue transition classes for the fade effect */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
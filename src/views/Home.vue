<template>
  <main>
    <Container>
      <div class="main-content">
        <h1>Καλώς ήρθατε στην ομοσπονδιακή πλατφόρμα</h1>
        <p>Επιλέξτε ένα υπουργείο για να συνεχίσετε.</p>
        <div class="card-group">
          <Card
            v-for="card in cards"
            :key="card.id"
            :thumbnail="card.thumbnail"
            url="#"
          >
            <template #title>{{ card.title }}</template>
            <template #description>{{ card.description }}</template>
            <template #supporting-text>{{ card.supportingText }}</template>
          </Card>
        </div>
      </div>
    </Container>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import Container from '../components/Container.vue';
import Card from '../components/Card.vue';

const cards = ref([
  {
    id: 1,
    title: 'ΟΤΕΥ',
    description: 'Ομοσπονδιακό Τμήμα Εσωτερικών Υποθέσεων',
    supportingText: '',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Vector_search_icon.svg/240px-Vector_search_icon.svg.png',
  },
  {
    id: 2,
    title: 'ΟΤΑΠΠΑ',
    description: 'Ομοσπονδιακό Τμήμα Άμυνας, Πολιτικής Προστασίας & Αθλητισμού',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Star_empty.svg/240px-Star_empty.svg.png',
  },
  {
    id: 3,
    title: 'ΟΤΔΙΑ',
    description: 'Ομοσπονδιακό Τμήμα Αστυνομίας & Δικαιοσύνης',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Bookmark_icon.svg/240px-Bookmark_icon.svg.png',
  },
  {
    id: 4,
    title: 'ΟΤΟΙΚ',
    description: 'Ομοσπονδιακό Τμήμα Οικονομικών',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/History-icon.svg/240px-History-icon.svg.png',
  },
  {
    id: 5,
    title: 'ΟΤΟΕΑ',
    description: 'Ομοσπονδιακό Τμήμα Οικονομικών Υποθέσεων, Εκπαίδευσης & Έρευνας',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/240px-User_font_awesome.svg.png',
  },
  {
    id: 6,
    title: 'ΟΤΕΞ',
    description: 'Ομοσπονδιακό Τμήμα Εξωτερικών Υποθέσεων',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Windows_Settings_app_icon.png/240px-Windows_Settings_app_icon.png',
  },
  {
    id: 7,
    title: 'ΟΤΜΠΥ',
    description: 'Ομοσπονδιακό Τμήμα Περιβάλλοντος, Μεταφορών, Ενέργειας & Επικοινωνιών',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/240px-Infobox_info_icon.svg.png',
  },
  {
    id: 8,
    title: 'ΟΜΚΥ',
    description: 'Ομοσπονδιακή Κυβέρνηση',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Question_mark_alternate.svg/240px-Question_mark_alternate.svg.png',
  },
]);
</script>

<style scoped>
.main-content {
  padding: 20px;
  text-align: center;
}

.card-group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem 0;
  text-align: left;
}
</style>

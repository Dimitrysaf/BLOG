<template>
  <div class="comment-section">
    <div class="login-prompt">
       <CdxMessage type="warning">
        Συνδεθείτε για να σχολιάσετε.
      </CdxMessage>
    </div>
  </div>
</template>

<script setup>
import { CdxMessage } from '@wikimedia/codex';
// Η παλιά λογική και το import του auth έχουν αφαιρεθεί.
</script>

<style scoped>
.comment-section {
  margin-top: 40px;
}
.login-prompt {
  text-align: center;
  padding: 40px 0;
}
</style>
<template>
  <div v-if="error"></div>
  <div v-if="post">
    <div class="blue-banner">
      <Container>
        <div class="post-details">
          <h1>{{ post.title }}</h1>
        </div>
      </Container>
      <div class="post-meta">
        <span class="meta-item">
          <cdx-icon :icon="cdxIconUserAvatarOutline" />
          <span>By {{ post.author.username }}</span>
        </span>
        <span class="meta-item">
          <cdx-icon :icon="cdxIconCalendar" />
          <span>{{ formatDate(post.created_at) }}</span>
        </span>
      </div>
    </div>

    <Container class="post-body-container">
      <p class="post-body">{{ post.content }}</p>
    </Container>

    <Container>
      <DoComment :post-slug="route.params.slug" @comment-posted="handleCommentPosted" />
      <CommentsList :post-slug="route.params.slug" ref="commentsList" />
    </Container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '../supabase';
import Container from '../components/Container.vue';
import CommentsList from '../components/CommentsList.vue';
import DoComment from '../components/DoComment.vue';
import { CdxIcon } from '@wikimedia/codex';
import {
  cdxIconUserAvatarOutline,
  cdxIconCalendar
} from '@wikimedia/codex-icons';
import loadingService from '../loading.js';

const route = useRoute();
const post = ref(null);
const error = ref(null);
const commentsList = ref(null);

const fetchPost = async () => {
  loadingService.show();
  try {
    const { data, error: fetchError } = await supabase
      .from('posts')
      .select('*, author:profiles(username)')
      .eq('slug', route.params.slug)
      .single();

    if (fetchError) {
      throw fetchError;
    }
    
    post.value = data;

  } catch (e) {
    error.value = e.message;
  } finally {
    loadingService.hide();
  }
};

onMounted(fetchPost);

function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('el-GR', options);
}

function handleCommentPosted() {
  if (commentsList.value) {
    commentsList.value.refresh();
  }
}
</script>

<style scoped>
.blue-banner {
  background-color: #36c;
  border-bottom: 4px solid rgba(0, 0, 0, 0.096);
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  margin-bottom: 24px;
}

.post-details h1 {
  font-size: xxx-large;
  font-weight: normal;
  line-height: xxx-large;
  margin-bottom: 20px;
  font-family: 'Times New Roman', Times, serif;
  background-color: white;
  color: #36c;
  font-style: italic;
  text-decoration: underline;
  padding: 0 8px;
  word-break: break-word;
}

.post-meta {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 24px;
  color: white;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
}

.meta-item .cdx-icon {
  color: white;
}

.post-body-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 16px;
}

.post-body {
  white-space: pre-wrap;
  font-size: 1.1em;
  line-height: 1.6;
  text-align: left;
}
</style>

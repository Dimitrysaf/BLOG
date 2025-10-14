
<template>
  <!-- Error State -->
  <div v-if="error" class="error-container">
     <CdxMessage type="error">
        Η φόρτωση της ανάρτησης απέτυχε: {{ error }}
      </CdxMessage>
  </div>

  <!-- Content -->
  <div v-else-if="post">
    <div class="blue-banner">
      <Container>
        <div class="post-details">
          <h1>{{ post.title }}</h1>
        </div>
      </Container>
      <div class="post-meta">
        <span v-if="post.author" class="meta-item">
          <CdxIcon :icon="cdxIconUserAvatarOutline" />
          <span>{{ post.author.full_name }}</span>
        </span>
        <span class="meta-item">
          <CdxIcon :icon="cdxIconCalendar" />
          <span>{{ formatDate(post.created_at) }}</span>
        </span>
      </div>
    </div>

    <Container class="post-body-container">
      <div ref="postBody" class="post-body" v-html="post.content"></div>
    </Container>

  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../supabase';
import loadingService from '../loading.js';
import Container from '../components/Container.vue';
import { CdxIcon, CdxMessage } from '@wikimedia/codex';
import {
  cdxIconUserAvatarOutline,
  cdxIconCalendar
} from '@wikimedia/codex-icons';

import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import powershell from 'highlight.js/lib/languages/powershell';

hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', js);
hljs.registerLanguage('typescript', ts);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('powershell', powershell);

const route = useRoute();
const router = useRouter();
const post = ref(null);
const error = ref(null);
const postBody = ref(null);

const fetchPost = async () => {
  loadingService.show();
  try {
    const { data, error: fetchError } = await supabase
      .from('posts')
      .select('*, author:profiles(full_name)')
      .eq('slug', route.params.slug)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        router.push({ name: 'NotFound' });
        return;
      } else {
        throw fetchError;
      }
    }
    post.value = data;
  } catch (e) {
    error.value = e.message;
  } finally {
    loadingService.hide();
  }
};

const highlightCode = async () => {
    await nextTick();
    if (postBody.value) {
        const blocks = postBody.value.querySelectorAll('pre code');
        blocks.forEach((block) => {
            hljs.highlightElement(block);
        });
    }
}

watch(post, () => {
    if (post.value) {
        highlightCode();
    }
});

onMounted(fetchPost);

function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('el-GR', options);
}
</script>

<style>
@import 'highlight.js/styles/atom-one-dark.css';

.post-body p { margin-block: 0 1em; }
.post-body h1,
.post-body h2,
.post-body h3 { margin-block: 1.5em 0.5em; line-height: 1.2; }
.post-body [data-text-align="center"] { text-align: center; }
.post-body [data-text-align="right"] { text-align: right; }
.post-body [data-text-align="left"] { text-align: left; }
.post-body ul,
.post-body ol { padding-inline-start: 1.5rem; }
.post-body blockquote {
    position: relative; 
    padding: 1.5em 2em; 
    background-color: #f7f7f7; 
    border-radius: 1px;
    border-left: 5px solid #3366cc; 
    margin: 2em 0;
    font-style: italic;
    color: #555;
}

.post-body blockquote::before {
    content: '“';
    position: absolute;
    top: 0.1em;
    left: 0.1em;
    font-size: 5em; 
    font-weight: bold;
    font-family: 'Times New Roman', Times, serif;
    color: rgba(51, 102, 204, 0.15);
    line-height: 1; 
}

.post-body blockquote::after {
    content: '”';
    position: absolute;
    bottom: -0.2em;
    right: 0.1em;
    font-size: 5em;
    font-weight: bold;
    font-family: 'Times New Roman', Times, serif;
    color: rgba(51, 102, 204, 0.15);
    line-height: 1;
}

.post-body blockquote p {
    font-family: 'Times New Roman', Times, serif;
    position: relative;
    z-index: 1;
    margin: 0;
}
.post-body hr { border: none; border-top: 1px solid #c8ccd1; margin-block: 2rem; }
.post-body table { border-collapse: collapse; width: 100%; margin: 1rem 0; overflow: hidden; table-layout: fixed; }
.post-body td, .post-body th { border: 1px solid #c8ccd1; padding: 0.5rem; min-width: 1em; vertical-align: top; box-sizing: border-box; position: relative; word-wrap: break-word; }
.post-body th { font-weight: bold; text-align: left; background-color: #f8f9fa; }
.post-body img { max-width: 100%; height: auto; display: block; cursor: pointer; }
.post-body .resize-cursor { cursor: col-resize; }
.post-body pre {
    background: #000;
    color: white;
    font-family: 'JetBrainsMono', monospace;
    padding: 1.5em 2em;
    border-radius: 0;
    position: relative;
    overflow: hidden;
    border-left: 5px solid #39FF14;
    margin: 2em 0;
}
.post-body pre::before {
    content: '{ }';
    position: absolute;
    top: 0.2em;
    left: 0.2em;
    font-size: 3em;
    font-weight: bold;
    font-family: 'Times New Roman', Times, serif;
    color: rgba(255, 255, 255, 0.08);
    line-height: 1;
}
.post-body pre code {
    color: inherit;
    padding: 0;
    background: none;
    font-size: 0.8rem;
    position: relative;
    z-index: 1;
}
</style>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 40px;
}

.blue-banner {
  background-color: #36c;
  border-bottom: 4px solid rgba(0, 0, 0, 0.096);
  height: 500px;
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
  font-size: 1.1em;
  line-height: 1.6;
  text-align: left;
}
</style>

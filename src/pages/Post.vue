<template>
  <!-- Error State -->
  <div v-if="error" class="error-container">
     <CdxMessage type="error">
        Η φόρτωση της ανάρτησης απέτυχε: {{ error }}
      </CdxMessage>
  </div>

  <!-- Content -->
  <div v-else-if="post" class="post-page-wrapper">
    <div class="blue-banner" :style="bannerStyle">
      <div class="banner-content">
        <div class="post-details">
          <h1>{{ post.title }}</h1>
        </div>

        <!-- Wrapper for all metadata with a white background -->
        <div class="meta-wrapper">
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

          <div v-if="tags.length" class="tags-container">
            <CdxIcon :icon="cdxIconTag" />
            <div class="tags-list">
              <span 
                v-for="tag in tags" 
                :key="tag.id" 
                class="tag-item"
                v-tooltip="tag.description"
              >
                {{ tag.name }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="main-content-area" :aria-label="'Main content of the article: ' + post.title">
        <Container class="content-container">
            <div ref="postBody" class="post-body" v-html="post.content"></div>
            <!-- Comment Section -->
            <div class="comment-section">
                <DoComment :post-id="post.id" @comment-added="handleCommentAdded" />
                <CommentList :post-id="post.id" ref="commentListRef" />
            </div>
        </Container>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue';
import SEOMeta from '../components/SEOMeta.vue'
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../supabase';
import loadingService from '../loading.js';
import Container from '../components/Container.vue';
import DoComment from '../components/DoComment.vue';
import CommentList from '../components/CommentList.vue';
import { CdxIcon, CdxMessage, CdxTooltip } from '@wikimedia/codex';
import {
  cdxIconUserAvatarOutline,
  cdxIconCalendar,
  cdxIconTag
} from '@wikimedia/codex-icons';

import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import powershell from 'highlight.js/lib/languages/powershell';

// Register the CdxTooltip directive
const vTooltip = CdxTooltip;

hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', js);
hljs.registerLanguage('typescript', ts);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('powershell', powershell);

const route = useRoute();
const router = useRouter();
const post = ref(null);
const tags = ref([]);
const error = ref(null);
const postBody = ref(null);
const commentListRef = ref(null);

const bannerStyle = computed(() => {
  if (post.value?.image_url) {
    return {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${post.value.image_url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
  }
  return {};
});

const handleCommentAdded = () => {
  if (commentListRef.value) {
    commentListRef.value.fetchComments();
  }
};

const fetchPostAndTags = async () => {
  loadingService.show();
  try {
    // Fetch Post
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

    // Fetch Tags with descriptions
    if (post.value) {
      const { data: tagsData, error: tagsError } = await supabase
        .from('post_tags')
        .select('tags(id, name, description)') // Include description
        .eq('post_id', post.value.id);

      if (tagsError) throw tagsError;
      
      tags.value = tagsData.map(t => t.tags).filter(Boolean);
    }

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

onMounted(fetchPostAndTags);

function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('el-GR', options);
}
</script>

<style>
@import 'highlight.js/styles/atom-one-dark.css';

.post-body p { margin-block: 0 1em; }

.post-body > p:first-of-type::first-letter {
  font-size: 3em;
  line-height: 1;
  float: left;
  padding-right: 8px;
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  color: #36c;
}

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

.post-body a {
  color: #36c;
  text-decoration: none;
  font-family: sans-serif;
}

.post-body a:hover {
  text-decoration: underline;
}
</style>

<style scoped>
.post-page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.content-container {
  background-color: white;
  flex-grow: 1;
  padding: 24px;
  border: 1.714px solid #c8ccd1;
  border-top: none;
}

.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 40px;
}

.blue-banner {
  background-color: #36c;
  border-bottom: 4px solid rgba(0, 0, 0, 0.096);
  width: 100%;
}

.banner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 60px 16px 40px;
  gap: 24px;
}

.post-details h1 {
  font-size: xxx-large;
  font-weight: normal;
  line-height: 1.2;
  margin: 0;
  font-family: 'Times New Roman', Times, serif;
  background-color: white;
  color: #36c;
  font-style: italic;
  text-decoration: underline;
  padding: 0 8px;
  word-break: break-word;
  background-color: white;
  border: 1.714px solid #c8ccd1;
}

.meta-wrapper {
  background-color: white;
  color: black;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border: 1.714px solid #c8ccd1;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px 24px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
}

.tags-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.tag-item {
  background-color: #f8f9fa; /* Light gray background */
  color: black; /* Black text for contrast */
  padding: 4px 8px;
  font-size: 0.9rem;
  border: 1px solid #c8ccd1;
  border-radius: 0;
}

.post-body {
  font-size: 1.1em;
  line-height: 1.6;
  text-align: left;
}

.comment-section {
  margin-top: 3rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-top: 1px solid #c8ccd1;
}

@media (max-width: 1254px) {
  .content-container {
    border-left: none;
    border-right: none;
  }
}

@media (max-width: 768px) {
  .banner-content {
    padding: 24px 16px;
  }

  .post-meta {
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
}
</style>

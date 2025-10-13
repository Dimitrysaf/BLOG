<template>
  <div class="post-editor-page">
    <div v-if="isLoading" class="loading-indicator">
      <cdx-progress-bar inline aria-label="Φόρτωση επεξεργαστή..." />
    </div>

    <template v-if="post">
      <div class="editor-header">
        <h1 class="editor-title">Επεξεργασία: {{ post.title }}</h1>
        <div class="editor-actions">
          <cdx-button
            weight="primary"
            action="progressive"
            @click="saveContent"
            :disabled="isSaving"
          >
            Αποθήκευση
          </cdx-button>
          <cdx-button
            :icon="cdxIconArrowPrevious"
            aria-label="Πίσω στη λίστα"
            @click="goBack"
            weight="quiet"
          ></cdx-button>
        </div>
      </div>
      
      <div v-if="editor" class="editor-toolbar">
        <cdx-button-group>
          <cdx-button
            @click="editor.chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }"
            aria-label="Bold"
            :icon="cdxIconBold"
            weight="quiet"
          ></cdx-button>
          <cdx-button
            @click="editor.chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }"
            aria-label="Italic"
            :icon="cdxIconItalic"
            weight="quiet"
          ></cdx-button>
          <cdx-button
            @click="editor.chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }"
            aria-label="Strikethrough"
            :icon="cdxIconStrikethrough"
            weight="quiet"
          ></cdx-button>
        </cdx-button-group>

        <cdx-button-group>
          <cdx-button
            @click="editor.chain().focus().setParagraph().run()"
            :class="{ 'is-active': editor.isActive('paragraph') }"
            aria-label="Paragraph"
            :icon="cdxIconTextStyle"
            weight="quiet"
          ></cdx-button>
          <cdx-button
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            aria-label="Heading 1"
            weight="quiet"
          >H1</cdx-button>
          <cdx-button
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            aria-label="Heading 2"
            weight="quiet"
          >H2</cdx-button>
          <cdx-button
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            aria-label="Heading 3"
            weight="quiet"
          >H3</cdx-button>
        </cdx-button-group>

        <cdx-button-group>
          <cdx-button
            @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }"
            aria-label="Bullet List"
            :icon="cdxIconListBullet"
            weight="quiet"
          ></cdx-button>
          <cdx-button
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }"
            aria-label="Ordered List"
            :icon="cdxIconListNumbered"
            weight="quiet"
          ></cdx-button>
        </cdx-button-group>
      </div>

      <div class="editor-content-wrapper">
        <editor-content :editor="editor" />
      </div>
      <cdx-progress-bar v-if="isSaving" inline aria-label="Αποθήκευση..." />
    </template>

    <div v-if="errorLoading" class="error-indicator">
       <p>Αποτυχία φόρτωσης του άρθρου. <a href="/admin">Επιστροφή στη λίστα</a>.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import {
  CdxButton,
  CdxButtonGroup,
  CdxProgressBar
} from '@wikimedia/codex';
import {
  cdxIconArrowPrevious, 
  cdxIconBold, 
  cdxIconItalic, 
  cdxIconStrikethrough,
  cdxIconTextStyle,
  cdxIconListBullet,
  cdxIconListNumbered
} from '@wikimedia/codex-icons';
import { supabase } from '../../supabase';
import notificationService from '../../notification';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const post = ref(null);
const isLoading = ref(true);
const isSaving = ref(false);
const errorLoading = ref(false);

const editor = useEditor({
  content: '',
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
    }),
  ],
  editorProps: {
    attributes: {
      class: 'ProseMirror',
    },
  },
});

async function fetchPost() {
  isLoading.value = true;
  errorLoading.value = false;
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, content')
      .eq('id', props.id)
      .single();

    if (error) throw error;
    post.value = data;
  } catch (err) {
    console.error('Error fetching post:', err);
    notificationService.push('Αποτυχία φόρτωσης άρθρου.', 'error');
    errorLoading.value = true;
  } finally {
    isLoading.value = false;
  }
}

async function saveContent() {
  if (!editor.value || !post.value) return;
  isSaving.value = true;
  
  const newContent = editor.value.getHTML();

  try {
    const { error } = await supabase
      .from('posts')
      .update({ content: newContent })
      .eq('id', post.value.id);

    if (error) throw error;
    
    notificationService.push('Το περιεχόμενο αποθηκεύτηκε με επιτυχία.');
    router.push({ name: 'AdminDashboard' });

  } catch (err) {
    notificationService.push('Η αποθήκευση απέτυχε. Παρακαλώ δοκιμάστε ξανά.', 'error');
    console.error('Error saving post content:', err);
  } finally {
    isSaving.value = false;
  }
}

function goBack() {
  router.push({ name: 'AdminDashboard' });
}

watch(post, (newPost) => {
  if (editor.value && newPost) {
    editor.value.commands.setContent(newPost.content || '');
    editor.value.commands.focus();
  }
});

onMounted(() => {
  fetchPost();
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<style>
.post-editor-page {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px); /* Adjust based on header height */
}

.loading-indicator, .error-indicator {
  margin: auto;
  text-align: center;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color-base);
  flex-shrink: 0;
}

.editor-title {
  font-size: var(--font-size-x-large);
  margin: 0;
}

.editor-actions {
  display: flex;
  gap: 0.5rem;
}

.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-color-base);
  background-color: var(--background-color-interactive-subtle);
  flex-shrink: 0;
  margin: 0 -1rem; /* Extend to page edges */
  padding: 0.5rem 1rem;
}

.editor-toolbar .cdx-button.is-active {
  background-color: var(--background-color-interactive-default);
  color: var(--color-interactive);
}

.editor-content-wrapper {
  flex-grow: 1;
  overflow-y: auto;
  padding-top: 1rem;
}

.ProseMirror {
  outline: none;
  color: var(--color-base);
  line-height: 1.6;
  height: 100%;
}

.ProseMirror p {
  margin-block-start: 0;
  margin-block-end: var(--spacing-400);
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3 {
  margin-block-start: var(--spacing-600);
  margin-block-end: var(--spacing-200);
  line-height: 1.2;
  font-weight: bold;
  border-bottom: none;
}

.ProseMirror h1 {
  font-size: var(--font-size-xx-large);
}

.ProseMirror h2 {
  font-size: var(--font-size-x-large);
}

.ProseMirror h3 {
  font-size: var(--font-size-large);
}

.ProseMirror ul,
.ProseMirror ol {
  padding-inline-start: 1.5rem;
  margin-block-end: var(--spacing-400);
}

.ProseMirror blockquote {
  border-inline-start: 3px solid var(--border-color-base);
  padding-inline-start: 1rem;
  margin-inline-start: 0;
  font-style: italic;
  color: var(--color-subtle);
}

.ProseMirror hr {
  border: none;
  border-top: 1px solid var(--border-color-base);
  margin-block: 2rem;
}

.ProseMirror:focus-visible {
  outline: none;
}

</style>
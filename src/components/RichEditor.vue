<template>
  <div class="rich-editor-container">
    <bubble-menu
      v-if="editor"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
      :should-show="({ editor: currentEditor }) => currentEditor.isActive('table')"
      class="bubble-menu"
    >
      <div class="editor-button-group">
        <cdx-button @click="editor.chain().focus().addColumnBefore().run()" weight="quiet" aria-label="Add Column Before">
          <cdx-icon :icon="cdxIconTableAddColumnBefore" />
        </cdx-button>
        <cdx-button @click="editor.chain().focus().addColumnAfter().run()" weight="quiet" aria-label="Add Column After">
          <cdx-icon :icon="cdxIconTableAddColumnAfter" />
        </cdx-button>
        <cdx-button @click="editor.chain().focus().deleteColumn().run()" weight="quiet" aria-label="Delete Column">
          <cdx-icon :icon="cdxIconSubtract" />
        </cdx-button>
        <cdx-button @click="editor.chain().focus().addRowBefore().run()" weight="quiet" aria-label="Add Row Before">
          <cdx-icon :icon="cdxIconTableAddRowBefore" />
        </cdx-button>
        <cdx-button @click="editor.chain().focus().addRowAfter().run()" weight="quiet" aria-label="Add Row After">
          <cdx-icon :icon="cdxIconTableAddRowAfter" />
        </cdx-button>
        <cdx-button @click="editor.chain().focus().deleteRow().run()" weight="quiet" aria-label="Delete Row">
          <cdx-icon :icon="cdxIconSubtract" />
        </cdx-button>
        <cdx-button @click="editor.chain().focus().deleteTable().run()" weight="quiet" aria-label="Delete Table" action="destructive">
          <cdx-icon :icon="cdxIconTrash" />
        </cdx-button>
      </div>
    </bubble-menu>

    <bubble-menu
      v-if="editor"
      :editor="editor"
      :tippy-options="{ duration: 100, placement: 'bottom' }"
      :should-show="({ editor: currentEditor }) => currentEditor.isActive('image')"
      class="bubble-menu"
    >
      <div class="editor-button-group">
        <cdx-button @click="editor.chain().focus().deleteSelection().run()" weight="quiet" action="destructive" aria-label="Delete Image">
          <cdx-icon :icon="cdxIconTrash" />
        </cdx-button>
      </div>
    </bubble-menu>

    <div v-if="editor" class="editor-toolbar">
      <div class="editor-button-group">
        <cdx-button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()" aria-label="Undo" weight="quiet">
          <cdx-icon :icon="cdxIconUndo" />
        </cdx-button>
        <cdx-button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()" aria-label="Redo" weight="quiet">
          <cdx-icon :icon="cdxIconRedo" />
        </cdx-button>
      </div>
      <div class="editor-button-group">
        <cdx-button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" aria-label="Bold" weight="quiet">
          <cdx-icon :icon="cdxIconBold" />
        </cdx-button>
        <cdx-button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" aria-label="Italic" weight="quiet">
          <cdx-icon :icon="cdxIconItalic" />
        </cdx-button>
        <cdx-button @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }" aria-label="Underline" weight="quiet">
          <cdx-icon :icon="cdxIconUnderline" />
        </cdx-button>
        <cdx-button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }" aria-label="Strikethrough" weight="quiet">
          <cdx-icon :icon="cdxIconStrikethrough" />
        </cdx-button>
      </div>
      <div class="editor-button-group">
        <cdx-button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }" aria-label="Align Left" weight="quiet">
          <cdx-icon :icon="cdxIconAlignLeft" />
        </cdx-button>
        <cdx-button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }" aria-label="Align Center" weight="quiet">
          <cdx-icon :icon="cdxIconAlignCenter" />
        </cdx-button>
        <cdx-button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }" aria-label="Align Right" weight="quiet">
          <cdx-icon :icon="cdxIconAlignRight" />
        </cdx-button>
      </div>
      <div class="editor-button-group">
        <cdx-button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }" aria-label="Paragraph" weight="quiet">
          <cdx-icon :icon="cdxIconTextStyle" />
        </cdx-button>
        <cdx-button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" aria-label="Heading 1" weight="quiet">H1</cdx-button>
        <cdx-button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" aria-label="Heading 2" weight="quiet">H2</cdx-button>
        <cdx-button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" aria-label="Heading 3" weight="quiet">H3</cdx-button>
      </div>
      <div class="editor-button-group">
        <cdx-button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }" aria-label="Bullet List" weight="quiet">
          <cdx-icon :icon="cdxIconListBullet" />
        </cdx-button>
        <cdx-button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }" aria-label="Ordered List" weight="quiet">
          <cdx-icon :icon="cdxIconListNumbered" />
        </cdx-button>
      </div>
      <div class="editor-button-group">
        <cdx-button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }" aria-label="Quote" weight="quiet">
          <cdx-icon :icon="cdxIconQuotes" />
        </cdx-button>
        <cdx-button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }" aria-label="Code Block" weight="quiet">
          <cdx-icon :icon="cdxIconCode" />
        </cdx-button>
        <cdx-button @click="editor.chain().focus().setHorizontalRule().run()" aria-label="Horizontal Rule" weight="quiet">—</cdx-button>
      </div>
      <div class="editor-button-group">
        <cdx-button @click="$emit('show-image-dialog')" aria-label="Add Image" weight="quiet">
          <cdx-icon :icon="cdxIconImage" />
        </cdx-button>
        <cdx-button @click="addTable" aria-label="Insert Table" weight="quiet">
          <cdx-icon :icon="cdxIconTable" />
        </cdx-button>
      </div>
    </div>

    <div class="editor-content-wrapper">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import { BubbleMenu } from '@tiptap/vue-3/menus';
import StarterKit from '@tiptap/starter-kit';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { onBeforeUnmount, watch } from 'vue';

import { CdxButton, CdxIcon } from '@wikimedia/codex';
import {
  cdxIconBold, cdxIconItalic, cdxIconStrikethrough, cdxIconTextStyle,
  cdxIconListBullet, cdxIconListNumbered, cdxIconImage, cdxIconTable,
  cdxIconQuotes, cdxIconCode, cdxIconUndo, cdxIconRedo, cdxIconTrash,
  cdxIconTableAddColumnBefore, cdxIconTableAddColumnAfter,
  cdxIconTableAddRowBefore, cdxIconTableAddRowAfter, cdxIconSubtract,
  cdxIconUnderline, cdxIconAlignLeft, cdxIconAlignCenter, cdxIconAlignRight
} from '@wikimedia/codex-icons';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue', 'dirty']);

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
    Image,
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    Underline,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
  ],
  editorProps: {
    attributes: { class: 'ProseMirror' },
  },
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML());
    emit('dirty');
  },
});

watch(() => props.modelValue, (value) => {
  if (editor.value && editor.value.getHTML() !== value) {
    editor.value.commands.setContent(value, false);
  }
});

function addTable() {
  if (editor.value) {
    editor.value.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }
}

function insertImage(url) {
  if (url && editor.value) {
    editor.value.chain().focus().setImage({ src: url }).run();
  }
}

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});

defineExpose({ insertImage });
</script>

<style scoped>
.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #c8ccd1;
  border-bottom: none;
  border-radius: 2px 2px 0 0;
  background-color: #f8f9fa;
}
.editor-button-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid #c8ccd1;
  border-radius: 2px;
  padding: 0.25rem;
  background: white;
}
.editor-toolbar .cdx-button.is-active {
  background-color: #eaf3ff;
  color: #36c;
}
.editor-content-wrapper {
  flex-grow: 1;
  overflow-y: auto;
}
:deep(.tiptap),
:deep(.ProseMirror) {
  border: 1px solid #c8ccd1;
  border-radius: 0 0 2px 2px;
  padding: 0.5rem 0.75rem;
  min-height: 400px;
  background-color: #fff;
}
:deep(.tiptap:focus),
:deep(.ProseMirror:focus) {
  outline: none;
  border-color: #36c;
  box-shadow: 0 0 0 1px #36c;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
:deep(.ProseMirror p) { margin-block: 0 1em; }
:deep(.ProseMirror h1),
:deep(.ProseMirror h2),
:deep(.ProseMirror h3) { margin-block: 1.5em 0.5em; line-height: 1.2; }
:deep([data-text-align="center"]) { text-align: center; }
:deep([data-text-align="right"]) { text-align: right; }
:deep([data-text-align="left"]) { text-align: left; }
:deep(.ProseMirror ul),
:deep(.ProseMirror ol) { padding-inline-start: 1.5rem; }
:deep(.ProseMirror blockquote) {
  border-inline-start: 3px solid #c8ccd1;
  padding-inline-start: 1rem;
  margin-inline: 0;
  color: #54595d;
}
:deep(.ProseMirror hr) { border: none; border-top: 1px solid #c8ccd1; margin-block: 2rem; }
:deep(table) { border-collapse: collapse; width: 100%; margin: 1rem 0; overflow: hidden; table-layout: fixed; }
:deep(td), :deep(th) { border: 1px solid #c8ccd1; padding: 0.5rem; min-width: 1em; vertical-align: top; box-sizing: border-box; position: relative; word-wrap: break-word; }
:deep(th) { font-weight: bold; text-align: left; background-color: #f8f9fa; }
:deep(img) { max-width: 100%; height: auto; display: block; cursor: pointer; }
:deep(.ProseMirror .resize-cursor) { cursor: col-resize; }
:deep(pre) { background: #0D0D0D; color: #FFF; font-family: 'JetBrainsMono', monospace; padding: 0.75rem 1rem; border-radius: 0.5rem; }
:deep(pre code) { color: inherit; padding: 0; background: none; font-size: 0.8rem; }
.bubble-menu {
  display: flex;
  background-color: #f8f9fa;
  padding: 0.2rem;
  border-radius: 4px;
  border: 1px solid #c8ccd1;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>
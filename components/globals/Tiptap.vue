<script setup lang="ts">
import { useEditor, EditorContent, type Content } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import underline, { Underline } from "@tiptap/extension-underline";
import {
  Details,
  DetailsContent,
  DetailsSummary,
} from "@tiptap/extension-details";
import emoji from "@tiptap/extension-emoji";
import { BulletList } from "@tiptap/extension-list";
import blockquote from "@tiptap/extension-blockquote";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { Placeholder } from "@tiptap/extensions";

defineOptions({
  name: "Tiptap",
});

const model = defineModel<string>();
const editor = useEditor({
  content: model.value,
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4],
      },
    }),
    underline,
    emoji,
    BulletList,
    blockquote,
    HorizontalRule,
    DetailsSummary,
    DetailsContent,
    Placeholder.configure({
      includeChildren: true,
      placeholder: ({ node }) => {
        if (node.type.name === "detailsSummary") {
          return "Summary";
        }

        return null;
      },
    }),
  ],

  onUpdate: ({ editor }) => {
    model.value = editor.getHTML();
  },
});

// Следим за изменениями v-model извне (например, если родительский компонент
// программно меняет контент) и обновляем редактор.
watch(model, (newValue: Content) => {
  if (editor.value && newValue !== editor.value.getHTML()) {
    editor.value.commands.setContent(newValue);
  }
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<template>
  <ClientOnly fallback-tag="div" fallback="Загрузка редактора...">
    <div v-if="editor" class="editor-wrapper">
      <!-- 
      Здесь будет ваш UI для управления редактором (тулбар).
      TipTap является "headless", поэтому кнопки вы создаете сами.
    -->
      <div class="editor-toolbar">
        <button
          type="button"
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          Жирный
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          Курсив
        </button>
        <button
          type="button"
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          Параграф
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          H2
        </button>
        <button
          type="button"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          H1
        </button>

        <button
          type="button"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          H1
        </button>
      </div>

      <!-- Компонент, который рендерит сам редактируемый контент -->
      <EditorContent :editor="editor" />
    </div>
  </ClientOnly>
</template>

<style>
/* Базовые стили для редактора TipTap */
.ProseMirror {
  border: 2px solid var(--color-border);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  min-height: 150px;
  background: var(--color-elements-surface);
}
.ProseMirror:focus {
  outline: 2px solid #68b1f8;
}

/* Стили для тулбара */
.editor-toolbar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
}
.editor-toolbar button {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid transparent;
}
.editor-toolbar button.is-active {
  background-color: #333;
  color: white;
}
</style>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin: -20px;">
    <CdxCard
      :thumbnail="{ url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwNwDUq_S0U6wDzS60c45kVK5zpxF-03wsQ&s' }"
      :force-thumbnail="true"
      @click="openLink('https://vercel.com/dimitrysafs-projects/dimblog')"
      style="cursor: pointer;"
    >
      <template #title>Vercel Project</template>
    </CdxCard>
    <CdxCard
      :thumbnail="{ url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLt5RQx6V1W6XXJcczgwNbzbdGyfHNCYtSCQ&s' }"
      :force-thumbnail="true"
      @click="openLink('https://supabase.com/dashboard/project/flamyyopwhxrukyjhsya/editor/17366')"
      style="cursor: pointer;"
    >
      <template #title>Supabase Dashboard</template>
    </CdxCard>
    <CdxCard
      :thumbnail="{ url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Codex_logo.svg/1200px-Codex_logo.svg.png' }"
      :force-thumbnail="true"
      @click="openLink('https://doc.wikimedia.org/codex/main/')"
      style="cursor: pointer;"
    >
      <template #title>Wikimedia Codex</template>
    </CdxCard>
  </div>
</template>

<script setup>
import { CdxCard } from '@wikimedia/codex';

const openLink = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
</script>

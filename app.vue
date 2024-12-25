<template>
  <div>
    <div class="bg-cyan-400">dsaf</div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
<script lang="ts" setup>

import {useTgWebAppStore} from "~/stores/tgWebApp";

useTgWebAppStore().init()
</script>

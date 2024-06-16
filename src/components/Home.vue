<template>
  <div class="side-nav-container">
    <div class="side-nav-button">
      <Button icon="pi pi pi-bars" @click="visibleTop = true" />
    </div>
  </div>
  <Sidebar v-model:visible="visibleTop" header=" " position="top">
    <Steps :model="items" :readonly="false" v-model:activeStep="activeIndex" />
  </Sidebar>
  <div class="small-margin-top">&nbsp;</div>
  <SelectModel v-if="activeIndex === 0" />
  <Chat v-if="activeIndex === 1" />
</template>

<script setup>

import SelectModel from './SelectModel.vue';
import Chat from './Chat.vue';
import { ref } from "vue";

const visibleTop = ref(false);
const activeIndex = ref(1);
const items = ref([
  {
    label: 'Model List',
    command: () => { activeIndex.value = 0; }
  },
  {
    label: 'Chat with AI',
    command: () => { activeIndex.value = 1 }
  }
]);


</script>
<style scoped>
.side-nav-container {
  display: flex;
  justify-content: flex-end;
  /* Align items to the right */
  align-items: center;
  /* Align items vertically in the center */
  width: 100%;
}

.side-nav-button {
  margin-top: -15px;
  position: absolute;
}
</style>

<template>
  <h1 class="greetings">Model List</h1>
  <div class="full-width-and-height centered-items" v-if="processing_response">
    <ProgressSpinner />
  </div>
  <div v-else>
    <div class="card flex justify-content-center">
      <Stepper orientation="vertical">
        <StepperPanel v-for="(model, index) in modelList" :key="index" :header="model.name">
          <template #content="{ prevCallback, nextCallback }">
            <div class="flex flex-column h-12rem">
              <div
                class="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                <h2>{{ model.name }}</h2>
                <p><strong>Digest:</strong> {{ model.digest }}</p>
                <p><strong>Size:</strong> {{ bytesToGB(model.size) }} Gigabytes</p>
                <p><strong>Modified At:</strong> {{ model.modified_at }}</p>
                <p><strong>Details:</strong> {{ model.details }}</p>
              </div>
            </div>
          </template>
        </StepperPanel>
      </Stepper>
    </div>
  </div>
  <div class="card flex justify-content-center">
    <Toast position="bottom-right" group="br" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from '../stores/auth.js';
const authStore = useAuthStore();
const modelList = ref(authStore.getModelList);
const processing_response = ref(false);

const bytesToGB = (bytes) => {
  const gb = bytes / (1024 ** 3);
  return gb.toFixed(2); // You can adjust the number of decimal places
}

</script>


<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

.greetings h1 {
  text-align: center;
}

.centered-items {
  padding-left: 45%;
  padding-top: 10%;
}

.full-width-and-height {
  min-width: 100%;
  min-height: 43vh;
}
</style>

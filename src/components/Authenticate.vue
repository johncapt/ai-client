<template>
  <Dialog :visible="true" modal header="Edit Profile" :style="{ width: '30rem' }" :closable="false" :pt="{
    root: 'border-none',
    mask: {
      style: 'backdrop-filter: blur(2px);'
    }
  }">
    <template #header>
      <div>
        <h1>Ask AI</h1>
      </div>
      <div style="margin-left: 7rem;">
        <Avatar icon="pi pi-lock" shape="circle" />
        <span style="margin-left: 1rem;">Please authenticate</span>
      </div>
    </template>
    <div>
      <div>
        <div>URL</div>
        <InputText id="url" v-model="url" style="width: 100%;" :invalid="url === ''" />
      </div>
      <div style="margin-top: 1rem;">
        <div>Key</div>
        <InputText id="key" v-model="key" style="width: 100%;" :invalid="key === ''" />
      </div>
    </div>
    <template #footer>
      <Button 
      label="Confirm" 
      severity="primary" 
      icon="pi pi-check" 
      @click="authenticate()" 
      :disabled="url === '' || key === ''"
      />
    </template>
  </Dialog>
  <div class="card flex justify-content-center">
    <Toast position="bottom-right" group="br" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from '../stores/auth.js';
const toast = useToast();
const authStore = useAuthStore();
const url = ref('');
const key = ref('');
const AUTH_ERR_MSG = 'Could not authenticate: Unknown url or key.'
const authenticate = () => {
  if (url.value !== '' || key.value !== '') {
    console.log(url.value, key.value);
    fetch(`${url.value}/auth/`, {
      method: 'GET',
      headers: {
        'Access-Token': key.value
      }
    })
      .then(response => {
        return response.json();
      })
      .then(_data => {
        if (_data.detail !== 'Authentication successful') {
          toast.add({ severity: 'error', summary: 'Authentication', detail: AUTH_ERR_MSG, group: 'br', life: 4000 });
        } else {
          toast.add({ severity: 'success', summary: 'Authentication succeeded', detail: 'Loading model list...', group: 'br', life: 4000 });
          // pass authentication
          loadModels();
        }
      })
      .catch(_error => {
        toast.add({ severity: 'error', summary: 'Authentication', detail: AUTH_ERR_MSG, group: 'br', life: 4000 });
      });
  }
}

const loadModels = () => {
  fetch(`${url.value}/list-models/`, {
    method: 'GET',
    headers: {
      'Access-Token': key.value
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.info(data);
      authStore.setModelList(data);
      authStore.setIsAuthentiticated(url.value, key.value);
    })
    .catch(error => {
      toast.add({ severity: 'error', summary: 'Error', detail: error, group: 'br', life: 4000 });
    });
}

</script>
<style scoped></style>

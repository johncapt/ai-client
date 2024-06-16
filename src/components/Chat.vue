<template>
  <div class="full-width" style="margin-top: -1.5rem;margin-bottom: .5rem;">
    <label for="model_list" style="margin-left: 0.3rem;color:rgb(102,105,139);">Available
      Models</label>
    <SelectButton id="model_list" v-model="llm_name" :options="llm_list" aria-labelledby="basic" />
  </div>

  <Splitter>
    <SplitterPanel style="padding: 0.3rem;height:89cqh;">
      <div style="margin-top:0.2rem;">
        <label for="system_prompt">AI Persona Description</label>
          <InputText class="full-width" id="system_prompt" v-model="system_prompt"
            placeholder="You are a helpful assistant..." />
      </div>

      <div style="margin-top:0.5rem;">
        <label for="context">Context</label>
    <Textarea class="full-width" id="context" v-model="context" rows="10" cols="30"
      placeholder="Paste your context here..." />
    
      </div>
      <div class="container">
    <div class="textbox-container">
      <div>
        <label for="instructions">Instructions</label>
        <InputText class="full-width" id="instructions" v-model="instructions"
          placeholder="Use provided context to..." />
        
      </div>
    </div>
    <div class="button-container">
      <Button :disabled="processing_response || stream_in_progress" label="Ask AI" icon="pi pi-check"
        @click="stream_chat()" />
    </div>
  </div>
    </SplitterPanel>
    
    <!-- AI response -->
    <SplitterPanel style="padding: 0.3rem;">
      <div class="full-width-and-height centered-items" v-if="processing_response">
        <ProgressSpinner />
      </div>
      <div v-else>
        <label for="context">AI Response</label>
        <Textarea class="full-width-and-height" id="response" v-model="ai_response" rows="10" cols="30"
          placeholder="" readonly disabled @contextmenu="onAIResponseRightClick"
          aria-haspopup="true" />
        <ContextMenu ref="menu" :model="context_menu_items" />
      </div>
    </SplitterPanel>
  </Splitter>







  <!-- <div class="small-margin-top"></div>
  
  <div class="small-margin-top"></div>
  

  <div class="small-margin-top"></div> -->
  
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from '../stores/auth.js';
const authStore = useAuthStore();

const DEFAULT_SYSTEM_PROMPT = "You are an experienced lawyer"
const DEFAULT_INSTRUCTIONS = "Use provided context to write cross examination questions"
const system_prompt = ref(DEFAULT_SYSTEM_PROMPT);
const context = ref();
const instructions = ref(DEFAULT_INSTRUCTIONS);
const ai_response = ref();
const processing_response = ref(false);
const stream_in_progress = ref(false);

const menu = ref();
const context_menu_items = ref([
  { label: 'Select all', icon: 'pi pi-file-edit', command: () => { console.log('select'); } },
  { label: 'Copy', icon: 'pi pi-copy', command: () => { console.log('copy'); } }
]);

const onAIResponseRightClick = (event) => {
  menu.value.show(event);
};


const llm_list = ref(authStore.getModelNames);
const llm_name = ref(llm_list.value[0]);


// const chat = () => {
//   processing_response.value = true;
//   const payload = {
//     llm_name: 'llama3',
//     system_prompt: `${system_prompt.value}`,
//     context: `${context.value}`,
//     user_prompt: `${instructions.value}`
//   };

//   axios.post(chat_url, payload, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Token': accessToken
//     }
//   })
//     .then(response => {
//       processing_response.value = false;
//       // console.log('Success:', response.data);
//       ai_response.value = response.data;
//       // Handle success response
//     })
//     .catch(error => {
//       processing_response.value = false;
//       console.error('Error:', error);
//       // Handle error response
//       ai_response.value = error;
//     });
// }

const stream_chat = async () => {
  stream_in_progress.value = true;
  processing_response.value = true;
  ai_response.value = 'AI has recieved and is processing your request... Please wait.';
  const payload = {
    llm_name: llm_name.value,
    system_prompt: `${system_prompt.value}`,
    context: `${context.value}`,
    user_prompt: `${instructions.value}`
  };
  try {
    const response = await fetch(`${authStore.url}/stream_chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': authStore.key
      },
      body: JSON.stringify(payload)
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let concatenatedChunks = '';
    while (true) {
      processing_response.value = false;
      const { done, value } = await reader.read();
      if (done) {
        stream_in_progress.value = false;
        break;
      };
      const chunk = decoder.decode(value, { stream: true });
      concatenatedChunks += chunk;
      ai_response.value = concatenatedChunks
    }
  } catch (error) {
    processing_response.value = false;
    ai_response.value = `Error: Server error: ${error.message}`;
  }
}

</script>
<style scoped>
.centered-items {
  padding-left: 40%;
  padding-top: 10%;
}

.full-width {
  min-width: 100%;
}

.full-width-and-height {
  min-width: 100%;
  min-height: 85vh;
}

.container {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  width: 100%;
}

.textbox-container {
  flex: 1;
  margin-right: 10px;
}

.button-container {
  display: flex;
  align-items: center;
}

.small-margin-top {
  margin-top: 2rem;
}
</style>

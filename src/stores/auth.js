import { defineStore } from 'pinia'

export const useAuthStore = defineStore('Auth', {
  // Initial state
  state: () => ({
    isAuthenticated: true,
    url: '',
    key: '',
    modelList: [],
    model: undefined
  }),

  // Getters
  getters: {
    getUrl: (state) => state.url,
    getKey: (state) => state.key,
    getModelList: (state) => state.modelList,
    getModelNames: (state) => {
      let modelNames = [];
      state.modelList.forEach(model => {
        modelNames.push(model.name);
      }) 
      return modelNames
    },
    getModel: (state) => state.model,
  },

  // Actions
  actions: {
    setIsAuthentiticated(p_url, p_key) {
      this.url = p_url;
      this.key = p_key;
      this.isAuthenticated = true;
    },
    setModelList(p_modelList) {
      this.modelList = []; // Reset model list
      p_modelList.forEach(model => {
        this.modelList.push(model);       
      });
    },
  },
});
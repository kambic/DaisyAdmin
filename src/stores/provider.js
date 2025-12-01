import { defineStore } from "pinia";
import { mande } from "mande";

const api = mande("/api/provider");

export const useProviderStore = defineStore("provider", {
  state: () => ({
    items: [],
    loading: false,
    error: null,
    activeTab: null,
    edgewares: [],
  }),

  getters: {
    byId: (state) => (id) => state.items.find((p) => p.id === id),
    numExpired: (state) => state,
  },

  actions: {
    async fetchProviders() {
      if (this.loading || this.items.length) return;

      this.loading = true;
      this.error = null;

      try {
        const res = await api.get();

        this.items = res.results || [];
        console.log("Providers loaded:", this.items);
      } catch (err) {
        this.error = err?.message || "Unknown error";
      } finally {
        this.loading = false;
      }
    },
    async loadEdgewares(provider) {
      console.log("Loading edgewares for provider:", provider.id);
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
});

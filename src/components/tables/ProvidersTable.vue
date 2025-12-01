<template>
  <div>
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>
              <button class="btn btn-sm btn-primary">Edit</button>
              <button class="btn btn-sm btn-error ml-2">Delete</button>
            </td>
          </tr>
          <tr v-if="loading">
            <td colspan="4" class="text-center">Loading...</td>
          </tr>
          <tr v-if="error && items.length === 0">
            <td colspan="4" class="bg-error text-error-content text-center p-4">
              {{ error }}
            </td>
          </tr>
          <tr v-if="!loading && items.length === 0 && !error">
            <td colspan="4" class="text-center">No data available.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="flex justify-center mt-6">
      <div class="join">
        <button
          class="join-item btn"
          @click="previousPage"
          :disabled="currentPage === 1"
        >
          «
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          class="join-item btn"
          :class="{ 'btn-active': page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        <button
          class="join-item btn"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          »
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const items = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const count = ref(0);
const pageSize = 10; // Adjust as per your DRF pagination settings
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
  try {
    const response = await fetch("/api/providers/");

    // --- FIX 1: Check if the HTTP response was successful ---
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    items.value = data.results || data;

    count.value = data.count || items.value.length;
    totalPages.value = Math.ceil(count.value / pageSize);
    currentPage.value = page;

    console.log("Data successfully loaded:", items.value);
  } catch (err) {
    console.error("Data fetching error:", err);
    error.value = "Failed to fetch data: " + err.message;
  } finally {
    loading.value = false;
  }
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    fetchData(page);
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    fetchData(currentPage.value - 1);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    fetchData(currentPage.value + 1);
  }
};

// --- FIX 4: Use onMounted to call the function once ---
onMounted(fetchData);

// --- REMOVAL: Removed the incorrect fetch block below ---

/*
// This block was incorrect and caused issues:
fetch("/api/providers/").then((res) => {
    console.log(`Fetched data: ${res.results}`); // res.results is undefined
    items.value = res.results; // res.results is undefined
    loading.value = false;
});
*/
</script>

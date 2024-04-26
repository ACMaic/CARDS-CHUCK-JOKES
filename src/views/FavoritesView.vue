<template>
  <v-container d-flex>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <input v-model="search" type="text" name="search" id="search" placeholder="Search for term" >
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        {{`Category: ${selectedCategory}`}}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="500" hover>
          <v-card-text>
            <v-container>
              <v-col v-for="(joke, index) in filteredJokes" :key="index">
                <v-card>
                  <v-card-text>
                    {{ joke.value }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-speed-dial location="bottom center" transition="fade-transition">
      <v-btn
        v-for="(category, index) in categories"
        :key="index"
        @click="selectedCategory = category"
        :color="selectedCategory == category ? 'primary' : ''">
          {{ category }}
      </v-btn>
      <template v-slot:activator="{ props: activatorProps }">
        <v-fab
          v-bind="activatorProps"
          size="large"
          icon="$vuetify"
          class="custom-fab"
        ></v-fab>
      </template>
   </v-speed-dial>
 </v-container>
</template>

<script>
import axios from 'axios';
import { useJokesStore } from '../store';

export default {
  data() {
    return {
      favoriteJokesStore: useJokesStore(),
      search: '',
      selectedCategory: 'All',
      categories: [],
    };
  },
  computed: {
    favorites() {
      return this.favoriteJokesStore.favoriteJokes;
    },

    filteredJokes() {
      let jokes= [...this.favorites]

      if (this.selectedCategory !== 'All') {
        jokes = [...this.favorites.filter(joke => joke.categories.includes(this.selectedCategory))]
      }

      if (this.search) {
        // Existing search filter logic
        return this.jokes.filter(joke => joke.value.includes(this.search));
      }
      // Show all favorites if no search or category is selected
         return jokes;
    }
  },
  mounted() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      try {
        const response = await axios.get('https://api.chucknorris.io/jokes/categories');
        this.categories = ['All', ...response.data];
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async load({ done }) {
      try {
        const res = await axios.get('https://api.chucknorris.io/jokes/random');
        this.favoriteJokesStore.addJoke(res.data);
        done('ok');
      } catch (error) {
        console.error('Error fetching joke:', error);
      }
    },
    deleteJoke(id) {
      this.favoriteJokesStore.removeJoke(id);
    },
    toggleFavorite(joke) {
      const index = this.favoriteJokesStore.favoriteJokes.findIndex(el => el.id === joke.id);
      this.favoriteJokesStore.favoriteJokes[index].isFavorite = !joke.isFavorite;
      this.favoriteJokesStore.addOrRemoveFavorite(joke);
    },
    toggleCategory(category) {
      this.selectedCategory = category;
    }
  }
}
</script>

<style>
.custom-fab{
  position: absolute;
  right: 16px;
  bottom: 16px;
}
</style>

<template>
  <v-container fluid>
    <v-infinite-scroll
      height="600px"
      mode="manual"
      @load="load"
    >
      <template v-for="joke in jokes" :key="joke.id">
        <v-col class="mx-auto my-3" elevation="16"
        max-width="344" xs="12" sm="6" md="4" lg="3" xl="2":cols="joke">
          <v-card>
            <v-card-text class="text-h5 py-2" >
              {{ joke.value }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon small color="red" @click="deleteJoke(joke.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn
                :icon="joke.isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
                @click="toggleFavorite(joke)"
                class="favorite-button"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>
      <v-card-text v-if="jokes.length === 0">
        <v-alert>No jokes here!</v-alert>
      </v-card-text>
    </v-infinite-scroll>
  </v-container>
</template>

<script>
import axios from 'axios';
import { useJokesStore } from '../store'
export default {
  data() {
    return {
      jokes: [],
      isFavorite: false,
      jokeStore: useJokesStore()
    };
  },
  methods: {
    deleteJoke(id) {
      this.jokes = this.jokes.filter(j => j.id !== id);
    },
    clearJokes() {
      this.jokes = [];
    },
    toggleFavorite(joke){
      const index = this.jokes.findIndex(el => el.id === joke.id)
      this.jokes[index].isFavorite = !joke.isFavorite;
      this.jokeStore.addOrRemoveFavorite(joke)
      console.log(this.jokeStore.favoriteJokes.length)
    },
    async load({ done }) {
      try {
        const res = await axios.get('https://api.chucknorris.io/jokes/random');
        this.jokes.push(res.data);
        done('ok');
      } catch (error) {
        console.error('Error fetching joke:', error);
      }
    }
  },
};
</script>

<template>
  <v-container class="custom-background">
    <v-infinite-scroll height="600px" mode="manual" @load="load">
      <v-container v-if="jokeStore?.jokes?.length > 0">
        <v-col class="mx-auto my-3" elevation="16" max-width="344" xs="12" sm="10" offset-sm1
          v-for="joke in jokeStore.jokes" :key="joke.id">
          <v-card class="mx-auto" max-width="400">
            <v-img class="align-end text-white" height="200" src="https://qph.cf2.quoracdn.net/main-qimg-bd761ccdb76b7887ac7cf7e2fb50ec47-lq"
              cover>
            </v-img>
            <v-card-text>
              {{ joke.value }}
            </v-card-text>
            <v-card-actions>
              <v-btn
                :icon="joke.isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
                @click="toggleFavorite(joke)"
                class="favorite-button">
               </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-container>
      <v-card-text v-else>
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
      jokeStore: useJokesStore(),
    };
  },

  methods: {
    async load({ done }) {
      try {
        const res = await axios.get('https://api.chucknorris.io/jokes/random');
        this.jokeStore.addJoke(res.data);
        done('ok');
      } catch (error) {
        console.error('Error fetching joke:', error);
      }
    },
    deleteJoke(id) {
      this.jokeStore.removeJoke(id);
    },

    toggleFavorite(joke) {
      const index = this.jokeStore.jokes.findIndex(el => el.id === joke.id)
      this.jokeStore.jokes[index].isFavorite = !joke.isFavorite;
      this.jokeStore.addOrRemoveFavorite(joke)
      console.log(this.jokeStore.favoriteJokes.length)
    }
  },
};
</script>

<style scoped>
.custom-background {
  background-image: url('https://i0.wp.com/citymagazine.si/wp-content/uploads/2015/03/169271-chuck-norris-texas-banner.jpg?w=1600&ssl=1');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: rgb(0, 0, 0);
}
</style>

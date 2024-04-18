<template>
  <v-container>
    <v-card class="mx-auto" max-width="500" hover>
      <v-card-text v-if="jokes.length > 0" >
         <v-container>
               <v-col v-for="joke in jokes" :key="joke.id" :cols="joke">
                 <v-card>
                   <v-card-text>
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
                       class="favorite-button">
                      </v-btn>
                   </v-card-actions>
                 </v-card>
               </v-col>
           </v-container>
      </v-card-text>
      <v-card-text v-else>
         <v-alert>No jokes here!</v-alert>
      </v-card-text>
    </v-card>
    <v-card-text>
        <div class="d-flex justify-center">
          <v-btn style="background-color:#004D40;" @click="addJoke">Get a new Joke</v-btn>
        </div>
      </v-card-text>
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
    async addJoke() {
      try {
        const res = await axios.get('https://api.chucknorris.io/jokes/random');
        this.jokes.push(res.data);
      } catch (error) {
        console.log(error);
      }
    },
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
    }
  },
};
</script>

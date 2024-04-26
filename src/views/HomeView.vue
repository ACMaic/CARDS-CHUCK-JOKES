<template>
  <v-container>
    <v-infinite-scroll height="600px" mode="manual" @load="load">
      <v-card-text class="text-h5 py-2" v-if="jokeStore?.jokes?.length > 0" >
         <v-container>
               <v-col class="mx-auto my-3" elevation="16" max-width="344" xs="12" sm="6" md="4" lg="3" xl="2"
                v-for="joke in jokeStore.jokes" :key="joke.id">
                 <v-card>
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
      </v-card-text>
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
     try{
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

   toggleFavorite(joke){
      const index = this.jokeStore.jokes.findIndex(el => el.id === joke.id)
      this.jokeStore.jokes[index].isFavorite = !joke.isFavorite;
      this.jokeStore.addOrRemoveFavorite(joke)
      console.log(this.jokeStore.favoriteJokes.length)
    }
   },
  };
</script>

<style scoped>
/* Definindo o estilo do background com a imagem desejada */
.custom-background {
  background-image: url('../assets/fundo1.jpg'); /* Substitua pelo caminho da sua imagem */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

}
</style>

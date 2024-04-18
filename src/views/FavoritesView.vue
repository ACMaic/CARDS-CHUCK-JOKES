<template>
  <v-container>
    <v-card class="mx-auto" max-width="500" hover>
      <v-card-text>
         <v-container>
               <v-col v-for="(joke, index) in favorites" :key="index">
                 <v-card>
                   <v-card-text>
                    {{ joke.value }}
                   </v-card-text>
                 </v-card>
               </v-col>
           </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { computed } from 'vue';
import { useJokesStore } from '../store';
export default {
  setup() {
    const favoriteJokesStore = useJokesStore();
    const favorites = computed(() => favoriteJokesStore.favoriteJokes);
    const addOrRemoveFavorite = (joke) => {
      favoriteJokesStore.addOrRemoveFavorite(joke);
    };
    return {
      favorites,
      addOrRemoveFavorite
    };
  }
}
</script>

import { defineStore } from 'pinia'
export const useJokesStore = defineStore('jokes', {
    // Propriedades reativas
    state: () => ({
      jokes: [
        {
          "categories": [
            "explicit"
          ],
          "isFavorite": false,
          "created_at": "2020-01-05 13:42:19.104863",
          "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
          "id": "bsdvxgtbtegjbundxa101g",
          "updated_at": "2020-01-05 13:42:19.104863",
          "url": "https://api.chucknorris.io/jokes/bsdvxgtbtegjbundxa101g",
          "value": "One day Chuck Norris walked down the street with a massive erection. There were no survivors."
        }
      ],
      filteredJokes:[],
      favoriteJokes: []
    }),
    // Propriedades Computadas
    getters:{
      getJokes: (state) => state.jokes,
      getFilteredJokes: (state) => state.filteredJokes,
    },
    //Métodos
    actions:{
      addJoke(joke){
        this.jokes.push(joke)
      },
      removeJoke(id){
        this.jokes = [... this.jokes.filter(j => j !== id)]
      },
      filterJokes(term: String){
        const toFilter = [... this.jokes]
        if (term){
          this.filteredJokes =toFilter.filter(j => j.value.includes(term))
        }
      },
      addOrRemoveFavorite (joke){
        const index = this.favoriteJokes.findIndex(el => el.id === joke.id)
        if (index > -1) {
          this.favoriteJokes = this.favoriteJokes.splice(index, 1)
        } else {
          this.favoriteJokes.push(joke)
        }
      }
    }
  })

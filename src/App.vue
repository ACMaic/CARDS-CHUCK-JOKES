<template>
  <v-app id="inspire" class="custom-background">
    <v-app-bar class="custom-app-bar" color="black">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="custom-app-bar-nav"></v-app-bar-nav-icon>
      <v-app-bar-title>Chuck Norris Jokes</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary class="custom-drawer">
      <v-list>
        <v-list-item v-for="(menu, index) in routes" :key="index" :to="menu.route" :title="menu.name">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-black">
      <v-container>
        <v-row>
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    routes: [
      { route: '/', name: 'home', icon: "mdi-home"},
      { route: '/favorites', name: 'favorites', icon:"mdi-heart"},
    ]
   }),
}
</script>

<style scoped>
.custom-background {
  background-color: #c68e40;
}

.custom-app-bar-nav {
  color: #c68e40;
}

.custom-app-bar {
  background-color: #c68e40;
}

.custom-drawer {
  background-color: #c68e40;
}
</style>

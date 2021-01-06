<template>
  <v-app>
    <!-- Side Navigation Drawer ----->
    <v-navigation-drawer v-model="drawer" app color="white" temporary>
      <v-list>
        <v-list-item v-for="navigation in navigations" :key="navigation.title" router :to="navigation.route">
          <v-list-item-action>
            <v-icon color="#117864" left>{{ navigation.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="black--text">{{ navigation.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app class="" color="#17A589" height="65px">
      <v-app-bar-nav-icon v-show="$vuetify.breakpoint.width <= 700" dark x-large @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <div>
        <v-toolbar-title
          @click="
            $router.push({ name: 'Home' });
            changeCurrentUrl();
          "
          class="white--text"
        >
          <v-img alt="Logo" src="./assets/logo.png" class="logo" width="110px" height="50px"> </v-img>
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-tabs v-model="activeTab" slider-size="3" dark right class="vtabs mr-0" icons-and-text>
        <v-tab class="text-capitalize" v-for="navigation in navigations" :key="navigation.title" :to="navigation.route" @click="changeCurrentUrl">
          {{ navigation.title }}
          <v-icon color="#34495E" class="">{{ navigation.icon }}</v-icon>
        </v-tab>

        <v-tabs-slider v-show="currentUrlPath != '/finastrabank.com/'" color="#34495E"></v-tabs-slider>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},

  data: () => ({
    drawer: false,
    activeTab: null,
    currentUrlPath: window.location.pathname,
    navigations: [
      { title: "About Us", icon: "far fa-address-card", route: "/aboutus" },
      { title: "Products", icon: "fas fa-box-open", route: "/products" },
      { title: "Newsroom", icon: "far fa-newspaper", route: "/newsroom" },
      { title: "Contact Us", icon: "fas fa-phone-volume", route: "/contactus" },
    ],
  }),
  methods: {
    changeCurrentUrl() {
      this.currentUrlPath = window.location.pathname;
      console.log("log..", this.currentUrlPath);
    },
  },
};
</script>

<style scoped>
.logo {
  width: 110px;
  height: 50px;
}

@media only screen and (max-width: 700px) {
  .logo {
    width: 95px;
    height: 42px;
  }
  .vtabs {
    display: none;
  }
}

@media only screen and (max-width: 400px) {
  .logo {
    width: 50px;
    height: 45px;
  }
}
</style>

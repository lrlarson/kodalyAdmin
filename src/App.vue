<template>
  <v-app>
		<v-navigation-drawer
				v-model="drawer"
				app
		>
			<v-list dense v-if="authenticated">
				<v-list-item link>
					<v-list-item-action>
						<v-icon>mdi-home</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Home</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
    <v-app-bar
      app
      color="red"
      dark
    >
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>Kodaly Song Database - Kodaly Center, HNU -- App Version 1 alpha</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
		<v-footer
				color="red"
				app
		>
			<span class="white--text">&copy;  {{ currentYear }}</span>
		</v-footer>
  </v-app>
</template>

<script>
import moment from "moment";
import {eventBus} from "./main";

export default {
  name: 'App',

  data: () => ({
		drawer: null,
		authenticated: false,     // temp sent to true,
		currentYear: ''
  }),
	created() {
		eventBus.$on("signedIn", () => {
			//console.log("signin");
			this.authenticated = true;
		});
		eventBus.$on("signInFail", () => {
			this.authenticated = false;
		});
		this.currentYear = moment().year();
	}
};
</script>

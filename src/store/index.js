import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		profiles: [],
		favoriteIds: [],
	},
	mutations: {
		addFavorite(state, profileId) {
			state.favoriteIds.push(profileId);
		},
		removeFavorite(state, profileId) {
			const profileIndex = state.favoriteIds.findIndex((f) => f == profileId);
			state.favoriteIds.splice(profileIndex, 1);
		},
	},
	actions: {
		addFavorite({ commit }, profileId) {
			commit('addFavorite', profileId);
		},
		removeFavorite({ commit }, profileId) {
			commit('removeFavorite', profileId);
		},
		async getProfiles() {
			const numberOfProfiles = Math.floor(Math.random() * 100) + 1;
			let response = await fetch(`https://randomuser.me/api/?results=${numberOfProfiles}`);
			response = await response.json();
			this.state.profiles = response.results.filter((r) => r.id.value);
		},
	},
	getters: {
		getProfiles(state) {
			return state.profiles;
		},
		getProfileById: (state) => (id) => {
			return state.profiles.find((p) => p.id.value == id);
		},
		getFavoriteIds(state) {
			return state.favoriteIds;
		},
		getFavorites: (state, getters) => {
			return state.favoriteIds.map((favoriteId) => {
				return getters.getProfileById(favoriteId);
			});
		},
		isThisProfileFavorite: (state) => (id) => {
			return state.favoriteIds.some((f) => f == id);
		},
	},
	modules: {},
});

export default store;

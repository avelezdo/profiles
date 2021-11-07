<template>
	<div class="home">
		<v-btn @click="getProfilesFromAPI" target="_blank" text elevation="2">
			<span class="mr-2">Obtener perfiles</span>
		</v-btn>
		<v-btn @click="areFiltersShown = !areFiltersShown" target="_blank" text elevation="2">
			<span class="mr-2">Filtros</span>
		</v-btn>

		<filters :profiles="profiles" v-if="areFiltersShown" @profilesFiltered="filterProfiles"></filters>
		<profiles :profiles="profiles" />
	</div>
</template>

<script>
import Profiles from '@/components/Profiles.vue';
import Filters from '@/components/Filters.vue';

export default {
	name: 'Home',
	components: {
		Profiles,
		Filters,
	},
	computed: {
		getProfiles: function () {
			return this.$store.getters.getProfiles;
		},
	},
	created: function () {
		this.profiles = this.$store.getters.getProfiles.length ? this.$store.getters.getProfiles : [];
	},
	methods: {
		filterProfiles(profiles) {
			this.profiles = profiles;
		},
		async getProfilesFromAPI() {
			await this.$store.dispatch('getProfiles');
			this.profiles = this.$store.getters.getProfiles;
		},
	},
	data: function () {
		return {
			profiles: [],
			areFiltersShown: false,
		};
	},
};
</script>

<style>
.home {
	margin-top: 2rem;
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
	text-align: center;
}
</style>

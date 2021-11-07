<template>
	<div class="favorites-layout">
		<div class="header-section" v-if="favoriteIds.length > 0">
			<h3 class="mr-3">Lista de favoritos</h3>
			<v-dialog v-model="dialog" max-width="600px">
				<template v-slot:activator="{ on, attrs }">
					<v-btn color="primary" dark v-bind="attrs" v-on="on"> Guardar </v-btn>
				</template>
				<v-card>
					<v-card-title>
						<span class="text-h5">Guardar favorito</span>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12">
									<v-text-field label="Nombre*" v-model="favoritesName" required></v-text-field>
								</v-col>
							</v-row>
						</v-container>
						<small>*indicates required field</small>
						<div class="text-h6 text-center mt-2">¿Deseas guardar esta lista de favoritos?</div>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="dialog = false"> No </v-btn>
						<v-btn color="blue darken-1" text @click="saveFavorites()"> Sí </v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-btn class="export-button" @click="exportToCSV(csvData)" target="_blank" text elevation="2">Exportar</v-btn>
		</div>
		<div class="favorites-wrapper">
			<div v-for="favoriteId in favoriteIds" :key="favoriteId">
				<profile :profile="getProfileById(favoriteId)"></profile>
			</div>
		</div>
	</div>
</template>

<script>
import Profile from '@/components/Profile.vue';

export default {
	props: ['id'],
	components: { Profile },
	methods: {
		formatDate(date) {
			return new Date(date).toLocaleString();
		},
		exportToCSV(arrData) {
			let csvContent = 'data:text/csv;charset=utf-8,';
			csvContent += [Object.keys(arrData[0]).join(';'), ...arrData.map((item) => Object.values(item).join(';'))].join('\n').replace(/(^\[)|(\]$)/gm, '');

			const data = encodeURI(csvContent);
			const link = document.createElement('a');
			link.setAttribute('href', data);
			link.setAttribute('download', 'favorites.csv');
			link.click();
		},
		async saveFavorites() {
			this.dialog = false;
			const favoritesToSave = { name: this.favoritesName, favorites: this.favorites };
			console.log(favoritesToSave);
			await fetch(`https://localhost:3000/api/favorites`, {
				// await fetch(`https://serene-bastion-81525.herokuapp.com/api/favorites`, {
				method: 'POST',
				mode: 'cors', // no-cors, *cors, same-origin
				credentials: 'same-origin', // include, *same-origin, omit
				// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				// redirect: 'follow', // manual, *follow, error
				// referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(favoritesToSave),
			});
		},
	},
	data: function () {
		return {
			favoriteIds: null,
			favorites: null,
			dialog: false,
			favoritesName: '',
		};
	},
	computed: {
		csvData() {
			return this.favorites.map((favorite) => ({
				gender: favorite.gender,
				name: favorite.name.first,
				email: favorite.email,
				country: favorite.location.country,
				dob: favorite.dob.date,
				registrationDate: favorite.registered.date,
			}));
		},
		getProfileById: function () {
			return function (id) {
				return this.$store.getters.getProfileById(id);
			};
		},
	},
	created() {
		this.favoriteIds = this.$store.getters.getFavoriteIds;
		this.favorites = this.$store.getters.getFavorites;
	},
};
</script>

<style lang="css" scoped>
.favorites-layout {
	max-width: 1230px;
	margin-left: auto;
	margin-right: auto;
}
.header-section {
	display: flex;
	margin-top: 2rem;
	align-items: baseline;
}
.favorites-wrapper {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
	grid-gap: 10px;
	margin-top: 1rem;
}
.map {
	grid-column: span 66%;
}
.personal-data {
	text-align: center;
	grid-column: span 3;
}
.location-data {
	text-align: center;
	grid-column: span 3;
}
.fav {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>

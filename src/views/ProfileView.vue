<template>
	<v-card class="profile-item">
		<div class="photo">
			<img :src="profile.picture.large" alt="" />
		</div>
		<div id="map" class="map"></div>
		<div class="fav">
			<v-btn @click="markAsFavorite" :title="setFavoriteTitle" target="_blank" text elevation="2" icon :color="setIconColor">
				<v-icon>mdi-star</v-icon>
			</v-btn>
		</div>
		<div class="personal-data">
			<h3>Nombre {{ profile.name.first }}</h3>
			<h3>Email {{ profile.email }}</h3>
		</div>
		<div class="location-data">
			<h3>Ciudad {{ profile.location.city }}</h3>
			<h3>Calle {{ profile.location.street.name }}, {{ profile.location.street.number }}</h3>
			<h3>Teléfono {{ profile.phone }}</h3>
		</div>
	</v-card>
</template>

<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export default {
	props: ['id'],
	methods: {
		formatDate(date) {
			return new Date(date).toLocaleString();
		},
		markAsFavorite() {
			this.isFavorite ? this.$store.dispatch('removeFavorite', this.id) : this.$store.dispatch('addFavorite', this.id);
			this.isFavorite = this.$store.getters.isThisProfileFavorite(this.id);
		},
	},
	computed: {
		setIconColor: function () {
			return this.isFavorite ? 'orange lighten-4' : 'orange darken-2';
		},
		setFavoriteTitle: function () {
			return this.isFavorite ? 'Eliminar de favoritos' : 'Marcar como favorito';
		},
	},
	data: function () {
		return {
			profile: null,
			isFavorite: false,
		};
	},
	mounted() {
		const latitude = this.profile.location.coordinates.latitude;
		const longitude = this.profile.location.coordinates.longitude;
		new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
			],
			view: new View({
				center: fromLonLat([longitude, latitude]),
				zoom: 2,
			}),
		});
	},
	created() {
		this.profile = this.$store.getters.getProfileById(this.id);
		this.isFavorite = this.$store.getters.isThisProfileFavorite(this.id);
	},
};
</script>

<style lang="css" scoped>
.profile-item {
	margin-top: 2rem;
	max-width: 800px;
	margin-left: auto;
	margin-right: auto;
	display: grid;
	grid-template-rows: 200px 100px 100px;
	grid-template-columns: repeat(3, minmax(200px, 1fr));
}
.profile-item > .personal-data {
	text-align: center;
	grid-column: span 3;
	align-self: center;
}
.profile-item > .location-data {
	text-align: center;
	grid-column: span 3;
	align-self: center;
}
.profile-item > .photo > img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.profile-item > .fav {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>

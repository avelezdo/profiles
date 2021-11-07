<template>
	<v-card class="profile-item">
		<h5>{{ profile.gender }}</h5>
		<h5>{{ profile.name.first }}</h5>
		<h5>{{ profile.email }}</h5>
		<h5>{{ profile.location.country }}</h5>
		<h5>{{ formatDate(profile.dob.date) }}</h5>
		<h5>{{ formatDate(profile.registered.date) }}</h5>
		<router-link :to="{ name: 'Profile', params: { id: profile.id.value } }">Ver perfil</router-link>
	</v-card>
</template>

<script>
export default {
	props: ['profile'],
	name: 'profile',
	methods: {
		formatDate(date) {
			return new Date(date).toLocaleString();
		},
	},
};
</script>

<style lang="css" scoped>
.profile-item {
	padding: 1rem;
	text-align: left;
}
</style>

<template>
	<div class="profiles-wrapper">
		<div v-for="profile in profiles" :key="profile.id.value">
			<profile :profile="profile"></profile>
		</div>
	</div>
</template>

<script>
import Profile from '@/components/Profile.vue';

export default {
	props: ['profiles'],
	name: 'profiles',
	components: { Profile },
	methods: {
		formatDate(date) {
			return new Date(date).toLocaleString();
		},
	},
};
</script>

<style lang="css" scoped>
.profiles-wrapper {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	grid-gap: 10px;
	margin-top: 2rem;
}
</style>

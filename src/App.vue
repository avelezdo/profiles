<template>
	<v-app>
		<v-app-bar app light>
			<v-btn text to="/" color="primary" class="mr-2">Home</v-btn>
			<v-btn text to="/favorites" color="primary">Favoritos</v-btn>
		</v-app-bar>
		<v-main class="px-4">
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',

	data: () => ({
		//
	}),
};
</script>

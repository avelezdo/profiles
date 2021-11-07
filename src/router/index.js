import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/favorites',
		name: 'FavoritesView',
		component: function () {
			return import(/* webpackChunkName: "profile" */ '../views/FavoritesView.vue');
		},
	},
	{
		path: '/profile/:id',
		name: 'Profile',
		props: true,
		// route level code-splitting
		// this generates a separate chunk (profile.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: function () {
			return import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue');
		},
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;

<template>
	<div>
		<div class="filters">
			<div class="filter d-flex align-center">
				<div class="gender">Género</div>
				<label for="gender-filter--all">Todos</label>
				<input type="radio" v-model="genderFilter" name="gender-filter--all" value="all" checked />
				<label for="gender-filter--female">Femenino</label>
				<input type="radio" v-model="genderFilter" name="gender-filter--female" value="female" />
				<label for="gender-filter--male">Masculino</label>
				<input type="radio" v-model="genderFilter" name="gender-filter--male" value="male" />
			</div>
			<div class="filter">
				<v-text-field v-model="natFilter" label="Nacionalidad" hide-details="auto"></v-text-field>
			</div>
			<div class="filter">
				<v-text-field type="number" v-model="ageFilter" label="Edad" hide-details="auto"></v-text-field>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'filters',
	props: ['profiles'],
	computed: {
		getProfiles: function () {
			return this.$store.getters.getProfiles;
		},
	},
	methods: {
		formatDate(date) {
			return new Date(date).toLocaleString();
		},
		emitProfiles(profiles) {
			this.$emit('profilesFiltered', profiles);
		},
	},
	data: function () {
		return {
			genderFilter: 'all',
			ageFilter: null,
			natFilter: '',
		};
	},
	watch: {
		genderFilter: function (genderValue) {
			let profilesToShow = this.getProfiles.filter((p) => p.location.country.toLowerCase().includes(this.natFilter.toLowerCase()));
			profilesToShow = genderValue === 'all' ? profilesToShow : profilesToShow.filter((p) => p.gender.toLowerCase() === genderValue);
			const profiles = profilesToShow.filter((p) => p.dob.age - this.ageFilter > 0);
			this.$emit('profilesFiltered', profiles);
		},
		ageFilter: function (age) {
			let profilesToShow = this.getProfiles.filter((p) => p.location.country.toLowerCase().includes(this.natFilter.toLowerCase()));
			profilesToShow = this.genderFilter === 'all' ? profilesToShow : profilesToShow.filter((p) => p.gender.toLowerCase() === this.genderFilter);
			const profiles = profilesToShow.filter((p) => p.dob.age - age > 0);
			this.$emit('profilesFiltered', profiles);
		},
		natFilter: function (nat) {
			let profilesToShow = this.getProfiles.filter((p) => p.location.country.toLowerCase().includes(nat.toLowerCase()));
			profilesToShow = this.genderFilter === 'all' ? profilesToShow : profilesToShow.filter((p) => p.gender.toLowerCase() === this.genderFilter);
			const profiles = profilesToShow.filter((p) => p.dob.age - this.ageFilter > 0);
			this.$emit('profilesFiltered', profiles);
		},
	},
};
</script>

<style>
.filters {
	max-width: 400px;
	margin-left: auto;
	margin-right: auto;
	margin-top: 2rem;
}
.filter > * {
	margin-left: 0.5rem;
}
.gender {
	margin-right: auto;
}
</style>

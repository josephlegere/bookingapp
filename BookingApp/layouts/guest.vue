<template>
	<v-app dark>

		<v-app-bar
			fixed
			flat
			app
			dense
		>
			<v-toolbar-title v-text="title" />
			<v-spacer />
		</v-app-bar>

		<v-content>
			<v-container>
			<nuxt />
			</v-container>
		</v-content>
		
		<v-footer
			fixed
			app
		>
			<span>&copy; {{ new Date().getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>

<script>

export default {
	name: 'guest-layout',
	data () {
		return {
			title: 'Accounting'
		}
	},
	methods: {
	}
}
</script>

<style>
</style>
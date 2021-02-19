<template>
	<v-form
		v-model="validate"
		ref="form"
	>
        <v-card>
            <v-list-item>
                <v-col cols="12" sm="6" md="3">
                    <v-text-field
                        v-model="email"
                        label="Email"
                        :rules="emailRules"
                    ></v-text-field>
                </v-col>
            </v-list-item>

            <v-list-item>
                <v-col cols="12" sm="6" md="3">
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        :rules="passwordRules"
                    ></v-text-field>
                </v-col>
            </v-list-item>

            <v-list-item>
                <v-btn
                    color="primary"
                    class="mr-4"
                    @click="userSignIn"
                >
                    Sign In
                </v-btn>
            </v-list-item>
        </v-card>
	</v-form>
</template>

<script>
export default {
    layout: 'guest',
	data () {
		return {
			email: '',
			emailRules: [
				v => !!v || 'E-mail is required'
			],
			password: '',
			passwordRules: [
				v => !!v || 'Password is required'
			],
            validate: false
		}
	},
    methods: {
		userSignIn: function(err) {
			this.$refs.form.validate();

			if (this.validate) {
				this.$store
				.dispatch('auth/signInWithEmail', {
					email: this.email,
					password: this.password
				})
                .then(() => {
                    this.$router.push('/');
                })
				.catch(err => {
					console.error(err.message);
                });
			}
        }
    }
}
</script>

<style>

</style>
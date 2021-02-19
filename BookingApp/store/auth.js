export const state = () => ({
	loggeduser: null
});

export const actions = {
	async signInWithEmail({ commit }, access) {
		console.log(access);
		try {
			let { email, password } = access;

			//Login the user
			let res = await this.$axios.post(`http://192.168.100.240:5000/api/v1/auth/login`, {
                email,
                password
            });
			console.log(res.data);

            let { token, id, name, contact, seller_group } = res.data;

			// //Set the user locally
			commit("setUser", { id, name, contact, email, seller_group });
		} catch (err) {
			console.error(err.message);
			throw err;
		}
	},

	async signOut({ commit }) {
		console.log("Log Out");
		// await this.$fire.auth.signOut();
		commit("setUser", null);
	}
};

export const mutations = {
	setUser(state, account) {
		state.loggeduser = account;
	}
};
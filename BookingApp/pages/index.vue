<template>
	<v-row no-gutters="">
		<v-col cols="12">
			<v-card>

				<v-data-table
					class="mb-15"
					v-model="selectBooking"
					:headers="headers"
					:items="bookings"
					item-key="id"
					group-by="date"
					show-select
					show-group-by
				>

					<template v-slot:item.status="{ item }">
						{{ !item.status ? 'Pending' : 'Confirmed' }}
					</template>

					<template v-slot:group.header="{items, isOpen, toggle}">
						<th colspan="8">
							<v-icon @click="toggle">
								{{ isOpen ? 'mdi-minus' : 'mdi-plus' }}
							</v-icon>
							<v-chip color="secondary">
								{{ items[0].date | moment("MMMM Do YYYY, dddd") }}
							</v-chip>
						</th>
					</template>
					
				</v-data-table>
			
				<v-row
                    class="toolbar-container"
                    no-gutters
                >
                    <v-col
                        md="5"
                        class="ml-md-auto"
                    >
                        <v-sheet
                            dark
                            class="form-toolbar">
                            <v-toolbar
                                flat
                                height="60">
                                
                                <v-btn
                                    outlined
                                    @click="confirmReject = true"
                                >
                                    Reject
                                    <v-icon right>mdi-close-circle-outline</v-icon>
                                </v-btn>

                                <v-spacer></v-spacer>
                                
                                <v-btn
                                    outlined
                                    @click="confirmPrint = true"
                                >
                                    Confirm
                                    <v-icon right>mdi-send-circle-outline</v-icon>
                                </v-btn>

                                <!-- Submit Confirm -->
                                <v-dialog
                                    v-model="confirmPrint"
                                    max-width="290"
                                >
                                    <v-card>
                                        <v-card-title class="headline">Confirm Attendance</v-card-title>

                                        <v-card-text>
                                            Are you sure you want to confirm? Check all the details of the bookings before submission.
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn
                                                color="red darken-1"
                                                text
                                                @click="confirmPrint = false"
                                            >
                                                Cancel
                                            </v-btn>

                                            <v-btn
                                                color="primary"
                                                text
                                                @click="confirmBooking"
                                            >
                                                Confirm
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>

                                <!-- Reject -->
                                <v-dialog
                                    v-model="confirmReject"
                                    max-width="290"
                                >
                                    <v-card>
                                        <v-card-title class="headline">Reject Attendance</v-card-title>

                                        <v-card-text>
                                            Are you sure you want to reject? Check all the details of the bookings before rejecting.
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn
                                                color="red darken-1"
                                                text
                                                @click="confirmReject = false"
                                            >
                                                Cancel
                                            </v-btn>

                                            <v-btn
                                                color="primary"
                                                text
                                                @click="rejectBooking"
                                            >
                                                Reject
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>

                            </v-toolbar>
                        </v-sheet>
                    </v-col>
                </v-row>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
    import { mapState } from 'vuex';
    import moment from 'moment';

	export default {
		name: 'Booking-Checker',
		data () {
			return {
				selectBooking: [],
				headers: [
					{ text: 'Date', value: 'date' },
					{
						text: 'Buyer',
						value: 'buyer',
						align: 'start',
						sortable: false
					},
					{ text: 'Slot', value: 'slot' },
					{ text: 'Status', value: 'status' }
                ],
                confirmReject: false,
                confirmPrint: false,
				loggeduser: {}
			}
		},
		methods: {
			async confirmBooking () {
                this.confirmPrint = false;
                console.log('confirm');
                await this.$store.dispatch('bookings/confirm', { seller: this.loggeduser.seller_group, list: this.selectBooking });
                this.selectBooking = [];
            },
            async rejectBooking () {
                this.confirmReject = false; 
                console.log('reject');
                await this.$store.dispatch('bookings/reject', { seller: this.loggeduser.seller_group, list: this.selectBooking });
                this.selectBooking = [];
            }
		},
		computed: {
            ...mapState({
                bookings: state => state.bookings.list,
                // loggeduser: state => state.auth.loggeduser
            })
		},
        async created () {
            this.loggeduser = this.$store.state.auth.loggeduser;
			console.log(this.loggeduser);
            await this.$store.dispatch('bookings/get', { seller: this.loggeduser.seller_group });
        },
		components: {
		}
	}
</script>

<style scoped>
    .toolbar-container {
        width:                  100%;
        position:               fixed;
        z-index:                4;
        bottom:                 35px;
        right:                  0;
    }
    .toolbar-container .col {
        width:                  100%;
    }
    .form-toolbar {
        width:                  100%;
        border-radius:          15px 15px 0 0;
        /* Don't know why border-radius should be repeated for it to work */
        /* Maybe toolbar has a default border-radius of 0, need to override to work */
    }
    .form-toolbar .v-toolbar {
        border-radius:          15px 15px 0 0;
    }
</style>
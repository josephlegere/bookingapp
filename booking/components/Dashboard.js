// Booking List View

import { SERVER_URL } from "@env";

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, View, Text, StyleSheet, FlatList } from 'react-native';
import BookingListItem from './BookingListItem';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard({ navigation }) {
	const [ isLoading, setLoading ] = useState(true);
	// const [ date, setDate ] = useState('');
	// const [ uid, setUid ] = useState('');
	const [ bookings, setBookings ] = useState([]);
	const [ buyer, setBuyer ] = useState({});
	let date = '';
	let userType = 'buyer';

	useEffect(() => {

		// Written this way, because useEffect must return only a function
		// When adding async add another function inside useEffect

		// async function getSellerSlots () {
		// 	try {
		// 		console.log(date);
		// 		let res = await axios.get(`${SERVER_URL}/api/v1/seller?date=${date}`);
				
		// 		console.log(res.data);

		// 	} catch (err) {
		// 		console.error(err);
		// 	}
		// }

		async function getBookings (uid) {
			try {
				console.log(SERVER_URL);
				let res = await axios.get(`${SERVER_URL}/api/v1/booking/${userType}/${uid}`);
				let { data } = res.data;
				
				// console.log(data);
				
				setBookings(data);
				setLoading(false);

			} catch (err) {
				console.error(err);
			}
		}

		async function initialize () {
			try {
				const jsonValue = await AsyncStorage.getItem('@logged_user');
				let userObj = JSON.parse(jsonValue);
				getBookings(userObj.id);
				setBuyer(userObj);
			} catch (err) {
				// error reading value
				console.log(err);
			}
		}

		function setPrams () {
			// setDate('2021-02-14');
			// setUid('6023a0a9bd131879e8cfc8f9');
			// date = '2021-02-14';
			userType = 'buyer';
		}

		// getSellerSlots();
		
		// setDate('2021-02-14');
		// setUid('6023a0a9bd131879e8cfc8f9');

		initialize();
		
    }, []);
    
    return (
        <View style={styles.dashboardContainer}>
			{isLoading
			? (
				<View style={styles.loading}>
                    <ActivityIndicator size='large' />
                </View>
			)
			
			: (
				<View>
					{/* <Button
						title="Booking"
						onPress={() => navigation.navigate('Booking')}
					/> */}
					<Button
						title="Add Booking"
						onPress={() => navigation.navigate('Add Booking')}
					/>

					<FlatList
						data={bookings}
						keyExtractor={(item, index) => index.toString()}
						renderItem={
							({item}) => 
								<BookingListItem booking={item} />
						}
						style={styles.flatlist}
					/>
				</View>
			)}
        </View>
    );
}

const styles = StyleSheet.create({
	dashboardContainer: {
		flex: 1
	},
	loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
	flatlist: {
        marginTop: 30
    },
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	}
});
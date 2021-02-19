// Booking List View

import { SERVER_URL } from "@env";

import React, { useState, useEffect } from 'react';
import { Dimensions, ActivityIndicator, Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

import moment from 'moment';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function BookingAdd({ navigation }) {
	const [ isLoading, setLoading ] = useState(true);
	const [ sellersRef, setSellersRef ] = useState({}); // seller source, contains slots as well
	const [ sellers, setSellers ] = useState([]);
	const [ slots, setSlots ] = useState([{ label: 'Pick A Seller 1st', value: '', untouchable: true }]);
	const [ buyer, setBuyer ] = useState({});
	
	const [ date, setDate ] = useState(moment().format('YYYY-MM-DD HH:mm:SS'));
	const [ mode, setMode ] = useState('date');
	const [ show, setShow ] = useState(false);

	const [ pickSeller, setPickSeller ] = useState(null);
	const [ pickSlot, setPickSlot ] = useState('');

	useEffect(() => {
		console.log(date);

		async function getSellerSlots () {
			try {
				let res = await axios.get(`${SERVER_URL}/api/v1/seller?date=${date}`);
				let { slots } = res.data.data;

				// console.log(slots);
				// console.log(Object.values(slots));

				setSellers(Object.entries(slots).map(elem => {
					let key = elem[0];
					let value = elem[1];

					return { label: key, value: { name: key, id: value.id } };
				}));
				setSellersRef(slots);
				
				setLoading(false);

			} catch (err) {
				console.error(err);
			}
		}

		async function getUser () {
			try {
				const jsonValue = await AsyncStorage.getItem('@logged_user');
				let userObj = JSON.parse(jsonValue);
				setBuyer(userObj);
			} catch (err) {
				// error reading value
				console.log(err);
			}
		}
		
		// function setPrams () {
		// 	date = '2021-02-14';
		// }

		// setPrams();
		
		getSellerSlots();
		getUser();

	}, []);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const showTimepicker = () => {
		showMode('time');
	};

	const prepareSLots = (daySlots) => {
		let _slots = [];
		let _temp = daySlots.forEach(elem => {
			let { day, timings } = elem;
			let _date = moment().day(day).format('YYYY-MM-DD');
			_slots.push({ label: day, value: day, untouchable: true });

			timings.forEach(slot => {
				let { start, end, vacant } = slot;
				let _slot = { label: `${start} - ${end}`, value: `${_date} ${start}`, parent: day };
				
				if (!vacant) _slot.disabled = true;
				
				_slots.push(_slot);
			});
		});

		// console.log(_slots);
		return _slots;
	};

	const submitBooking = async () => {
		
		try {
			if (pickSlot !== '') {
				console.log('Submit Booking');

				
					console.log(pickSeller);
					console.log(pickSlot);
					let res = await axios.post(`${SERVER_URL}/api/v1/booking/add`, {
						buyer,
						seller: pickSeller,
						slot: pickSlot
					});

					console.log(res.data);
				
			}
			else {
				throw 'Please Fill In The Form Before Submission.';
			}
		} catch (err) {
			console.error(err);
		}

	};

    return (
        <View style={{ flex: 1 }}>
			{isLoading
			? (
				<View style={styles.loading}>
                    <ActivityIndicator size='large' />
                </View>
			)
			: (
				<View>
					<Text style={{ fontSize: 20, marginTop: 30 }}>
						Booking
					</Text>

					{/* <View>
						<Button onPress={showDatepicker} title="Show date picker!" />
					</View>
					<View>
						<Button onPress={showTimepicker} title="Show time picker!" />
					</View>
					{show && (
						<DateTimePicker
						testID="dateTimePicker"
						value={date}
						mode={mode}
						is24Hour={true}
						display="default"
						onChange={onChange}
						/>
					)} */}

					<DropDownPicker
						searchable={true}
						searchablePlaceholder="Search for a Seller"
						searchablePlaceholderTextColor="gray"
						searchableError={() => <Text>Not Found</Text>}
						items={sellers}
						defaultValue={pickSeller}
						placeholder='Pick A Seller'
						containerStyle={{ height: 60, marginTop: 40 }}
						style={{ backgroundColor: '#fafafa', zIndex: 999 }}
						itemStyle={{
							justifyContent: 'flex-start',
							
						}}
						dropDownStyle={{ backgroundColor: '#fafafa' }}
						onChangeItem={ item => {
							// console.log(slots);
							console.log(item);
							setPickSeller(item.value);
							setSlots(prepareSLots(sellersRef[item.value.name].slots));
						}}
					/>

					<DropDownPicker
						items={slots}
						defaultValue={pickSlot}
						placeholder='Pick A Slot'
						containerStyle={{ height: 60, marginTop: 40 }}
						style={{ backgroundColor: '#fafafa', zIndex: 999 }}
						itemStyle={{
							justifyContent: 'flex-start',
							
						}}
						dropDownStyle={{ backgroundColor: '#fafafa' }}
						onChangeItem={ item => {
							console.log(item);
							setPickSlot(item.value);
						}}
					/>
					
					{/* <Button
						style={{ marginTop: 100, zIndex: 1 }}
						title="Submit Booking"
						onPress={submitBooking}
					/> */}

					<TouchableOpacity
						style={styles.submitBooking}
						onPress={submitBooking}>
						<View style={{flex: 1, flexDirection: 'row'}}>
							<Text style={{ color: 'white', fontSize: 16 }}>
								Submit Booking
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			)}
        </View>
    );
}

const styles = StyleSheet.create({
	loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
	submitBooking: {
        alignSelf: 'center',
        alignItems: 'center',
        zIndex: 1,
		backgroundColor: 'gray',
		minHeight: 40,
		height: 60,
		width: SCREEN_WIDTH,
		padding: 20,
		position: 'absolute',
		bottom: -345,
		left: 0
	}
});
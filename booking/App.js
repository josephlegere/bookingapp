/**
	 * Sample React Native App
	 * https://github.com/facebook/react-native
	 *
	 * @format
	 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
} from 'react-native';

import {
	Header,
	LearnMoreLinks,
	Colors,
	DebugInstructions,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BookingAdd from './components/BookingAdd';

const App: () => React$Node = () => {

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen
					name="Home"
					component={Dashboard}
					options={{ title: 'Welcome' }}
				/>
				<Stack.Screen name="Add Booking" component={BookingAdd} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: Colors.lighter,
	},
	engine: {
		position: 'absolute',
		right: 0,
	},
	body: {
		backgroundColor: Colors.white,
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: Colors.black,
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
		color: Colors.dark,
	},
	highlight: {
		fontWeight: '700',
	},
	footer: {
		color: Colors.dark,
		fontSize: 12,
		fontWeight: '600',
		padding: 4,
		paddingRight: 12,
		textAlign: 'right',
	},
});

export default App;

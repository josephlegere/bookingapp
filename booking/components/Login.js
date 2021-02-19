import { SERVER_URL } from "@env";

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, TextInput, View, StyleSheet } from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
	const [ isLoading, setLoading ] = useState(true);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	useEffect(() => {

		async function getLoggedUser () {
			try {

				const jsonValue = await AsyncStorage.getItem('@logged_user');
				
				if (jsonValue !== null) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
				}

                setLoading(false);

			} catch (err) {
				// error reading value
				console.log('error');
			}
		}

		getLoggedUser();

	}, []);

    const login = async () => {
        setLoading(true);
        
        try {
            let res = await axios.post(`${SERVER_URL}/api/v1/auth/login`, {
                email,
                password
            });

            let { token, id, name, contact } = res.data;

            await AsyncStorage.setItem('@logged_user', JSON.stringify({ id, name, email, contact }));
            await AsyncStorage.setItem('@logged_token', token);

            setLoading(false);
				
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });

        } catch (err) {
            setLoading(false);
            console.error(err);
        }
    }

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
                    {/* <Text
                        h1
                        h1Style={{ alignSelf: 'center' }}>
                        {'\n\n'}GEMS GO{'\n\n'}
                    </Text> */}
                    
                    <TextInput 
                        label='Email'
                        placeholder='Enter Email'
                        onChangeText={(userEntry) => setEmail(userEntry)}
                    />
                    
                    <TextInput 
                        label='Password'
                        placeholder='Enter Password'
                        secureTextEntry={true}
                        onChangeText={(userPass) => setPassword(userPass)}
                    />
                    
                    <Button title="Login" onPress={() => login()} />

                    {/* <View style={styles.btnContainer}>
                        <Button
                            title='Log In'
                            disabled={this.state.disabled}
                            onPress={this.UserLoginFunction.bind(this)}
                        />
                    </View> */}
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
    }
});
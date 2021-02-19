import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import moment from 'moment';

export default function BookingListItem(props) {

    let { seller, slot, createdAt, confirmed } = props.booking;

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.textWrapper}>
                    <Text style={{ marginBottom: 10 }}>Booking Details</Text>
                    <Text> {moment(slot).format('MMM Do YYYY')} </Text>
                    <Text>Slot: {moment(slot).format('HH:mm:SS')}</Text>
                        <Text style={{ marginBottom: 10 }}>Seller: {seller.name}</Text>
                </View>
                
                <View style={styles.textWrapper}>
                    {/* <View style={styles.colWrapper}>
                        <FlatList
                            data={this.state.am}
                            renderItem={this.renderAM.bind(this)}
                            keyExtractor={this.keyExtractor}
                            listKey={(item, index) => index.toString()}
                        />
                    </View> */}

                    <View style={styles.colWrapper}>
                        <Text style={{ marginBottom: 10 }}>Seller: {seller.name}</Text>
                        {/* <Text>{seller.name}</Text> */}
                    </View>
                </View>

                {/* { this.getOvertime() } */}

                <View style={styles.bookStatus}>
                    <Text>
                        {confirmed ? 'Confirmed' : 'Pending'}
                    </Text>
                </View>

                {/* { this.renderEdit() } */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 15,
        backgroundColor: '#d9f9b1',
        marginBottom: 10
    },
    textWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flex: 1
    },
    colWrapper: {
        flex: 1
    },
    bookStatus: {
        position: 'absolute',
        top: -12,
        right: 10
    },
    editTime: {
        position: 'absolute',
        top: -15,
        right: 10
    }
});
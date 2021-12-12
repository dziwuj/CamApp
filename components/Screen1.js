import { PrivateValueStore } from '@react-navigation/core';
import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { useFonts } from 'expo-font';
import MyButton from './MyButton';

const Screen1 = (props) => {
    let [fontsLoaded] = useFonts({
        'dancing-script': require('../assets/fonts/dancing-script.ttf'),
    });

    return (
        <View style={styles.root}>
            {!fontsLoaded ?
                <ActivityIndicator size="large" />
                :
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignSelf: 'center' }}>
                    <MyButton
                        title="Camera App"
                        titleStyle={styles.title}
                        style={styles.btn}
                        fontSize={90}
                        press={() => {
                            props.navigation.navigate("Photos saved on the device")
                        }}
                    />
                    <Text style={[styles.line, { marginTop: 40 }]}>show gallery pictures</Text>
                    <Text style={styles.line}>take picture with camera</Text>
                    <Text style={styles.line}>save photo on device</Text>
                    <Text style={styles.line}>delete photo from device</Text>
                    <Text style={styles.line}>share photo</Text>
                </View>
            }
        </View>
    )

}


const styles = StyleSheet.create({
    root: {
        backgroundColor: "#512DA8",
        justifyContent: 'center',
        alignItems: 'center',
        flexBasis: '100%'
    },
    header: {
        flex: 2,
        backgroundColor: "#388E3C",
        flexBasis: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        // backgroundColor: "#388E3C",
        height: 'auto',
        width: 'auto',
        alignSelf: 'center',
    },
    title: {
        color: 'white',
        fontFamily: 'dancing-script',
        textAlign: 'center'
    },
    line: {
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // fontFamily: 'dancing-script',
        fontSize: 30
    }
});

export default Screen1

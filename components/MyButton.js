import React, { Component, useState } from 'react'
import { Pressable, Text, View, Switch, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types';
import { useFonts } from 'expo-font';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

const MyButton = (props) => {

    let [fontsLoaded] = useFonts({
        'dancing-script': require('../assets/fonts/dancing-script.ttf'),
    });

    const [isEnabled, setIsEnabled] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    return (
        <View>
            {!fontsLoaded ?
                <ActivityIndicator size="large" /> :
                <Pressable
                    style={[props.style, { justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'row' }]}
                    onPress={props.press}
                >
                    <Text style={[props.titleStyle, { fontSize: props.fontSize }]}> {props.title} </Text>
                    {props.bool != undefined ?
                        <Switch
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        ></Switch>
                        : null}
                </Pressable>
            }
        </View>

    )

}

MyButton.propTypes = {
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.object,
    style: PropTypes.object.isRequired,
    fontSize: PropTypes.number.isRequired,
    bool: PropTypes.bool,
    press: PropTypes.func.isRequired,
};

export default MyButton

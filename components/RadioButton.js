import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
// import { useFonts } from 'expo-font';
import { isEnabled } from "react-native/Libraries/Performance/Systrace";

const RadioButton = (props) => {
    // let [fontsLoaded] = useFonts({
    //     'dancing-script': require('../assets/fonts/dancing-script.ttf'),
    // });

    // const [isEnabled, setIsEnabled] = useState(props.enabled);
    // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    return (
        <View style={styles.round}>
            {props.enabled ? <View style={styles.circle}></View> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    round: {
        display: "flex",
        backgroundColor: "black",
        borderRadius: 1000,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 3,
        margin: 10,
    },
    circle: {
        borderRadius: 1000,
        width: 20,
        height: 20,
        backgroundColor: "white",
    },
});

RadioButton.propTypes = {
    enabled: PropTypes.bool.isRequired,
    // style: PropTypes.object.isRequired,
    // fontSize: PropTypes.number.isRequired,
    // bool: PropTypes.bool,
    // press: PropTypes.func.isRequired,
};

export default RadioButton;

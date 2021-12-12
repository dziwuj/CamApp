import React, { Component, useState, useEffect } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    Button,
} from "react-native";
import PropTypes from "prop-types";
// import { useFonts } from 'expo-font';
import { isEnabled } from "react-native/Libraries/Performance/Systrace";
import RadioButton from "./RadioButton";

const RadioGroup = (props) => {
    // let [fontsLoaded] = useFonts({
    //     'dancing-script': require('../assets/fonts/dancing-script.ttf'),
    // });

    const [chosen, setChosen] = useState("auto");

    useEffect(() => {
        // console.log("chosen: ", chosen);
        // console.log(props.data[0]);
        // setChosen(props.data[0]);
    }, [chosen]);

    useEffect(() => {
        setChosen(props.data[0]);
    }, []);

    const aaa = () => {
        console.log("asgasgsa");
    };

    return (
        // <View style={styles.root}>
        <>
            {/* <Text style={styles.text}>{props.title}</Text> */}
            <View
                style={{
                    height: 400,
                    width: 400,
                    backgroundColor: "green",
                }}
            >
                <TouchableOpacity
                    onPress={() => alert("Simple Button pressed")}
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: "red",
                    }}
                ></TouchableOpacity>
                {/* <Button title="123"></Button> */}
            </View>

            {/* <Text>AAA</Text> */}
            {/* </Button> */}
            {/*{props.data.map((e) => {
                // console.log("aaa");
                return (
                    <TouchableOpacity
                        onPress={() => aaa()}
                        style={{
                            backgroundColor: "green",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <RadioButton enabled={e == chosen ? true : false} />
                        <Text style={styles.text}>{e}</Text>
                    </TouchableOpacity>
                );
            })}*/}
        </>
        // </View>
    );
};

const styles = StyleSheet.create({
    root: {
        margin: 15,
    },
    text: {
        color: "white",
    },
});

RadioGroup.propTypes = {
    color: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    fun: PropTypes.func,
    // style: PropTypes.object.isRequired,
    // fontSize: PropTypes.number.isRequired,
    // bool: PropTypes.bool,
    // press: PropTypes.func.isRequired,
};

export default RadioGroup;

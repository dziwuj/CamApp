import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Animated,
    StyleSheet,
    Text,
    ScrollView,
    Pressable,
    SafeAreaView,
} from "react-native";
import RadioGroup from "./RadioGroup";

// import { Container } from './styles';

const CameraOptions = (props) => {
    const styles = styl(props);
    const slideAnim = useRef(new Animated.Value(props.size.height)).current;
    const [wb, setWb] = useState(props.wb[0]);
    const [ratio, setRatio] = useState(props.ratios[0]);
    const [size, setSize] = useState(props.sizes[0]);

    // console.log(props);

    // let pos = 0;

    // props.hidden ? (pos = 0) : (pos = 500);

    const slideIn = () => {
        // console.log("IN");
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.spring(slideAnim, {
            toValue: 0,
            velocity: 1,
            tension: 0,
            friction: 10,
            useNativeDriver: true,
        }).start();
    };

    const slideOut = () => {
        // console.log("OUT");
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.spring(slideAnim, {
            toValue: props.size.height,
            velocity: 1,
            tension: 0,
            friction: 10,
            useNativeDriver: true,
        }).start();
    };

    // useEffect(() => {
    //     Animated.spring(slideAnim, {
    //         toValue: 0,
    //         velocity: 1,
    //         tension: 0,
    //         friction: 10,
    //         useNativeDriver: true,
    //     }).start();
    // }, [slideAnim]);\

    useEffect(() => {
        console.log(props.wb);
        // console.log(ratio);
        // console.log(size);
    }, [wb, ratio, size]);

    props.hidden ? slideOut() : slideIn();

    return (
        <View>
            <Animated.View // Special animatable View
                style={[
                    styles.animatedView,
                    { transform: [{ translateY: slideAnim }] },
                ]}
            >
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            <RadioGroup
                                title="White Balance"
                                color="white"
                                data={props.wb}
                                fun={(el) => setWb(el)}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Animated.View>
        </View>
    );
};

/* <RadioGroup
                        title="Ratios"
                        color="white"
                        data={props.ratios}
                        fun={(el) => setRatio(el)}
                    />
                    <RadioGroup
                        title="Sizes"
                        color="white"
                        data={props.sizes}
                        fun={(el) => setSize(el)}
                    /> */

const styl = (props) =>
    StyleSheet.create({
        animatedView: {
            position: "absolute",
            bottom: 0,
            left: 0,
            backgroundColor: "black",
            height: props.size.height - 50,
            width: props.size.width / 2,
            opacity: 0.5,
        },
        text: {
            color: "white",
        },
    });

export default CameraOptions;

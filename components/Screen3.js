import { usePermissions } from "@use-expo/permissions";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import React, { useState, useEffect, useRef } from "react";
import {
    Button,
    Linking,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ToastAndroid,
    BackHandler,
    Dimensions,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import CameraOptions from "./CameraOptions";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

const Screen3 = (props) => {
    const [camera, setCamera] = useState(Camera.Constants.Type.back);
    const [permission, askPermission] = usePermissions(Permissions.CAMERA, {
        ask: true,
    });
    const cameraRef = useRef(null);
    const [hidden, sethidden] = useState(true);
    const [ratio, setRatio] = useState("4:3");
    const [ratios, setRatios] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [ready, setReady] = useState(false);

    const WhiteBalance = Object.keys(Camera.Constants.WhiteBalance).map(
        (e) => e
    );
    const FlashMode = Object.keys(Camera.Constants.FlashMode).map((e) => e);

    const getRatios = async () => {
        const ratios = await cameraRef.current.getSupportedRatiosAsync();
        // .then(console.log(ratios));
        setRatios(ratios.map((e) => e));
        // console.log(ratios.map((e) => e));
        // console.log(await ratios);
        return;
    };

    const getSizes = async () => {
        // console.log(ratio);
        const sizes = await cameraRef.current.getAvailablePictureSizesAsync(
            ratio
        );
        setSizes(sizes);
        // console.log(await sizes);

        return;
    };

    const size = {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    };

    const handleBackPress = () => {
        //tutaj wywołanie funkcji odświeżającej gallery, przekazanej w props-ach
        // console.log(props.route.params);
        props.route.params.getGallery;
        //powrót do ekranu poprzedniego
        props.navigation.goBack();
        return true;
    };

    useEffect(async () => {
        // console.log(WhiteBalance);

        // console.log(cameraRef);

        // console.log("ratios: ", ratios);
        // console.log("sizes: ", sizes);

        setReady(true);

        BackHandler.addEventListener("hardwareBackPress", handleBackPress);
        return () => {
            BackHandler.removeEventListener(
                "hardwareBackPress",
                handleBackPress
            );
        };
    }, []);

    // useEffect(() => {
    //     if (cameraRef != null) {
    //         getRatios();
    //         getSizes();
    //     }
    // });

    if (!permission) {
        return null;
    }

    if (permission.status !== "granted") {
        return (
            <View>
                <Text>We need permissions to use the camera</Text>
                {permission?.canAskAgain ? (
                    <Button onPress={askPermission} title="Give permission" />
                ) : (
                    <Button
                        onPress={Linking.openSettings}
                        title="Open app settings"
                    />
                )}
            </View>
        );
    }

    // let cam = {};

    return (
        <View style={{ flex: 1 }}>
            <Camera
                style={{ flex: 1 }}
                ref={(camera) => {
                    cameraRef.current = camera;
                }}
                type={camera}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "transparent",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 0.1,
                            alignSelf: "flex-end",
                            alignItems: "center",
                        }}
                        onPress={() => {
                            setCamera(
                                camera === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                marginBottom: 10,
                                color: "white",
                            }}
                        >
                            Flip
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 0.2,
                            alignSelf: "flex-end",
                            alignItems: "center",
                        }}
                        onPress={async () => {
                            if (cameraRef) {
                                let foto =
                                    await cameraRef.current.takePictureAsync({
                                        skipProcessing: true,
                                    });
                                let asset = await MediaLibrary.createAssetAsync(
                                    foto.uri
                                ); // domyślnie zapisuje w folderze DCIM
                                ToastAndroid.showWithGravity(
                                    "Zapisano zdjęcie",
                                    ToastAndroid.SHORT,
                                    ToastAndroid.CENTER
                                );
                            }
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                marginBottom: 10,
                                color: "white",
                            }}
                        >
                            Take photo
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 0.2,
                            alignSelf: "flex-end",
                            alignItems: "center",
                        }}
                        onPress={() => {
                            sethidden((prevCheck) => !prevCheck);
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                marginBottom: 10,
                                color: "white",
                            }}
                        >
                            Options
                        </Text>
                    </TouchableOpacity>
                </View>
                {cameraRef != null ? (
                    <CameraOptions
                        hidden={hidden}
                        size={size}
                        wb={WhiteBalance}
                        ratios={ratios}
                        sizes={sizes}
                    />
                ) : null}
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: "flex-end",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        color: "white",
    },
});

export default Screen3;

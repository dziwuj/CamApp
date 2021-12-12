import { PrivateValueStore } from "@react-navigation/core";
import React, { Component, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ActivityIndicator,
    Image,
    BackHandler,
} from "react-native";
import MyButton from "./MyButton";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

const Screen4 = (props) => {
    const [loading, setLoading] = useState(false);
    Sharing.isAvailableAsync(true);

    // const del = async (id) => {
    //     await MediaLibrary.deleteAssetsAsync([id]);
    // };

    const styles = styl(props);

    return (
        <View>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <View style={{ marginTop: 20 }}>
                    <View
                        style={
                            props.route.params.photo.height >
                            props.route.params.photo.width
                                ? styles.vertical
                                : styles.horizontal
                        }
                    >
                        <Image
                            style={styles.img}
                            source={{
                                uri: props.route.params.photo.uri,
                            }}
                        />
                        <Text>
                            {props.route.params.photo.width}x
                            {props.route.params.photo.height}
                        </Text>
                    </View>
                    <MyButton
                        title="Share"
                        titleStyle={styles.title}
                        style={styles.btn}
                        fontSize={30}
                        press={() => {
                            Sharing.shareAsync(props.route.params.photo.uri, {
                                dialogTitle: "Select sharing method",
                            });
                        }}
                    />
                    <MyButton
                        title="Delete"
                        titleStyle={styles.title}
                        style={styles.btn}
                        fontSize={30}
                        press={async () => {
                            let path = props.route.params.photo.uri.replace(
                                "///",
                                "//"
                            );
                            // .pop();

                            console.log(props.route.params.photo.uri);
                            console.log(path);

                            const del = await FileSystem.deleteAsync(
                                props.route.params.photo.uri
                            );
                            console.log(del);
                            props.route.params.navigate(
                                "Photos saved on the device"
                            );
                        }}
                    />
                </View>
            )}
        </View>
    );
};

const styl = (props) =>
    StyleSheet.create({
        horizontal: {
            justifyContent: "center",
            alignSelf: "center",
            width: props.route.params.width - 20,
            height: props.route.params.width * 0.7 - 20,
        },
        vertical: {
            justifyContent: "center",
            alignSelf: "center",
            width: props.route.params.width - 20,
            height: props.route.params.width * 1.3 - 20,
        },
        btn: {
            // backgroundColor: "#388E3C",
            height: "auto",
            width: "auto",
            alignSelf: "center",
        },
        title: {
            color: "black",
            textAlign: "center",
        },
        line: {
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            // fontFamily: 'dancing-script',
            fontSize: 30,
        },
        img: {
            height: "100%",
            width: "100%",
        },
    });

export default Screen4;

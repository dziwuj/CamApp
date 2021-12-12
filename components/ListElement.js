import React, { Component, useEffect, useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

const ListElement = (props) => {
    const styl = styles(props);

    useEffect(() => {}, []);

    return (
        <View style={props.grid ? styl.grid : styl.list}>
            <TouchableOpacity
                onPress={() => {
                    if (!props.selected.length) {
                        props.navigation.navigate("Show photo", {
                            photo: props.el,
                            height: props.height,
                            width: props.width,
                            nav: props.navigation,
                        });
                    } else if (props.selected.includes(props.el.id))
                        props.selected = props.setSelected(
                            props.selected.filter((e) => e != props.el.id)
                        );
                    else props.setSelected([...props.selected, props.el.id]);
                }}
                onLongPress={() => {
                    !props.selected.length
                        ? props.setSelected([...props.selected, props.el.id])
                        : null;
                }}
            >
                <ImageBackground
                    source={{
                        uri: props.el.uri,
                    }}
                    style={styl.img}
                >
                    <View
                        style={[
                            styl.over,
                            props.selected.includes(props.el.id)
                                ? { backgroundColor: "green", opacity: 0.5 }
                                : null,
                        ]}
                    >
                        <Text style={styl.text}>{props.el.id}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
};

const styles = (props) =>
    StyleSheet.create({
        img: {
            width: "100%",
            height: "100%",
        },
        over: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            color: "white",
            fontSize: 10,
        },
        grid: {
            overflow: "hidden",
            height: Math.round(props.height / 8),
            width: Math.round(props.width / 6),
            marginBottom: 10,
        },
        list: {
            overflow: "hidden",
            height: Math.round(props.height / 8),
            width: Math.floor(props.width),
            marginBottom: 10,
        },
    });

export default ListElement;

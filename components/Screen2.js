import React, { Component, useEffect, useState } from "react";
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    ImageBackground,
    Dimensions,
    BackHandler,
} from "react-native";
import MyButton from "./MyButton";
import ListElement from "./ListElement";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/native";

const size = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
};

const Screen2 = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [data, setData] = useState([]);
    const [grid, setGrid] = useState(true);
    const [columns, setColumns] = useState("5");
    const [currentPic, setCurrentPic] = useState(0);
    const isFocused = useIsFocused();
    const [selected, setSelected] = useState([]);

    const getGallery = async () => {
        console.log("GET GALLERY");
        setLoading(true);
        const obj = await MediaLibrary.getAssetsAsync({
            first: 100, // ilość pobranych assetów
            mediaType: "photo", // typ pobieranych danych, photo jest domyślne
            sortBy: "creationTime",
        });
        setData(obj.assets);
        // console.log(JSON.stringify(obj.assets, null, 4))
        setLoading(false);
    };

    const confirmDelete = async () => {
        //remove picture in android directory
        await MediaLibrary.deleteAssetsAsync(
            data.find((e) => e.id == currentPic)
        );
        //remove picture in memory
        setData(
            data.filter((item) => {
                return item !== data.find((e) => e.id == currentPic);
            })
        );
    };

    // const remove = async (id) => {
    //     setCurrentPic(id);
    //     await confirmDelete();
    //     props.navigation.navigate("Photos saved on the device");
    // };

    useEffect(() => {
        requestPermission();
    }, []);

    useEffect(() => {
        if (isFocused) {
            getGallery();
        }
        // navigation.setParams({ getGallery: getGallery });
    }, [isFocused]);

    return (
        <View>
            <View style={styles.row}>
                <MyButton
                    title="GRID/LIST"
                    titleStyle={styles.btnTitle}
                    style={styles.btn}
                    fontSize={20}
                    press={async () => {
                        setGrid((prevCheck) => !prevCheck);
                        grid ? setColumns("1") : setColumns("5");
                    }}
                />
                <MyButton
                    title="OPEN CAMERA"
                    titleStyle={styles.btnTitle}
                    style={styles.btn}
                    fontSize={20}
                    press={() => {
                        navigation.navigate("Camera", {
                            // getGallery: () => func,
                        });
                    }}
                />
                <MyButton
                    title="SHOW SELECTED"
                    titleStyle={styles.btnTitle}
                    style={styles.btn}
                    fontSize={20}
                    press={() => {
                        // console.log(selected);
                        alert(selected);
                    }}
                />
            </View>
            <View style={styles.gallery}>
                {loading ? (
                    <ActivityIndicator size="large" color="#388E3C" />
                ) : (
                    // null
                    // <Text>{text}</Text>
                    <FlatList
                        columnWrapperStyle={
                            grid ? { justifyContent: "space-evenly" } : false
                        }
                        data={data}
                        ListEmptyComponent={() => <Text>Empty list</Text>}
                        keyExtractor={(item) => item.id}
                        key={columns}
                        numColumns={columns}
                        renderItem={({ item }) => (
                            <ListElement
                                grid={grid}
                                el={item}
                                width={size.width}
                                height={size.height}
                                navigation={navigation}
                                setSelected={(arr) => {
                                    setSelected(arr);
                                }}
                                selected={selected}
                            />
                        )}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    btn: {
        width: 110,
        height: "auto",
        alignItems: "center",
        // marginLeft: 10,
        // backgroundColor: "#0effee"
    },
    row: {
        justifyContent: "space-evenly",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
    },
    gallery: {
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    btnTitle: {
        textAlign: "center",
    },
});

export default Screen2;

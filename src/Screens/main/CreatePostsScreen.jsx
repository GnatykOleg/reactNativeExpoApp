import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";

import { Header, AddPhoto, CreatePostForm } from "../../Components";

import * as Location from "expo-location";

import { Camera } from "expo-camera";

import { windowDimensions } from "../../services";
export default function PostsScreen({ navigation }) {
  const [photo, setPhoto] = useState(false);
  const [snap, setSnap] = useState(null);
  const [showCamera, setShowCamera] = useState(true);

  const dimensions = windowDimensions();
  const { container } = styles;
  const { camera, iconContainer, cameraTitle, cameraWrapper, photoContainer } =
    stylesCamera;

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     console.log("status", status);
  //     if (status !== "granted") {
  //       return console.log("Permission to access location was denied");
  //     }
  //   })();
  // }, []);

  const takePhoto = async () => {
    try {
      const { uri } = await snap.takePictureAsync();

      // const location = await Location.getCurrentPositionAsync();
      // console.log("Location", location);
      // console.log(uri);
      setShowCamera(false);
      setPhoto(uri);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <View style={container}>
        <View style={cameraWrapper}>
          {photo && (
            <View style={{ ...photoContainer, width: dimensions }}>
              <Image source={{ uri: photo }} style={{ height: 240 }} />
            </View>
          )}

          {showCamera && (
            <Camera ref={setSnap} style={{ ...camera, width: dimensions }}>
              <TouchableOpacity
                onPress={takePhoto}
                activeOpacity={0.8}
                style={iconContainer}
              >
                <Entypo name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </Camera>
          )}

          <TouchableOpacity
            onPress={() => {
              setShowCamera(true);
              setPhoto(false);
            }}
          >
            <Text style={cameraTitle}>
              {photo ? "Change photo" : "Upload photo"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <AddPhoto /> */}
        {/* Это временно без редакса прокидываю фото так как AddPhoto вообще это отдельный компонент */}
        <CreatePostForm navigateTo={navigation} photo={photo} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 32,

    alignItems: "center",

    backgroundColor: "#fff",
  },

  title: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 17,

    color: "#212121",
  },
});

const stylesCamera = StyleSheet.create({
  cameraWrapper: {
    // alignItems: "center",
  },

  camera: {
    justifyContent: "center",
    alignItems: "center",

    height: 240,

    borderRadius: 8,

    backgroundColor: "#E8E8E8",
  },

  cameraTitle: {
    marginTop: 8,
    marginBottom: 32,

    fontFamily: "Roboto-Regular",
    fontStyle: "normal",

    fontSize: 16,

    color: "#BDBDBD",
  },

  iconContainer: {
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",

    width: 60,
    height: 60,
    borderRadius: 50,
  },

  photoContainer: {},
});

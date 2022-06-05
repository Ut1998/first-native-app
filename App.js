import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

import logo from "./assets/logo.png";
import { Platform } from "expo-modules-core";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync;

    if (permissionResult.granted === false) {
      alert("Permission to access camera is not granted");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  const openShareDialogBox = async () => {
    if (Platform.OS === "web") {
      alert("Uh on, sharing isn't available on your platform");
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.text}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
      {selectedImage !== null && (
        <View style={styles.container}>
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.thumbnail}
          />
          <TouchableOpacity onPress={openShareDialogBox} style={styles.button}>
            <Text style={styles.buttonText}>Share this photo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#888",
    fontSize: 18,
    margin: 10,
  },
  logo: {
    width: 305,
    height: 159,
  },
  button: {
    padding: 20,
    backgroundColor: "blue",
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

import * as React from "react";
import { Button, Image, Platform, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as DocumentPicker from "expo-document-picker";
import devConst from "../constants/devConst";

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    document: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Select Document" onPress={this._pickDocument} />

        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />

        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      </View>
    );
  }

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
    if (!result.cancelled) {
      this.setState({ document: result.uri });
      this.handleUploadDocument();
    }
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  handleUploadPhoto = () => {
    const createFormData = (photo, body) => {
      const data = new FormData();

      data.append("photo", {
        name: "Photo1",
        type: "image",
        uri: Platform.OS === "android" ? photo : photo.replace("file://", ""),
      });

      Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
      });

      return data;
    };
    console.log("FETCH BODY");
    console.log(createFormData(this.state.image, { userId: "123" }));
    fetch("http://" + devConst.ip + ":3000/upload/image", {
      method: "POST",
      body: createFormData(this.state.image, { userId: "123" }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("upload succes", response);
        alert("Upload success!");
      })
      .catch((error) => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };

  handleUploadDocument = () => {
    const createFormDataDocument = (doc, body) => {
      const data = new FormData();

      data.append("file", {
        name: "Document1",
        type: "file",
        uri: Platform.os === "android" ? doc : doc.replace("file://", ""),
      });

      Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
      });

      return data;
    };
    fetch("http://172.20.10.7:3000/upload/document", {
      method: "POST",
      body: createFormDataDocument(this.state.document, { userId: "123" }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("upload succes", response);
        alert("Upload success!");
      })
      .catch((error) => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        exif: false,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        this.handleUploadPhoto();
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}

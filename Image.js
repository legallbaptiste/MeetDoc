import React from 'react';
import { Button, Image, View } from 'react-native';
// import { ImagePicker } from 'expo';
import * as ImagePicker from 'expo-image-picker';
export default class ImagePickerExample extends React.Component {
  state = {
    image: [],
  };

  render() {
    // let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Upload une image"
          onPress={this._pickImage}
        />
        {this._renderImages()}
      </View>
    );
  }
  _renderImages() {
    let images = [];
    //let remainder = 4 - (this.state.devices % 4);
    this.state.image.map((item, index) => {
      images.push(
        <Image
          key={index}
          source={{ uri: item }}
          style={{ width: 100, height: 100 }}
        />
      );
    });

    return images;
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({
        image: this.state.image.concat([result.uri]),
      });
    }
  };
}
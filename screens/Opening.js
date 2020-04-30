import React, { Component } from "react";
import PropTypes from "prop-types";

import { StyleSheet, Dimensions, Image } from "react-native";
import { Text, View } from "react-native-animatable";

import CustomButton from "../components/CustomButton";
const { width, height } = Dimensions.get("screen");
import imgLogo from "../assets/images/logo.png";

const IMAGE_WIDTH = width * 0.8;

export default class Opening extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          animation={"bounceIn"}
          duration={1200}
          delay={200}
          ref={(ref) => (this.logoImgRef = ref)}
          style={styles.logoImg}
          source={imgLogo}
        />

        <View animation={"zoomIn"} delay={600} duration={400}>
          <CustomButton
            text={"S'inscrire"}
            onPress={this.props.onCreateAccountPress}
            buttonStyle={styles.createAccountButton}
            textStyle={styles.createAccountButtonText}
          />
        </View>
        <View
          style={styles.separatorContainer}
          animation={"zoomIn"}
          delay={700}
          duration={400}
        >
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{"Ou"}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View animation={"zoomIn"} delay={800} duration={400}>
          <CustomButton
            text={"Se connecter"}
            onPress={this.props.onSignInPress}
            buttonStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: width * 0.1,
    justifyContent: "center",
  },
  createAccountButton: {
    backgroundColor: "#9B9FA4",
  },
  createAccountButtonText: {
    color: "white",
  },
  separatorContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: "#9B9FA4",
  },
  logoImg: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: "center",
    resizeMode: "contain",
    marginVertical: 30,
  },
  separatorOr: {
    color: "#9B9FA4",
    marginHorizontal: 8,
  },
  signInButton: {
    backgroundColor: "#1976D2",
  },
  signInButtonText: {
    color: "white",
  },
});

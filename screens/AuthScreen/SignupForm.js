import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { StyleSheet,Dimensions } from 'react-native'
import { Text, View } from 'react-native-animatable'

import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
const { width, height } = Dimensions.get('screen');

export default class SignupForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    onSignupPress: PropTypes.func,
    onLoginLinkPress: PropTypes.func
  }

  state = {
    email: '',
    password: '',
    nom: '',
    prenom:'',
    adresse:'',
    tel:'',
  }

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
  }



  render () {
    const { password, nom, email, prenom, adresse, tel } = this.state
    const { isLoading, onLoginLinkPress, onSignupPress, navigation } = this.props
    const isValid = email !== '' && password !== '' && nom !== '' && adresse !== '' && tel !== ''
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => this.formRef = ref}>
          <CustomTextInput
            ref={(ref) => this.mobileInputRef = ref}
            placeholder={'Nom'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.mobileInputRef2.focus()}
            isEnabled={!isLoading}
            onChangeText={(input1) => this.setState({nom : input1})}
            value={this.state.input1}
          />

          <CustomTextInput
            ref={(ref) => this.emailInputRef = ref}
            placeholder={'Email'}
            keyboardType={'email-address'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            isEnabled={!isLoading}
            onChangeText={(input5) => this.setState({email :input5})}
            value={this.state.input5}
          />
          <CustomTextInput
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'Mot de passe'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={() => onSignupPress(email, password, nom)}
              buttonStyle={styles.createAccountButton}
              textStyle={styles.createAccountButtonText}
              text={'S\'inscrire'}
            />
          </View>
          <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.loginLink}
            onPress={onLoginLinkPress}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {'Vous possédez déjà un compte?'}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width * 0.1
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center'
  },
  createAccountButton: {
    backgroundColor: 'white'
  },
  createAccountButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  loginLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})



          // <CustomTextInput
          //   ref={(ref) => this.mobileInputRef2 = ref}
          //   placeholder={'Prénom'}
          //   editable={!isLoading}
          //   returnKeyType={'next'}
          //   blurOnSubmit={false}
          //   withRef={true}
          //   onSubmitEditing={() => this.mobileInputRef3.focus()}
          //   isEnabled={!isLoading}
          //   onChangeText={(input2) => this.setState({prenom :input2})}
          //   value={this.state.input2}
          // />
          // <CustomTextInput
          //   ref={(ref) => this.mobileInputRef3 = ref}
          //   placeholder={'Adresse'}
          //   editable={!isLoading}
          //   returnKeyType={'next'}
          //   blurOnSubmit={false}
          //   withRef={true}
          //   onSubmitEditing={() => this.mobileInputRef4.focus()}
          //   isEnabled={!isLoading}
          //   onChangeText={(input3) => this.setState({adresse : input3})}
          //   value={this.state.input3}
          // />
          // <CustomTextInput
          //   ref={(ref) => this.mobileInputRef4 = ref}
          //   placeholder={'Téléphone'}
          //   editable={!isLoading}
          //   returnKeyType={'next'}
          //   blurOnSubmit={false}
          //   withRef={true}
          //   onSubmitEditing={() => this.emailInputRef.focus()}
          //   isEnabled={!isLoading}
          //   onChangeText={(input4) => this.setState({telephone : input4})}
          //   value={this.state.input4}
          // />
import React from 'react';
import {
    Button,
    StyleSheet,
    View,
    Text,
    Dimensions,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { saveUserToken } from '../reducers/actions';
import CustomButton from '../components/CustomButton'
const { width, height } = Dimensions.get('screen');


class SignInScreen extends React.Component {
    static navigationOptions = {
      header: null,
    };

    render () {
    return (
      <View style={styles.container}>
        <View animation={'zoomIn'} delay={600} duration={400}>
          <CustomButton
            text={'S\'inscrire'}
            onPress={this._signInAsync}
            buttonStyle={styles.createAccountButton}
            textStyle={styles.createAccountButtonText}
          />
        </View>
        <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{'Ou'}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View animation={'zoomIn'} delay={800} duration={400}>
          <CustomButton
            text={'Se connecter'}
            onPress={this._connecter}
            buttonStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
          />
        </View>
      </View>
    )
    }

    _signInAsync = () => {
      console.log(this.props);
        this.props.saveUserToken()
            .then(() => {
                this.props.navigation.navigate('Inscription');
            })
            .catch((error) => {
                this.setState({ error })
            })
    };

    _connecter = () => {
        this.props.saveUserToken()
            .then(() => {
                this.props.navigation.navigate('Connexion');
            })
            .catch((error) => {
                this.setState({ error })
            })
    };
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: "#003f5c"
    },
    createAccountButton: {
      marginHorizontal: width * 0.1,
      backgroundColor: '#9B9FA4'
    },
    createAccountButtonText: {
      color: 'white'
    },
    separatorContainer: {
      marginHorizontal: width * 0.1,
      alignItems: 'center',
      flexDirection: 'row',
      marginVertical: 20
    },
    separatorLine: {
      flex: 1,
      borderWidth: StyleSheet.hairlineWidth,
      height: StyleSheet.hairlineWidth,
      borderColor: '#9B9FA4'
    },
    separatorOr: {
      color: '#9B9FA4',
      marginHorizontal: 8
    },
    signInButton: {
      marginHorizontal: width * 0.1,
      backgroundColor: '#1976D2'
    },
    signInButtonText: {
      color: 'white'
    }

});

const mapStateToProps = state => ({
    token: state.token,
});


const mapDispatchToProps = dispatch => ({
    saveUserToken: () => dispatch(saveUserToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

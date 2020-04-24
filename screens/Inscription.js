import React, { Component } from 'react';
import { Text, Alert, Button, Dimensions,View, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import devConst from "../constants/devConst";
import { setUser } from "../reducers/reducer";
import AwesomeAlert from 'react-native-awesome-alerts';
import CustomButton from '../components/CustomButton'
const { width, height } = Dimensions.get('screen');

class Inscription extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    message:"",
    username: "",
    password: "",
    showAlert: false,
  };


  go = () => {
           const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(this.state.email) === true){
               alert('valid');
           }
           else{
               alert();
           }
  }
  showAlert = () => {
     this.setState({
       showAlert: true
     });
   };

   hideAlert = () => {
     this.setState({
    showAlert: false
  });
};

  async onLogin() {
    try {
			const userFetch = await fetch(
				"http://" + devConst.ip + ":3000/User/"+this.state.username
			);
			const user = await userFetch.json();
      if((this.state.username == user.email) && (this.state.password == user.motDePasse)){
        this.props.setUser(user);
        this.props.navigation.navigate("HomePage");
      } else {
        console.log("Pas le bon mdp ou mail");
        this.showAlert();
      }
		} catch (err) {
			console.log("Erreur avec le fetch ---->  ", err);
		}
  }

  render() {
    const {showAlert} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Adopte ton doc'</Text>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            label='Nom'
            placeholder="Nom"
            placeholderTextColor="#003f5c"
            style={styles.inputText}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            label='Prenom'
            placeholder="Prenom"
            placeholderTextColor="#003f5c"
            style={styles.inputText}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            label='Email'
            placeholder="Email"
            placeholderTextColor="#003f5c"
            style={styles.inputText}
          />
        </View>
          <View style={styles.inputView}>
            <TextInput
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })}
              label='Email'
              placeholder="Email"
              placeholderTextColor="#003f5c"
              style={styles.inputText}
            />
          </View>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            label='Mot de passe'
            placeholder="Mot de passe"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            style={styles.inputText}
          />
        </View>
        <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
          <View style={styles.separatorLine} />
          <View style={styles.separatorLine} />
        </View>
        <View animation={'zoomIn'} delay={800} duration={400}>
          <CustomButton
            text={'Se connecter'}
            onPress={this.onLogin.bind(this)}
            buttonStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
          />

        </View>
        <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Hop hop hop !"
            message="Vous devez rentrer un mail ou un mot de passe valide"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            cancelText="Ok"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.hideAlert();
            }}
          />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#003f5c',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginText:{
    color:"white"
  },
  signInButton: {
    marginHorizontal: width * 0.1,
    backgroundColor: '#1976D2'
  },
  signInButtonText: {
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
});
const moduleState = (state) => ({
	utilisateur: state.medcabs.user,
});

const moduleActions = {
	setUser,
};


export default connect(moduleState, moduleActions)(Inscription);

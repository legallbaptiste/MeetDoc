import React, { Component } from 'react';
import { Text, Alert, Button, ScrollView, Dimensions,View, ActivityIndicator,StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import devConst from "../constants/devConst";
import { setUser,setEtablissement } from "../reducers/reducer";
import AwesomeAlert from 'react-native-awesome-alerts';
import CustomButton from '../components/CustomButton'
import {CheckBox} from "native-base";
import Select2 from "react-native-select-two";

const { width, height } = Dimensions.get('screen');

class Inscription extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    ActivityIndicator_Loading: false,
    nom:"",
    prenom:"",
    username: "",
    password: "",
    numTel:"",
    cartePro: "",
    voie:"",
    numVoie:"",
    ville:"",
    codePostale:"",
    pays:"",
    specialite:"",
    description:"",
    cv:"",
    selectedStatus: false,
    showAlert: false,
    data:[],
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

async componentDidMount() {
  try {
    const etablissementFetch = await fetch(
      "http://" + devConst.ip + ":3000/Etablissement/all"
    );
    const etablissement = await etablissementFetch.json();
    this.props.setEtablissement(etablissement.etablissement);
    console.log("SALUT JE SUIS UN Etablissement");
    console.log(etablissement.etablissement);
  } catch (err) {
    console.log("Erreur avec le fetch ---->  ", err);
  }
}

onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };


inscription(){
  this.setState({ ActivityIndicator_Loading : true }, () =>
  {
    if(!this.state.selectedStatus){
      const bodyRecruteur = {
      user : {
        nom : this.state.nom,
        prenom : this.state.prenom,
        email : this.state.username,
        motDePasse : this.state.password,
        numTel : this.state.numTel,
        cartePro : "lienVersCartePro"
      },
      adresse : {
        voie: this.state.voie,
        numVoie: this.state.numVoie,
        ville: this.state.ville,
        codePostale: this.state.codePostale,
        pays: this.state.pays
      },
      recruteur : {
        specialite : this.state.specialite,
        descriptionLibre : this.state.description,
        idEtablissement : this.state.data[0].toString()
      }
    };
    console.log(bodyRecruteur);
      fetch("http://"+devConst.ip+":3000/user/", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyRecruteur),
      }).then((response) => response.text())
        .then((responseJsonFromServer) =>
            {
                alert(responseJsonFromServer);

                this.setState({ ActivityIndicator_Loading : false });

            }).catch((error) =>
            {
                console.error(error);

                this.setState({ ActivityIndicator_Loading : false});
            });
      console.log("Inscription Recruteur OK");
      this.showAlert();
      this.props.navigation.navigate('SignInScreen');
    }else {
      const bodyRemplacant = {
      user : {
        nom : this.state.nom,
        prenom : this.state.prenom,
        email : this.state.username,
        motDePasse : this.state.password,
        numTel : this.state.numTel,
        cartePro : "lienVersCartePro"
      },
      adresse : {
        voie: this.state.voie,
        numVoie: this.state.numVoie,
        ville: this.state.ville,
        codePostale: this.state.codePostale,
        pays: this.state.pays
      },
      remplacant : {
        specialite : this.state.specialite,
        descriptionLibre : this.state.description,
        cv : this.state.cv
      }
    };
    console.log(bodyRemplacant);
      fetch("http://"+devConst.ip+":3000/user/", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyRemplacant),
      }).then((response) => response.text()).then((responseJsonFromServer) =>
            {

                this.setState({ ActivityIndicator_Loading : false });

            }).catch((error) =>
            {
                console.error(error);

                this.setState({ ActivityIndicator_Loading : false});
            });
      console.log("Inscription Remplacant OK");
      this.showAlert();
      this.props.navigation.navigate('SignInScreen');
    }
  });
}

  render() {
    const listEtablissement=[];

    const {showAlert} = this.state;
    const {etablissement} = this.props;
    const { selectedItems } = this.state;
    const {data} = this.state;
    etablissement.forEach((item, i) => {
      listEtablissement.push({id: item.id , name: item.nomEtablissement})
    });
    return (
      <ScrollView>

      <View style={styles.container}>
        <Text style={styles.logo}>Adopte ton doc'</Text>
        <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{' Informations '}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.nom}
            onChangeText={(nom) => this.setState({ nom })}
            label='Nom'
            placeholder="Nom"
            placeholderTextColor="#003f5c"
            style={styles.inputText}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.prenom}
            onChangeText={(prenom) => this.setState({ prenom })}
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
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            label='Mot de passe'
            placeholder="Mot de passe"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            style={styles.inputText}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.numTel}
            onChangeText={(numTel) => this.setState({ numTel })}
            label='Numéro de téléphone'
            placeholder="Numéro de téléphone"
            placeholderTextColor="#003f5c"
            style={styles.inputText}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.cartePro}
            onChangeText={(cartePro) => this.setState({ cartePro })}
            label='Carte pro'
            placeholder="Carte du médecin"
            placeholderTextColor="#003f5c"
            style={styles.inputText}
          />
        </View>
        <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{' Adresse '}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.numVoie}
            onChangeText={(numVoie) => this.setState({ numVoie })}
            label='Numéro de voie'
            placeholder="Numéro de voie"
            placeholderTextColor="#003f5c"
            style={styles.inputText}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.voie}
            onChangeText={(voie) => this.setState({ voie })}
            label='Voie'
            placeholder="Voie"
            placeholderTextColor="#003f5c"
            style={styles.inputText}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.ville}
            onChangeText={(ville) => this.setState({ ville })}
            label='Ville'
            placeholder="Ville"
            placeholderTextColor="#003f5c"
            style={styles.inputText}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.codePostale}
            onChangeText={(codePostale) => this.setState({ codePostale })}
            label='Code postal'
            placeholder="Code postal"
            placeholderTextColor="#003f5c"
            style={styles.inputText}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.pays}
            onChangeText={(pays) => this.setState({ pays })}
            label='Pays'
            placeholder="Pays"
            placeholderTextColor="#003f5c"
            style={styles.inputText}
          />
        </View>
        <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{' Status '}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View style={styles.item} >
          <CheckBox
            checked={this.state.selectedStatus}
            color="#fb5b5a"
            onPress={() => this.setState({selectedStatus: !this.state.selectedStatus})}
          />
            <Text style={
                {...styles.checkBoxTxt,
                color:this.state.selectedStatus===true?"#fb5b5a":"grey",
                fontWeight:this.state.selectedStatus===true? "bold" :"normal"
              }}>{this.state.selectedStatus === true ? "Vous êtes remplaçant" : "Vous êtes un recruteur"}</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.specialite}
            onChangeText={(specialite) => this.setState({ specialite })}
            label='Specialite'
            placeholder="Sprecialite"
            placeholderTextColor="#003f5c"
            style={styles.inputText}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={this.state.descriptionLibre}
            onChangeText={(descriptionLibre) => this.setState({ descriptionLibre })}
            label='Description'
            placeholder="Description"
            placeholderTextColor="#003f5c"
            style={styles.inputText}
          />
        </View>
        { (this.state.selectedStatus) ?
          (<View style={styles.inputView}>
            <TextInput
              value={this.state.cv}
              onChangeText={(cv) => this.setState({ cv })}
              label='CV'
              placeholder="CV"
              placeholderTextColor="#003f5c"
              style={styles.inputText}
            />
          </View>) : (
            <View style={styles.inputView}>
            <Select2
             isSelectSingle
             colorTheme="#003f5c"
             popupTitle="Choisir votre établissement"
             listEmptyTitle="Il n'y a pas d'établissement"
             title="Choisir votre établissement"
             selectButtonText="Valider"
             cancelButtonText="Annuler"
             data={listEtablissement}
             onSelect={data => {
               this.setState({ data })
             }}
             onRemoveItem={data => {
               this.setState({ data })
             }}
           />
          </View>)

        }

        <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Bravo vous êtes inscris !"
            message="Vous pouvez maintenant vous connecter sur l'application ! "
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


        <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
          <View style={styles.separatorLine} />
          <View style={styles.separatorLine} />
        </View>
        <View animation={'zoomIn'} delay={800} duration={400}>
          <CustomButton
            text={"S'inscrire"}
            onPress={this.inscription.bind(this)}
            buttonStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
          />

        </View>
        {
          this.state.ActivityIndicator_Loading ?
          <ActivityIndicator color='#009688' size='large'style={styles.ActivityIndicatorStyle} /> :
          null
          }

      </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
  backgroundColor: '#003f5c',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  },
  containerSelect: {
        width: '100%', minHeight: 45, borderRadius: 2, paddingHorizontal: 16,
        flexDirection: 'row', alignItems: 'center', borderWidth: 1,
        borderColor: '#cacaca', paddingVertical: 4
  },
  logo:{
    marginTop: "9%",
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"#465881"
  },

    ActivityIndicatorStyle:{

      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'

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
  separatorOr: {
    color: '#9B9FA4',
    marginHorizontal: 8
  },
  item:{
   width:"80%",
   backgroundColor:"#fff",
   borderRadius:20,
   padding:10,
   marginBottom:10,
   flexDirection:"row",
 },
 checkBoxTxt:{
   marginLeft:20
 },
});
const moduleState = (state) => ({
	utilisateur: state.medcabs.user,
  etablissement: state.medcabs.etablissement,
});

const moduleActions = {
	setUser,
  setEtablissement,
};


export default connect(moduleState, moduleActions)(Inscription);

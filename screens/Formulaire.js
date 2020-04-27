import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  Switch,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons, MaterialIcons, Foundation, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { setMedCabs, setEtablissement } from "../reducers/reducer";
import Select2 from "react-native-select-two";

const { width, height } = Dimensions.get('screen');

class Formulaire extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    data:[],
  }


  async componentDidMount() {
    try {
      const etablissementFetch = await fetch(
        "http://" + devConst.ip + ":3000/Etablissement/all"
      );
      const etablissement = await etablissementFetch.json();
      this.props.setEtablissement(etablissement.etablissement);
    } catch (err) {
      console.log("Erreur avec le fetch ---->  ", err);
    }
  }

  ajoutAnnonce(){
    const {utilisateur} = this.props;
    console.log(utilisateur);
    bodyAnnonce = {
      titre: this.state.titre,
      typeOffre: this.state.typeOffre,
      retrocession: this.state.retrocession,
      idEtablissement: this.state.data[0].toString(),
      idRecruteur: utilisateur.id,
      image: "https://loremflickr.com/320/240/medicaloffice?random=1"
    };
    console.log(bodyAnnonce);
    fetch('http://'+devConst.ip+':3000/Annonce/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyAnnonce),
    }).then((response) => response.text())
    .then((responseJsonFromServer) =>
          {
            console.log(responseJsonFromServer);
          }).catch((error) =>
          {
              console.error(error);
          });
    console.log("Ajout annonce OK");
    this.props.navigation.navigate("HomePage");
  }



  renderHeader() {
    const {utilisateur} = this.props;
    console.log("TATATATATATATOTOTOTOTOTOTOTO");
    console.log(utilisateur);
    return (
      <View style={styles.header}>
      <View style={styles.location}>
        <TouchableOpacity
          onPress={() => { this.props.navigation.navigate('HomePage'); }}
        >
          <Ionicons color="white" name="md-arrow-back" size={24} />
        </TouchableOpacity>
      </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Ajout d'une annonce</Text>
        </View>

      </View>
    )
  }

  render() {
    const listEtablissement=[];
    const {data} = this.state;
    const {etablissement} = this.props;

    etablissement.forEach((item, i) => {
      listEtablissement.push({id: item.id , name: item.nomEtablissement})
    });
    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
                <View>
      <View style={{flexDirection:'column', alignItems:'center'}}>
        <TextInput
          placeholder='Titre'
          style={{height: 55, width: 350, fontSize: 15}}
          onChangeText={(titre) => this.setState({titre})}
          value={this.state.titre}
        />

        <TextInput
          placeholder="Type d'offre"
          style={{height: 55, width: 350, fontSize: 15}}
          onChangeText={(typeOffre) => this.setState({typeOffre})}
          value={this.state.typeOffre}
        />

        <TextInput
          placeholder="Retrocession"
          style={{height: 55, width: 350, fontSize: 15}}
          onChangeText={(retrocession) => this.setState({retrocession})}
          value={this.state.retrocession}
        />

        <TextInput
          placeholder='Description'
          style={{height: 55, width: 350, fontSize: 15}}
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}
        />

        <TextInput
          placeholder="Insérer le lien de l'image"
          style={{height: 55, width: 350, fontSize: 15}}
          onChangeText={(image) => this.setState({image})}
          value={this.state.image}
        />
      </View>

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

      <View style={{flexDirection:'row', justifyContent:'center'}}>
      <TouchableOpacity
      style={{
          backgroundColor:'#003f5c', borderRadius:10,
          flex:1, width:100, height:50, margin:20,
          flexDirection:'row', justifyContent:'center',
          alignItems:'center'
          }}
      onPress={this.ajoutAnnonce.bind(this)}
      >
      <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
      Soumettre
      </Text>
      </TouchableOpacity>


      </View>



      </View>
      </SafeAreaView>

    );
  }
}

const moduleState = (state) => ({
    utilisateur: state.medcabs.user,
    annonce: state.medcabs.spots,
    etablissement: state.medcabs.etablissement,
});

const moduleActions = {
    setMedCabs,
    setEtablissement,
};

export default connect(moduleState, moduleActions)(Formulaire);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.1,
    width: width,
    paddingHorizontal: 14,
  },
  section: {
    flexDirection: 'column',
    marginHorizontal: 14,
    marginBottom: 14,
    paddingBottom: 24,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    marginVertical: 14,
  },
  group: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#4287F5',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 14,
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '500',
  },
  active: {
    backgroundColor: '#4287F5',
  },
  activeText: {
    color: '#FFF'
  },
  location: {
		height: 40,
		width: 40,
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#465881",
	},
  first: {
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
  },
  last: {
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
  },
  option: {
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

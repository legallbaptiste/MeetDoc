import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  Button,
  Alert,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Switch,
  Modal,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons, MaterialIcons, Foundation, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import axios from 'axios';
import { setProfil} from '../reducers/reducer';
import Calendar from 'react-native-calendario';

const { width, height } = Dimensions.get('screen');

class Profil extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    modalVisible: false,
  };
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  async componentDidMount() {
    try{
      const profilFetch = await fetch('http://192.168.1.72:3000/Profil');
      const profil = await profilFetch.json();
      this.props.setProfil(profil);
    } catch(err) {
      console.log("Erreur avec le fetch ---->  ", err);
    }
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('HomePage')}>
            <Ionicons name="md-arrow-back" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Profil</Text>
        </View>

      </View>
    )
  }
  renderList() {
    const { filters, medcabs } = this.props;
    const truthyValue = true;

    const DISABLED_DAYS = {
      '2019-11-20': truthyValue,
      '2019-11-11': truthyValue,
    };

    const mapSpots = filters.type === 'all' ? medcabs
      : medcabs.filter(medcab => medcab.type === filters.type);
    return mapSpots.map(
      medcab => {
        return (  <View key={`medcab-${medcab.id}`} style={styles.medcab}>
       <Modal
         animationType="slide"
         transparent={false}
         visible={this.state.modalVisible}
         onRequestClose={() => {
           Alert.alert('Modal has been closed.');
         }}>

         <SafeAreaView style={styles.container}>

          <View style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            height: height * 0.05,
            width: width,
            paddingHorizontal: 14,
          }}>
             <TouchableOpacity onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
               <Ionicons name="md-arrow-back" size={24} />
             </TouchableOpacity>
          </View>

          <View style={styles.headerImage}>
            <ImageBackground
              style={styles.modalImage}
              imageStyle={styles.modalImage}
              source={{ uri: medcab.image }}
            />
          </View>
          <View style={styles.modalBorder}></View>
          <View style={styles.modalTitle}>
            <Text style={styles.modalTitle}>
              {medcab.titre}
              </Text>
            <Text style={styles.modalDescription}>
              {medcab.description}
            </Text>
          </View>
          <View style={styles.modalText}>
            <View style={styles.modalText}>
              <Text style={styles.modalTextSpace}>
                Ouverture : lundi au vendredi
              </Text>
              </View>
            <View style={styles.modalText}>

              <Text style={styles.modalTextSpace}>
                Horraire : 8h-12h30 et 13h30-20h
              </Text>
            </View>

            <View style={styles.modalText}>
              <Text style={styles.modalTextSpace}>
                Qualifications requises : 3 ans d'expérience minimum
              </Text>
            </View>

            <View style={styles.modalText}>
              <Text style={styles.modalTextSpace}>
                Déplacement domicile : Non
              </Text>
            </View>

            <View style={styles.modalText}>
              <Text style={styles.modalTextSpace}>
                Description de l'annonceur : Dr Maboul
              </Text>
            </View>

          </View>
          <View style={styles.modalBorder}></View>

          <Calendar
              onChange={range => console.log(range)}
              locale="fr"
              minDate="2018-04-20"
              startDate="2018-04-30"
              endDate="2018-05-05"
              disabledDays={DISABLED_DAYS}
              theme={THEME}
          />


         </SafeAreaView>
       </Modal>


            <ImageBackground
              style={styles.medcabImage}
              imageStyle={styles.medcabImage}
              source={{ uri: medcab.image }}
            />

            <View style={styles.medcabDetails}>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                  {medcab.titre}
                </Text>
                <Text style={{ fontSize: 12, color: '#A5A5A5', paddingTop: 5 }}>
                  {medcab.description}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.medcabInfo}>
                  <FontAwesome name="star" color="#3C824C" size={12} />
                  <Text style={{ marginLeft: 4, color: '#3C824C' }}>{medcab.rating}</Text>
                </View>
                <View style={styles.medcabInfo}>
                  <FontAwesome name="location-arrow" color="#4287F5" size={12} />
                  <Text style={{ marginLeft: 4, color: '#4287F5' }}>{medcab.distance} miles</Text>
                </View>
                <View style={styles.medcabInfo}>
                  <Ionicons name="md-pricetag" color="black" size={12} />
                  <Text style={{ marginLeft: 4, color: 'black' }}>{medcab.price}</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 0.2, justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(true);
                }}>
                <SimpleLineIcons name="options-vertical" color="#A5A5A5" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        )
      })
  }

  render() {
    console.log("PROPS PROFIL: ");
    console.log(this.props);
    const { profils } = this.props;
    return (
      <SafeAreaView style={styles.container}>
      {this.renderHeader()}
          <View style={styles.header2}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar7.png'}}/>

          <ScrollView style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{profils.nom}</Text>
              <Text style={styles.info}>Type : Remplacant</Text>
              <Text style={styles.info}>Ville : Pau</Text>
              <Text style={styles.info}>Spécialité : Chirugien dentaire</Text>
              <Text style={styles.description}>Description
              </Text>
            </View>
            <View style={styles.Contact}>
              <Text style={styles.contact}> Contacts </Text>
              <Text style={styles.telephone}> +33 688034444</Text>
              <Text style={styles.mail}> michelmedecin@gmail.com </Text>
            </View>
            <View style={styles.Annonces}>
              <Text style={styles.titre}> Mes annonces </Text>

            </View>

            {this.renderList()}
          </ScrollView>

      </SafeAreaView>

    );
  }
}

const moduleState = state => ({
  profils: state.medcabs.profils,
  medcabs: state.medcabs.spots,
  filters: state.medcabs.filters,
});

const moduleActions = {
  setProfil,
}

export default connect(moduleState, moduleActions)(Profil);



const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  header2:{
    backgroundColor: "#3C824C",
  //  height:200,
   flex:1,
  },
 avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  body:{

    flex:2,
  },
  bodyContent: {
    flex: 3,
    alignItems: 'center',
    padding:0,
  },
  name:{
    fontSize:22,
    fontWeight:'600',
    marginTop:49,
    flex:1,
  },
  info:{
    fontSize:16,
    color: "#122e61",
    flex:1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.002,
    width: width*0.5,
    paddingHorizontal: 14,
  },
  description:{
    fontSize:16,
    color: "#696969",
    textAlign: 'center',
    flex:2,
  },


  medcab: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#A5A5A5',
    borderBottomWidth: 0.5,
    padding: 20,
  },
  medcabDetails: {
    flex: 2,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  medcabInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  medcabImage: {
    width: width * 0.30,
    height: width * 0.25,
    borderRadius: 6,
  },

  Contact:{
    flex:1,
    alignItems: 'center',
  },
  contact:{
    fontSize:22,
    color:"#4287F5",
    fontWeight:'600',
  },
  telephone:{
  },
  mail:{
  },

  title: {
    fontSize: 18,
    marginVertical: 14,
  },
  Annonces:{
  },
  titre:{
    fontSize:20,
    color: "#4287F5",
    padding:30,
  },


  Contacter:{
    flex:1,
  },
  bouton:{

  },
  modalImage: {
    width: width,
    height: width*0.50,
  },
  modalBorder: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: '#6d95da',
    borderBottomWidth: 2,
  },
  modalTitle:  {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems:'center',
    justifyContent:'center',
  },
  modalDescription: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    alignItems:'center',
    fontStyle: 'italic',
  },
  modalText: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 14,
    alignItems:'flex-start',
    justifyContent:'center',
  },
  modalTextSpace: {
    marginTop:3,
    marginBottom:3,
  }
});

const THEME: ThemeType = {
  monthTitleTextStyle: {
    color: '#6d95da',
    fontWeight: '300',
    fontSize: 16,
  },
  emptyMonthContainerStyle: {},
  emptyMonthTextStyle: {
    fontWeight: '200',
  },
  weekColumnsContainerStyle: {},
  weekColumnStyle: {
    paddingVertical: 10,
  },
  weekColumnTextStyle: {
    color: '#b6c1cd',
    fontSize: 13,
  },
  nonTouchableDayContainerStyle: {
    backgroundColor: "rgb(24, 74, 111)",
  },
  nonTouchableDayTextStyle: {
    color:"white",

  },
  startDateContainerStyle: {},
  endDateContainerStyle: {},
  dayContainerStyle: {},
  dayTextStyle: {
    color: '#2d4150',
    fontWeight: '200',
    fontSize: 15,
  },
  dayOutOfRangeContainerStyle: {},
  dayOutOfRangeTextStyle: {},
  todayContainerStyle: {},
  todayTextStyle: {
    color: '#6d95da',
  },
  activeDayContainerStyle: {
    backgroundColor: '#6d95da',
  },
  activeDayTextStyle: {
    color: 'white',
  },
  nonTouchableLastMonthDayTextStyle: {},
};

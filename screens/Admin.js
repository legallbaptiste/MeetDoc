import React from "react";
import {
	ImageBackground,
	Platform,
  Image,
	ScrollView,
	StyleSheet,
	Text,
  FlatList,
	TouchableOpacity,
	View,
	Dimensions,
	Aninmated,
	SafeAreaView,
	Modal,
	TextInput,
	RefreshControl,
	Alert,
} from "react-native";
import { connect } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import Calendar from "react-native-calendario";
import { Button } from "react-native-elements";
import { SearchBar } from 'react-native-elements';
import { NavigationEvents } from "react-navigation";

import {
	Ionicons,
	MaterialIcons,
	FontAwesome,
	Foundation,
	SimpleLineIcons,
} from "@expo/vector-icons";

import { setLocation, setFilters, setMedCabs } from "../reducers/reducer";

// Import dev
import devConst from "../constants/devConst";
import styleMap from "../constants/styleMap";
const { width, height } = Dimensions.get("screen");



export default class Admin extends React.Component {

	static navigationOptions = {
		header: null,
	};

  constructor(props){
        super(props);
				const listUser = [
					{
							key:"Jean Michel",
							text: "Medecin Generaliste",
							image: "https://bootdey.com/img/Content/avatar/avatar7.png",
							type: "Remplacant",
					},
					{
							key:"Baptiste Le Gall",
							text: "Urologue",
							image: "https://scontent-cdt1-1.xx.fbcdn.net/v/t31.0-0/p640x640/1026108_695326990483774_1360926662_o.jpg?_nc_cat=105&_nc_sid=cdbe9c&_nc_ohc=_1ulQjDrKqIAX8gpMr_&_nc_ht=scontent-cdt1-1.xx&_nc_tp=6&oh=e19f0f093a464b8500231a4b7a1fa570&oe=5ECBD0B8",
							type: "Remplacant",
					},
					{
							key:"Yeye Disdier",
							text: "Gerontologue",
							image: "https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/295485_255043561187484_790475_n.jpg?_nc_cat=110&_nc_sid=cdbe9c&_nc_ohc=sR4pZpeUEhkAX9yKuRh&_nc_ht=scontent-cdg2-1.xx&oh=af6be56859af9a0221de07fa565fd21f&oe=5ECC13BA",
							type: "Remplacant",
					},
					{
							key:"Maxime Kp",
							text: "Mec Stylé",
							image: "https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/935581_624796954246618_1964892583_n.jpg?_nc_cat=111&_nc_sid=174925&_nc_ohc=0vsFzbor8zUAX-tdEJt&_nc_ht=scontent-cdg2-1.xx&oh=f359bbb5eacd84cb0a12f77d2330c6f6&oe=5ECDCEC2",
							type: "Remplacant",
					},
					{
							key:"Hugues Marti",
							text: "Medecin de kp",
							image: "https://scontent-cdg2-1.xx.fbcdn.net/v/t1.0-9/17373_102574326440948_4374277_n.jpg?_nc_cat=100&_nc_sid=cdbe9c&_nc_ohc=dB-FGupn3E0AX_oVQp0&_nc_ht=scontent-cdg2-1.xx&oh=6d9ccfb130dca0ee6ca65b5abe6bc834&oe=5ECE6303",
							type: "Remplacant",
					},
				];
        this.state = {
					modalVisible: false,
          activeIndex:0,
					selectedData:[],
					search: '',
		      listItems: listUser,
					searchListItems : listUser,

      }
    }

    setModalVisible(visible) {
      this.setState({ modalVisible: visible });
    }

  _selectedItem = (data) => {
    this.setState({ selectedData: data });
    this.setModalVisible(true);
  };

  renderModal(){
    const data = this.state.selectedData;
    return(
    <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {
        this.setModalVisible(!this.state.modalVisible);
      }}
    >

      <SafeAreaView style={styles.container}>
			<ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={{ flex: 2, flexDirection: "row" }}>
              <View style={styles.settings}>
                <View style={styles.location}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <Ionicons color="black" name="md-arrow-back" size={24} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>


          </View>
        </View>

        <View style={styles.headerImage}>
          <ImageBackground
            style={styles.modalImage}
            imageStyle={styles.modalImage}
            source={{ uri: data.image }}
          />
        </View>
        <View style={styles.modalBorder}></View>
        <View style={styles.modalTitle}>
          <Text style={styles.modalText}>{data.key}</Text>
          <Text style={styles.modalTitle}>{data.text}</Text>
        </View>

        <View style={styles.modalText}>
					<View style={styles.modalText}>
						<Text style={styles.modalTextSpace}>
							Type de profil : {data.type}.
						</Text>
					</View>
				  <View style={styles.modalText}>
            <Text style={styles.modalTextSpace}>
              Disponibilités : lundi au vendredi
            </Text>
          </View>

          <View style={styles.modalText}>
            <Text style={styles.modalTextSpace}>
              Qualifications : 3 ans d'expériences
            </Text>
          </View>

          <View style={styles.modalText}>
            <Text style={styles.modalTextSpace}>
              Déplacement domicile : Non
            </Text>
          </View>

          <View style={styles.modalText}>
            <Text style={styles.modalTextSpace}>
              Description du postulant : Faut pas respirer la compote, ca fait tousser.
            </Text>
          </View>

        </View>
				<View style={styles.settings}>
					<Button
						buttonStyle={{ backgroundColor: "#B3B6B7", width:150, height:50}}

						title="Voir la carte pro."
						onPress={() => {
							Alert.alert("Carte pro.");
						}}
					/>
				</View>
        <View style={styles.modalBorder}></View>
        <View style={styles.settings}>
          <Button
            buttonStyle={{ backgroundColor: "#4F7942", width:150, height:50}}

            title="Valider le Profil"
            onPress={() => {
              Alert.alert("Le profil a été accepté.");
            }}
          />
          <Button
            buttonStyle={{ backgroundColor: "red", width:150, height:50 }}

            title="Refuser le Profil"
            onPress={() => {
              Alert.alert("Le profil a été refusé.");
            }}
          />
        </View>
				</ScrollView>
      </SafeAreaView>
    </Modal>
    </View>
    );
  }


  _renderItem(item) {
    return(
			<View style={styles.medcab}>
				<ImageBackground
					style={styles.medcabImage}
					imageStyle={styles.medcabImage}
					source={{ uri: item.image }}
				/>

				<View style={styles.medcabDetails}>
					<View
						style={{
							flex: 1,
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						<Text style={{ fontSize: 14, fontWeight: "bold" }}>
							{item.key}
						</Text>
						<Text style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
							{item.text}
						</Text>
					</View>

				</View>
				<View style={{ flex: 0.2, justifyContent: "center" }}>
					<TouchableOpacity
						onPress={() => {
							this._selectedItem(item);
						}}
					>
						<SimpleLineIcons
							name="options-vertical"
							color="#A5A5A5"
							size={24}
						/>
					</TouchableOpacity>
				</View>
			</View>

    );
  }

	updateSearch = search => {
		listSearch = [];
    this.setState({ search: search });
		this.setState({searchListItems:this.state.listItems});

		for (let item of this.state.listItems) {
			name = String(item.key).toLowerCase();
			if (name.includes(search)) {
				listSearch.push(item);
			}
		}
		this.setState({searchListItems:listSearch});

  };



  renderList() {

		return(

        <FlatList
          data={this.state.searchListItems}
          renderItem={({item}) => this._renderItem(item)}
        />
    );
  }


  render() {
		const search  = this.state.search;

    return (
      <View style={styles.container}>
			<SearchBar
			 placeholder="Type Here..."
			 value={search}
			 onChangeText={this.updateSearch}

			/>
			  {this.renderList()}
        {this.renderModal()}

        </View>

    );
  }

}




const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
	settings: {
		alignItems : "center",
		justifyContent : "space-around",
		flexDirection : "row",

	},
	medcab: {
		flex: 1,
		flexDirection: "row",
		borderBottomColor: "#A5A5A5",
		borderBottomWidth: 0.5,
		padding: 20,
	},
	medcabDetails: {
		flex: 2,
		paddingLeft: 20,
		flexDirection: "column",
		justifyContent: "space-around",
	},
	medcabInfo: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 14,
	},
	medcabImage: {
		width: width * 0.3,
		height: width * 0.25,
		borderRadius: 6,
	},
  formContent:{
    flexDirection: 'row',
    marginTop:30,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:45,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    margin:10,
  },
  icon:{
    width:30,
    height:30,
  },
  iconBtnSearch:{
    alignSelf:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  notificationList:{
    marginTop:20,
    padding:10,
  },
  card: {
    height:null,
    paddingTop:10,
    paddingBottom:10,
    marginTop:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth:5,
    marginBottom:20,
  },
  cardContent:{
    flexDirection:'row',
    marginLeft:10,
  },
  imageContent:{
    marginTop:-40,
  },
  tagsContent:{
    marginTop:10,
    flexWrap:'wrap'
  },
  image:{
    width:60,
    height:60,
    borderRadius:30,
  },
  name:{
    fontSize:20,
    fontWeight: 'bold',
    marginLeft:10,
    alignSelf: 'center'
  },
  btnColor: {
    padding:10,
    borderRadius:40,
    marginHorizontal:3,
    backgroundColor: "#eee",
    marginTop:5,
  },
  header2: {
    backgroundColor: "#3C824C",
    //  height:200,
    flex: 1
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  avatarAnnonce: {
    width: 35,
    height: 35,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 1,
    alignSelf: "center",
    marginTop: 1
  },
  body: {
    flex: 3
  },
  bodyContent: {
    flex: 4,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 49,
    flex: 1
  },
  info: {
    fontSize: 16,
    color: "#122e61",
    flex: 1
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.05,
    width: width,
    paddingHorizontal: 14
  },
  description: {
    fontSize: 16,
    color: "#696969",
    textAlign: "center",
    flex: 2
  },

  Contact: {
    flex: 1,
    alignItems: "center"
  },
  contact: {
    fontSize: 22,
    color: "#4287F5",
    fontWeight: "600"
  },
  telephone: {},
  mail: {},

  title: {
    fontSize: 18,
    marginVertical: 14
  },
  Annonces: {
    justifyContent : 'center',
    flex: 6

  },
  titre: {
    fontSize: 20,
    color: "#4287F5",
    paddingTop: 30,
    paddingBottom: 20
  },

  Contacter: {
    flex: 1
  },
  bouton: {},
  text: {
    color: '#fff',
    fontSize: 15
  },
  modalImage: {
    width: width,
    height: width * 0.5,
  },
  modalBorder: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: "#6d95da",
    borderBottomWidth: 2,
  },
  modalTitle: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  modalDescription: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    alignItems: "center",
    fontStyle: "italic",
  },
  modalText: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 14,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  modalTextSpace: {
    marginTop: 3,
    marginBottom: 3,
  }
});

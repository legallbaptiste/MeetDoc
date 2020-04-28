import React, { Component, useState } from "react";
import {
	ImageBackground,
	ScrollView,
	StyleSheet,
	Linking,
	Image,
	Button,
	Alert,
	Modal,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
	Dimensions,
	SafeAreaView,
	Switch,
	TextInput
} from "react-native";
import Carousel from 'react-native-snap-carousel';

import { connect } from "react-redux";
import {
	Ionicons,
	MaterialIcons,
	Foundation,
	FontAwesome
} from "@expo/vector-icons";
import axios from "axios";
import { setProfil } from "../reducers/reducer";

import devConst from "../constants/devConst";

const { width, height } = Dimensions.get("screen");

class Profil extends Component {
	static navigationOptions = {
		header: null
	};



	constructor(props){
        super(props);

        this.state = {
					modalVisible: false,
          activeIndex:0,
					selectedData:[],
          carouselItems: [
						{
	    Retrocession: 75.5,
	    codePostale: 64000,
	    cv: null,
	    description: "Cabinet du docteur Raoul, spécialisé dans la médecine générale",
	    descriptionLibre: null,
	    email: "remplacant2@eisti.eu",
	    id: 4,
	    image: "https://www.burofacil.fr/public/img/big/bureaux-equipes5aa156dd5c66c.jpg",
	    nom: "LeGall",
	    numTel: "0669696969",
	    numVoie: 13,
	    pays: "France",
	    prenom: "Baptisite",
	    specialite: null,
	    titre: "Cabinet du Dr Raoul",
	    typeOffre: "Plein Temps",
	    ville: "Pau",
	    voie: "Avenue Pierre masse",
	  },
	   {
	    Retrocession: 80.5,
	    codePostale: 64000,
	    cv: null,
	    description: "Cabinet du docteur Maboul, spécialisé en chirugie dentaire",
	    descriptionLibre: null,
	    email: "remplacant@eisti.eu",
	    id: 2,
	    image: "https://be-mydesk.com/img/cms/Articles%20de%20blog/amenagement-cabinet-medical.jpg",
	    nom: "Disdier",
	    numTel: "0645681890",
	    numVoie: 13,
	    pays: "France",
	    prenom: "Yéyé",
	    specialite: null,
	    titre: "Cabinet du Dr Maboul",
	    typeOffre: "Plein Temps",
	    ville: "Pau",
	    voie: "Avenue Pierre masse",
	  },
	  {
	    Retrocession: 80.5,
	    codePostale: 64000,
	    cv: null,
	    description: "Cabinet du docteur Maboul, spécialisé en chirugie dentaire",
	    descriptionLibre: null,
	    email: "remplacant@eisti.eu",
	    id: 2,
	    image: "https://be-mydesk.com/img/cms/Articles%20de%20blog/amenagement-cabinet-medical.jpg",
	    nom: "Disdier",
	    numTel: "0645681890",
	    numVoie: 13,
	    pays: "France",
	    prenom: "Yéyé",
	    specialite: null,
	    titre: "Cabinet du Dr Maboul",
	    typeOffre: "Plein Temps",
	    ville: "Pau",
	    voie: "Avenue Pierre masse",
	  },
        ]
      }
    }

		setModalVisible(visible) {
			this.setState({ modalVisible: visible });
		}

		_selectedItem = (data) => {
			this.setState({ selectedData: data });
			this.setModalVisible(true);
		};


				renderHeader() {
					return (
						<View style={styles.header}>
							<View style={{ flex: 1 }}>
								<TouchableOpacity
									onPress={() => this.props.navigation.navigate("HomePage")}
								>
									<Ionicons name="md-arrow-back" size={24} />
								</TouchableOpacity>
							</View>
							<View style={{ flex: 1, alignItems: "center" }}>
								<Text style={styles.title}>Profil</Text>
							</View>
						</View>
					);
				}


    _renderItem({item,index}){

        return (
          <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 5,
              height: 250,
              padding: 5,
              marginLeft: 5,
              marginRight: 5,
						}}>
							<Image
								style={styles.avatarAnnonce}
								source={ {uri: item.image} }
							/>
            <Text style={{fontSize: 13}}>{item.nom}</Text>
            <Text style={{fontSize: 10}}>{item.ville}</Text>
						<Button
							style={styles.bouton}
							title="Profil"
							onPress={() => this._selectedItem(item)}
						/>
          </View>

        )
    }

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
											<Ionicons color="white" name="md-arrow-back" size={24} />
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
						<Text style={styles.modalText}>{data.nom}</Text>
						<Text style={styles.modalTitle}>{data.ville}</Text>
					</View>
					<View style={styles.modalText}>
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
					<View style={styles.modalBorder}></View>
					<View style={styles.settings}>
						<Button
							buttonStyle={{ backgroundColor: "#4F7942", color: "white" }}
							icon={{
								name: "check",
								size: 25,
								color: "white",
							}}
							title="Voir le Profil"
							onPress={() => {
								Alert.alert("Affichage page profil complete.");
			        }}
						/>
					</View>
				</SafeAreaView>
			</Modal>
			</View>
			);
		}



	render() {
		const {utilisateur} = this.props;
		console.log(this.state.carouselItems);
		return (
			<SafeAreaView style={styles.container}>
				{this.renderHeader()}
				<View style={styles.header2}></View>
				<Image
					style={styles.avatar}
					source={{ uri: "https://bootdey.com/img/Content/avatar/avatar7.png" }}
				/>

				<View style={styles.body}>
					<View style={styles.bodyContent}>
						<Text style={styles.name}>{utilisateur.nom} {utilisateur.Prenom}</Text>
						<Text style={styles.info}>Type : Remplacant</Text>
						<Text style={styles.info}>Ville : {utilisateur.ville}</Text>
						<Text style={styles.info}>Spécialité : Chirugien dentaire</Text>
						<Text style={styles.description}>{utilisateur.description}</Text>
					</View>
					<View style={styles.Contact}>
						<Text style={styles.contact}> Contacts </Text>
						<Text style={styles.telephone}>Téléphone : {utilisateur.numTel}</Text>
						<Text style={styles.mail}>Email : {utilisateur.email}</Text>
					</View>
					<View style={styles.Annonces}>
						<Text style={styles.titre}> Mes annonces </Text>
						<Carousel
							layout={"default"}
						  ref={ref => this.carousel = ref}
						  data={this.state.carouselItems}
						  sliderWidth={300}
						  itemWidth={120}
						  renderItem={this._renderItem.bind(this)}
						  onSnapToItem = { index => this.setState({activeIndex:index}) } />
					</View>



						{this.renderModal()}



				</View>
			</SafeAreaView>
		);
	}
}

const moduleState = (state) => ({
	utilisateur: state.medcabs.user,
});

const moduleActions = {
};

export default connect(moduleState, moduleActions)(Profil);

const styles = StyleSheet.create({
	container: {
		flex: 1
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

import React, { Component } from "react";
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
	SafeAreaView,
	Switch,
	TextInput
} from "react-native";
import { connect } from "react-redux";
import {
	Ionicons,
	MaterialIcons,
	Foundation,
	FontAwesome
} from "@expo/vector-icons";
import axios from "axios";
import { setProfil } from "../reducers/reducer";

const { width, height } = Dimensions.get("screen");

class Profil extends Component {
	static navigationOptions = {
		header: null
	};

	async componentDidMount() {
		try {
			console.log("ComponentDidMount");
			const profilFetch = await fetch("http://192.168.1.14:3000/Profil");
			const profil = await profilFetch.json();
			console.log(profil);
			this.props.setProfil(profil);
			console.log(this.props);
		} catch (err) {
			console.log("Erreur avec le fetch ---->  ", err);
		}
	}

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

	render() {
		const { profils } = this.props;
		console.log("JE SUIS LE CAMPING");
		console.log(profils);
		console.log("TOTOTOTOTOTOTOTOTOTOTO");
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
						<Text style={styles.name}>
							{profils.id} et {profils.nom}
						</Text>
						<Text style={styles.info}>Type : Remplacant</Text>
						<Text style={styles.info}>Ville : Pau</Text>
						<Text style={styles.info}>Spécialité : Chirugien dentaire</Text>
						<Text style={styles.description}>Description</Text>
					</View>
					<View style={styles.Contact}>
						<Text style={styles.contact}> Contacts </Text>
						<Text style={styles.telephone}> +33 688034444</Text>
						<Text style={styles.mail}> michelmedecin@gmail.com </Text>
					</View>
					<View style={styles.Annonces}>
						<Text style={styles.titre}> Mes annonces </Text>
					</View>
					<View style={styles.Contacter}>
						<Button
							style={styles.bouton}
							title="Contacter"
							onPress={() => Alert.alert("Simple Button pressed")}
						/>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const moduleState = (state) => ({
	profils: state.medcabs.profils
});

const moduleActions = {
	setProfil
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
		flex: 5
	},
	titre: {
		fontSize: 20,
		color: "#4287F5",
		padding: 30
	},

	Contacter: {
		flex: 1
	},
	bouton: {}
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

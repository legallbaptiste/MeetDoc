import React, { Component } from "react";
import {
	ScrollView,
	StyleSheet,
	Linking,
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
import Carousel from 'react-native-snap-carousel';
import AwesomeAlert from 'react-native-awesome-alerts';

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

	constructor(props){
        super(props);

        this.state = {
					showAlert : false,
          activeIndex:0,
          carouselItems: [
          {
              title:"Item 1",
              text: "Text 1",
							image: "https://bootdey.com/img/Content/avatar/avatar7.png",
          },
          {
              title:"Item 2",
              text: "Text 2",
							image: "https://bootdey.com/img/Content/avatar/avatar7.png",
					},
          {
              title:"Item 3",
              text: "Text 3",
							image: "https://bootdey.com/img/Content/avatar/avatar7.png",
          },
          {
              title:"Item 4",
              text: "Text 4",
							image: "https://bootdey.com/img/Content/avatar/avatar7.png",
          },
          {
              title:"Item 5",
              text: "Text 5",
							image: "https://bootdey.com/img/Content/avatar/avatar7.png",
          },
        ]
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

    _renderItem({item,index}){
			console.log("caca");
			console.log(this.state);
			const {showAlert} = this.state;


        return (
          <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 5,
              height: 90,
              padding: 5,
              marginLeft: 5,
              marginRight: 5, }}>
							<Image
								style={styles.avatarAnnonce}
								source={ {uri: item.image} }
							/>
            <Text style={{fontSize: 10}}>{item.title}</Text>
            <Text>{item.text}</Text>
	<View style={styles.Contacter}>
						<Text>I'm AwesomeAlert</Text>
        			<TouchableOpacity onPress={() => {
          			this.showAlert();
        				}}>
          		<View style={styles.button}>
            	<Text style={styles.text}>Try me!</Text>
          		</View>
        		</TouchableOpacity>
						<AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="AwesomeAlert"
          message="I have a message for you!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
				</View>
          </View>

        )
    }

	render() {
		const {utilisateur} = this.props;
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
						  itemWidth={100}
						  renderItem={this._renderItem}
						  onSnapToItem = { index => this.setState({activeIndex:index}) } />
					</View>
					<View style={styles.Contacter}>
						<Button
							style={styles.bouton}
							title="Contacter"
							onPress={() => Alert.alert(profils.nom)}
						/>

					</View>
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
		width: 10,
		height: 10,
		borderColor: "white",
		marginBottom: 1,
		alignSelf: "center",
		position: "absolute",
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
	bouton: {},
	text: {
    color: '#fff',
    fontSize: 15
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

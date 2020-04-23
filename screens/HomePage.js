import React from "react";
import {
	ImageBackground,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Dimensions,
	Aninmated,
	SafeAreaView,
	Modal,
	TextInput,
	Alert,
	Button,
} from "react-native";
import { connect } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import Calendar from "react-native-calendario";

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

const { width, height } = Dimensions.get("screen");

class HomePage extends React.Component {
	static navigationOptions = {
		header: null,
	};
	state = {
		modalVisible: false,
	};

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	async componentDidMount() {
		try {
			const annonceFetch = await fetch(
				"http://" + devConst.ip + ":3000/Annonce"
			);
			console.log("TOTO");
			const annonce = await annonceFetch.json();
			this.props.setMedCabs(annonce);
			console.log("PROPS");
			console.log(this.props);
		} catch (err) {
			console.log("Erreur avec le fetch ---->  ", err);
		}
	}

	handleTab = (tabKey) => {
		this.props.setFilters({ type: tabKey });
	};

	renderHeader() {
		return (
			<View style={styles.headerContainer}>
				<View style={styles.header}>
					<View style={{ flex: 2, flexDirection: "row" }}>
						<View style={styles.settings}>
							<View style={styles.location}>
								<TouchableOpacity
									onPress={() => this.props.navigation.navigate("Profil")}
								>
									<Ionicons name="md-people" size={30} color="white" />
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.options}>
							<Text style={{ fontSize: 12, color: "#A5A5A5", marginBottom: 5 }}>
								Location detecté
							</Text>
							<Text style={{ fontSize: 14, fontWeight: "300" }}>
								Pau, 64000
							</Text>
						</View>
					</View>
					<View>
						<TouchableOpacity
							style={{ marginLeft: 4, marginRight: 10 }}
							onPress={() => this.props.navigation.navigate("Formulaire")}
						>
							<Ionicons name="ios-add" size={24} color="black" />
						</TouchableOpacity>
					</View>
					<View style={styles.settings}>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate("Settings")}
						>
							<Ionicons name="ios-settings" size={24} color="black" />
						</TouchableOpacity>
					</View>
				</View>
				{this.renderTabs()}
			</View>
		);
	}

	renderMap() {
		const medCabMarker = ({ type }) => (
			<View style={[styles.marker, styles[`${type}Marker`]]}>
				{type === "hopital" ? (
					<MaterialIcons name="local-hospital" size={18} color="#FFF" />
				) : (
					<Ionicons name="ios-person-add" size={18} color="#FFF" />
				)}
			</View>
		);
		const { filters, medcabs } = this.props;
		const mapSpots = filters.type === "all"	? medcabs	: medcabs.filter((medcab) => medcab.type === filters.type);

		return (
			<View style={styles.map}>
				<MapView
					style={{ flex: 1, height: height * 0.5, width }}
					showsMyLocationButton
					initialRegion={{
						latitude: 43.319,
						longitude: -0.360603,
						latitudeDelta: 0.03,
						longitudeDelta: 0.03,
					}}
				>
					<Marker coordinate={this.props.mylocation}>
						<View style={styles.myMarker}>
							<View style={styles.myMarkerDot} />
						</View>
					</Marker>

					{mapSpots.map((marker) => (
						<Marker
							key={`marker-${marker.id}`}
							coordinate={marker.latlng}
							description={marker.titre}
						>
							{medCabMarker(marker)}
						</Marker>
					))}
				</MapView>
			</View>
		);
	}

	renderTabs() {
		const { filters } = this.props;

		return (
			<View style={styles.tabs}>
				<View
					style={[styles.tab, filters.type === "all" ? styles.activeTab : null]}
				>
					<Text
						style={[
							styles.tabTitle,
							filters.type === "all" ? styles.activeTabTitle : null,
						]}
						onPress={() => this.handleTab("all")}
					>
						Tout
					</Text>
				</View>
				<View
					style={[
						styles.tab,
						filters.type === "tent" ? styles.activeTab : null,
					]}
				>
					<Text
						style={[
							styles.tabTitle,
							filters.type === "tent" ? styles.activeTabTitle : null,
						]}
						onPress={() => this.handleTab("tent")}
					>
						Remplacement médecin
					</Text>
				</View>
				<View
					style={[
						styles.tab,
						filters.type === "hopital" ? styles.activeTab : null,
					]}
				>
					<Text
						style={[
							styles.tabTitle,
							filters.type === "hopital" ? styles.activeTabTitle : null,
						]}
						onPress={() => this.handleTab("hopital")}
					>
						Cabinet
					</Text>
				</View>
			</View>
		);
	}

	renderList() {
		const { filters, medcabs } = this.props;
		const truthyValue = true;
		console.log("MEDCABS");
		console.log(medcabs);
		const DISABLED_DAYS = {
			"2019-11-20": truthyValue,
			"2019-11-11": truthyValue,
		};

		const mapSpots =
			filters.type === "all"
				? medcabs
				: medcabs.filter((medcab) => medcab.type === filters.type);
		return mapSpots.map((medcab) => {
			return (
				<View key={`medcab-${medcab.id}`} style={styles.medcab}>
					<Modal
						animationType="slide"
						transparent={false}
						visible={this.state.modalVisible}
						onRequestClose={() => {
							Alert.alert("Modal has been closed.");
						}}
					>
						<SafeAreaView style={styles.container}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "flex-start",
									height: height * 0.05,
									width: width,
									paddingHorizontal: 14,
								}}
							>
								<TouchableOpacity
									onPress={() => {
										this.setModalVisible(!this.state.modalVisible);
									}}
								>
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
								<Text style={styles.modalTitle}>{medcab.titre}</Text>
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
								onChange={(range) => console.log(range)}
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
						<View
							style={{
								flex: 1,
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							<Text style={{ fontSize: 14, fontWeight: "bold" }}>
								{medcab.titre}
							</Text>
							<Text style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
								{medcab.description}
							</Text>
						</View>
						<View style={{ flex: 1, flexDirection: "row" }}>
							<View style={styles.medcabInfo}>
								<FontAwesome name="star" color="#3C824C" size={12} />
								<Text style={{ marginLeft: 4, color: "#3C824C" }}>
									{medcab.rating}
								</Text>
							</View>
							<View style={styles.medcabInfo}>
								<FontAwesome name="location-arrow" color="#4287F5" size={12} />
								<Text style={{ marginLeft: 4, color: "#4287F5" }}>
									{medcab.distance} miles
								</Text>
							</View>
							<View style={styles.medcabInfo}>
								<Ionicons name="md-pricetag" color="black" size={12} />
								<Text style={{ marginLeft: 4, color: "black" }}>
									{medcab.price}
								</Text>
							</View>
						</View>
					</View>
					<View style={{ flex: 0.2, justifyContent: "center" }}>
						<TouchableOpacity
							onPress={() => {
								this.setModalVisible(true);
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
		});
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				{this.renderHeader()}
				<ScrollView style={styles.container}>
					{this.renderMap()}
					{this.renderList()}
				</ScrollView>
			</SafeAreaView>
		);
	}
}

const moduleState = (state) => ({
	medcabs: state.medcabs.spots,
	filters: state.medcabs.filters,
	mylocation: state.medcabs.mylocation,
});

const moduleActions = {
	setLocation,
	setMedCabs,
	setFilters,
};

export default connect(moduleState, moduleActions)(HomePage);

const THEME = {
	monthTitleTextStyle: {
		color: "#6d95da",
		fontWeight: "300",
		fontSize: 16,
	},
	emptyMonthContainerStyle: {},
	emptyMonthTextStyle: {
		fontWeight: "200",
	},
	weekColumnsContainerStyle: {},
	weekColumnStyle: {
		paddingVertical: 10,
	},
	weekColumnTextStyle: {
		color: "#b6c1cd",
		fontSize: 13,
	},
	nonTouchableDayContainerStyle: {
		backgroundColor: "rgb(24, 74, 111)",
	},
	nonTouchableDayTextStyle: {
		color: "white",
	},
	startDateContainerStyle: {},
	endDateContainerStyle: {},
	dayContainerStyle: {},
	dayTextStyle: {
		color: "#2d4150",
		fontWeight: "200",
		fontSize: 15,
	},
	dayOutOfRangeContainerStyle: {},
	dayOutOfRangeTextStyle: {},
	todayContainerStyle: {},
	todayTextStyle: {
		color: "#6d95da",
	},
	activeDayContainerStyle: {
		backgroundColor: "#6d95da",
	},
	activeDayTextStyle: {
		color: "white",
	},
	nonTouchableLastMonthDayTextStyle: {},
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	headerContainer: {
		top: 0,
		height: height * 0.15,
		width: width,
	},
	header: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: height * 0.15,
		paddingHorizontal: 14,
	},
	headerImage: {
		top: 0,
		height: height * 0.25,
		width: width,
		alignItems: "center",
		justifyContent: "center",
	},
	location: {
		height: 30,
		width: 30,
		borderRadius: 18,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#4287F5",
	},
	marker: {
		width: 40,
		height: 40,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#FFF",
	},
	hopitalMarker: {
		backgroundColor: "#3C824C",
	},
	tentMarker: {
		backgroundColor: "#4287F5",
	},
	settings: {
		alignItems: "center",
		justifyContent: "center",
	},
	options: {
		flex: 1,
		paddingHorizontal: 14,
	},
	tabs: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "flex-end",
	},
	tab: {
		paddingHorizontal: 14,
		marginHorizontal: 10,
		borderBottomWidth: 3,
		borderBottomColor: "transparent",
	},
	tabTitle: {
		fontWeight: "bold",
		fontSize: 14,
		marginBottom: 10,
	},
	activeTab: {
		borderBottomColor: "#4287F5",
	},
	activeTabTitle: {
		color: "#4287F5",
	},
	map: {
		flex: 1,
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
	myMarker: {
		zIndex: 2,
		width: 60,
		height: 60,
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(51, 83, 251, 0.2)",
	},
	myMarkerDot: {
		width: 12,
		height: 12,
		borderRadius: 12,
		backgroundColor: "#3353FB",
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
	},
});

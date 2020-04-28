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
  RefreshControl,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import Calendar from "react-native-calendario";
import { Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";

import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Foundation,
  SimpleLineIcons,
} from "@expo/vector-icons";

import {
  setLocation,
  setRemplacantAnnonce,
  setFilters,
  setAnnonceUtilisateur,
  setMedCabs,
} from "../reducers/reducer";

// Import dev
import devConst from "../constants/devConst";
import styleMap from "../constants/styleMap";
const { width, height } = Dimensions.get("screen");

class HomePage extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    modalVisible: false,
    selectedData: [],
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _selectedItem = (data) => {
    this.setState({ selectedData: data });
    this.setModalVisible(true);
  };

  async componentDidMount() {
    try {
      const annonceFetch = await fetch(
        "http://" + devConst.ip + ":3000/Annonce"
      );
      const annonce = await annonceFetch.json();
      this.props.setMedCabs(annonce);
    } catch (err) {
      console.log("Erreur avec le fetch ---->  ", err);
    }
    const { utilisateur } = this.props;
    try {
      const remplacantAnnonceFetch = await fetch(
        "http://" +
          devConst.ip +
          ":3000/annonce/getRemplacantAnnonce/" +
          utilisateur.id
      );
      const remplacantAnnonce = await remplacantAnnonceFetch.json();
      this.props.setRemplacantAnnonce(remplacantAnnonce.user);
    } catch (err) {
      console.log("Erreur avec le fetch ---->  ", err);
    }
    try {
      const annonceUserFetch = await fetch(
        "http://" +
          devConst.ip +
          ":3000/annonce/getAnnonceRecruteur/" +
          utilisateur.id
      );
      const annonceUser = await annonceUserFetch.json();
      console.log("ANNONCEUSER");
      console.log(annonceUser.user);
      this.props.setAnnonceUtilisateur(annonceUser.user);
    } catch (err) {
      console.log("Erreur avec le fetch ---->  ", err);
    }
  }

  handleTab = (tabKey) => {
    this.props.setFilters({ type: tabKey });
  };

  renderHeader() {
    const { utilisateur } = this.props;

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
                {utilisateur.prenom} {utilisateur.nom}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "300" }}>
                {utilisateur.ville}, {utilisateur.codePostale}
              </Text>
            </View>
          </View>
          {console.log(utilisateur.type === "recruteur")}
          {utilisateur.type === "recruteur" ? (
            <View>
              <Button
                buttonStyle={{ backgroundColor: "#4F7942", height: 40 }}
                onPress={() => this.props.navigation.navigate("Formulaire")}
                icon={{
                  name: "add",
                  size: 25,
                  color: "white",
                }}
                title="Créer une annonce"
              />
            </View>
          ) : (
            <View></View>
          )}
        </View>
      </View>
    );
  }

  renderMap() {
    const medCabMarker = ({ type }) => (
      <View style={[styles.marker, styles.hopitalMarker]}>
        <MaterialIcons name="local-hospital" size={18} color="#FFF" />
      </View>
    );
    const { filters, medcabs } = this.props;
    const mapSpots = medcabs;
    const generatedMapStyle = styleMap.generatedMapStyle;
    return (
      <View style={styles.map}>
        <MapView
          style={{ flex: 1, height: height * 0.5, width }}
          showsMyLocationButton
          provider={MapView.PROVIDER_GOOGLE}
          customMapStyle={generatedMapStyle}
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
              coordinate={{
                latitude: Number(marker.latlng.lat),
                longitude: Number(marker.latlng.lng),
              }}
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
    const medcab = this.state.selectedData;
    const { filters, medcabs } = this.props;
    const truthyValue = true;
    const DISABLED_DAYS = {
      "2019-11-20": truthyValue,
      "2019-11-11": truthyValue,
    };

    const mapSpots = medcabs;
    return mapSpots.map((medcab) => {
      return (
        <View key={`medcab-${medcab.id}`} style={styles.medcab}>
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
                  {medcab.typeOffre}
                </Text>
              </View>
              <View style={styles.medcabInfo}>
                <FontAwesome name="location-arrow" color="#4287F5" size={12} />
                <Text style={{ marginLeft: 4, color: "#4287F5" }}>
                  {medcab.codePostale}, {medcab.ville}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 0.2, justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => {
                this._selectedItem(medcab);
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

  ajoutReservation() {
    const { utilisateur } = this.props;
    const data = this.state.selectedData;
    bodyAnnonce = {
      idAnnonce: data.id.toString(),
      idUser: utilisateur.id.toString(),
    };
    fetch("http://" + devConst.ip + ":3000/Annonce/postuler/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyAnnonce),
    })
      .then((response) => response.text())
      .then((responseJsonFromServer) => {
        console.log(responseJsonFromServer);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("Ajout reservation OK");
    // this.props.navigation.navigate("HomePage");
  }

  renderModal() {
    const { utilisateur } = this.props;
    const data = this.state.selectedData;
    return (
      <Modal
        animationType="slide"
        key={data.id}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
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

              {utilisateur.type === "remplacant" ? (
                <View style={styles.settings}>
                  <Button
                    onPress={this.ajoutReservation.bind(this)}
                    buttonStyle={{ backgroundColor: "#4F7942" }}
                    icon={{
                      name: "check",
                      size: 25,
                      color: "white",
                    }}
                    title="Demander une reservation"
                  />
                </View>
              ) : (
                <View></View>
              )}
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
            <Text style={styles.modalTitle}>{data.titre}</Text>
            <Text style={styles.modalDescription}>{data.description}</Text>
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
        </SafeAreaView>
      </Modal>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        <ScrollView style={styles.container}>
          {this.renderMap()}
          {this.renderList()}
          {this.renderModal()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const moduleState = (state) => ({
  medcabs: state.medcabs.spots,
  filters: state.medcabs.filters,
  mylocation: state.medcabs.mylocation,
  utilisateur: state.medcabs.user,
  annonceUser: state.medcabs.annonceUser,
});

const moduleActions = {
  setLocation,
  setMedCabs,
  setFilters,
  setRemplacantAnnonce,
  setAnnonceUtilisateur,
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
    height: height * 0.1,
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
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#465881",
  },
  location2: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
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
    borderBottomColor: "#465881",
  },
  activeTabTitle: {
    color: "#465881",
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

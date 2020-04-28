import React, { Component } from "react";
import { Card, Icon } from "react-native-elements";
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  View,
  WebView,
} from "react-native";
import { Button } from "react-native-elements";
import PDFReader from "rn-pdf-reader-js";

import PropTypes from "prop-types";
import Carousel from "react-native-snap-carousel";
import mainColor from "../constants/constant";
import { connect } from "react-redux";
import {
  setRemplacantAnnonce,
  setAnnonceUtilisateur,
  updateAnnonce,
} from "../reducers/reducer";

import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Foundation,
  SimpleLineIcons,
} from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");

import Email from "../components/Email";
import Separator from "../components/Separator";
import Tel from "../components/Tel";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

class Profil extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    modalVisible: false,
    modalVisible2: false,
    modalVisible3: false,
    activeIndex: 0,
    dataProfil: [],
    dataAnnonce: [],
  };

  _renderItem({ item, index }) {
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.avatarAnnonce} source={{ uri: item.image }} />
        <Text style={{ fontSize: 18, color: "white", marginTop: 5 }}>
          {item.nom} {item.prenom}
        </Text>
        <Text style={{ fontSize: 13, color: "white", marginTop: 5 }}>
          {item.ville}
        </Text>
        <Button
          buttonStyle={styles.bouton}
          title="Voir le profil"
          onPress={() => this._selectedItem(item)}
        />
      </View>
    );
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setModalVisible2(visible) {
    this.setState({ modalVisible2: visible });
  }

  setModalVisible3(visible) {
    this.setState({ modalVisible3: visible });
  }

  _selectedItem = (data) => {
    this.setState({ dataProfil: data });
    this.setModalVisible(true);
  };
  _selectedItem2 = (data) => {
    console.log("TOTO");
    this.setModalVisible2(true);
  };

  onPressPlace = () => {
    console.log("place");
  };

  onPressTel = (number) => {
    Linking.openURL(`tel://${number}`).catch((err) =>
      console.log("Error:", err)
    );
  };

  onPressSms = () => {
    console.log("sms");
  };

  onPressEmail = (email) => {
    Linking.openURL(
      `mailto://${email}?subject=subject&body=body`
    ).catch((err) => console.log("Error:", err));
  };

  onPressCV = () => {
    console.log("toto");
  };

  renderHeader = () => {
    const { utilisateur } = this.props;

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri:
              "https://orig00.deviantart.net/dcd7/f/2014/027/2/0/mountain_background_by_pukahuna-d73zlo5.png",
          }}
        >
          <View style={styles.headerColumn}>
            <Text style={styles.userNameText}>
              {utilisateur.nom} {utilisateur.prenom}
            </Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={this.onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {utilisateur.ville}, {utilisateur.codePostale}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  desactiverAnnonce() {
    const { annonceUser } = this.props;
    const bodyAnnonce = {
      idAnnonce: annonceUser[0].id.toString(),
      etat: "0",
    };
    fetch("http://" + devConst.ip + ":3000/Annonce/changeEtat", {
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
    this.props.updateAnnonce({ actived: 0 });
    console.log("Changement Etat 0 OK");
    this.setModalVisible2(!this.state.modalVisible2);
  }

  activerAnnonce() {
    const { annonceUser } = this.props;
    const bodyAnnonce = {
      idAnnonce: annonceUser[0].id.toString(),
      etat: "1",
    };
    fetch("http://" + devConst.ip + ":3000/Annonce/changeEtat", {
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
    this.props.updateAnnonce({ actived: 1 });
    console.log("Changement etat 1 OK");
    this.setModalVisible2(!this.state.modalVisible2);
  }

  renderModal() {
    const { utilisateur } = this.props;

    const data = this.state.dataProfil;
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
          <View style={styles.headerContainer2}>
            <View style={styles.header2}>
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

              {utilisateur.type === "recruteur" ? (
                <View style={styles.settings}>
                  <Button
                    onPress={this.ajoutReservation.bind(this)}
                    buttonStyle={{ backgroundColor: "#4F7942" }}
                    icon={{
                      name: "check",
                      size: 25,
                      color: "white",
                    }}
                    title="Accepter le profil"
                  />
                </View>
              ) : (
                <View></View>
              )}
            </View>
          </View>

          <View style={styles.headerImage2}>
            <ImageBackground
              style={styles.modalImage}
              imageStyle={styles.modalImage}
              source={{ uri: data.image }}
            />
          </View>
          <View style={styles.modalBorder}></View>
          <View style={styles.modalTitle}>
            <Text style={styles.modalTitle}>
              {data.nom} {data.prenom}
            </Text>
            <Text style={styles.modalDescription}>{data.specialite}</Text>
          </View>
          <View style={styles.modalText}>
            <View style={styles.modalText}>
              <Text style={styles.modalTextSpace}>Ville : {data.ville}</Text>
            </View>
            <View style={styles.modalText}>
              <Text style={styles.modalTextSpace}>
                Numéro de téléphone : {data.numTel}
              </Text>
            </View>

            <View style={styles.modalText}>
              <Text style={styles.modalTextSpace}>Email : {data.email}</Text>
            </View>

            <View style={styles.modalText}>
              <Button
                buttonStyle={styles.bouton2}
                title="Voir le CV"
                onPress={this.onPressCV}
              />
            </View>
          </View>
          <View style={styles.modalBorder}></View>
        </SafeAreaView>
      </Modal>
    );
  }

  renderTel = () => {
    const { utilisateur } = this.props;
    return (
      <Tel
        key={`tel-${"1"}`}
        index={"1"}
        name={"Mobile"}
        number={utilisateur.numTel}
        onPressSms={this.onPressSms}
        onPressTel={this.onPressTel}
      />
    );
  };

  renderEmail = () => {
    const { utilisateur } = this.props;
    return (
      <Email
        key={`email-${"1"}`}
        index={"1"}
        name={"Email personnel"}
        email={utilisateur.email}
        onPressEmail={this.onPressEmail}
      />
    );
  };
  renderModal3() {
    const { utilisateur } = this.props;
    const data = this.state.dataAnnonce;
    return (
      <Modal
        animationType="slide"
        key={data.id}
        transparent={false}
        visible={this.state.modalVisible3}
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
                        this.setModalVisible3(!this.state.modalVisible3);
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
  renderModal2() {
    const { annonceUser } = this.props;
    const { utilisateur } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible2}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer2}>
            <View style={styles.header2}>
              <View style={{ flex: 2, flexDirection: "row" }}>
                <View style={styles.settings}>
                  <View style={styles.location}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible2(!this.state.modalVisible2);
                      }}
                    >
                      <Ionicons color="white" name="md-arrow-back" size={24} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {annonceUser[0].actived === 1 ? (
                <View style={styles.settings}>
                  <Button
                    onPress={this.desactiverAnnonce.bind(this)}
                    buttonStyle={{ backgroundColor: "#BF0A30" }}
                    icon={{
                      name: "close",
                      size: 25,
                      color: "white",
                    }}
                    title="Désactiver l'annonce"
                  />
                </View>
              ) : (
                <View style={styles.settings}>
                  <Button
                    onPress={this.activerAnnonce.bind(this)}
                    buttonStyle={{ backgroundColor: "#4F7942" }}
                    icon={{
                      name: "check",
                      size: 25,
                      color: "white",
                    }}
                    title="Activer l'annonce"
                  />
                </View>
              )}
            </View>
          </View>

          <View style={styles.headerImage}>
            <ImageBackground
              style={styles.modalImage}
              imageStyle={styles.modalImage}
              source={{ uri: annonceUser[0].image }}
            />
          </View>
          <View style={styles.modalBorder}></View>
          <View style={styles.modalTitle}>
            <Text style={styles.modalTitle}>{annonceUser[0].titre}</Text>
            <Text style={styles.modalDescription}>
              {annonceUser[0].description}
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
        </SafeAreaView>
      </Modal>
    );
  }

  renderAnnonce() {
    const { annonceUser } = this.props;

    return (
      <View style={styles.medcab}>
        <View style={styles.medcabDetails}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {annonceUser[0].titre}
            </Text>
            <Text style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
              {annonceUser[0].description}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.medcabInfo}>
              <FontAwesome name="star" color="#3C824C" size={12} />
              <Text style={{ marginLeft: 4, color: "#3C824C" }}>
                {annonceUser[0].typeOffre}
              </Text>
            </View>
            <View style={styles.medcabInfo}>
              <FontAwesome name="location-arrow" color="#4287F5" size={12} />
              <Text style={{ marginLeft: 4, color: "#4287F5" }}>
                {annonceUser[0].codePostale}, {annonceUser[0].ville}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 0.2, justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => {
              this._selectedItem2(annonceUser[0]);
            }}
          >
            <SimpleLineIcons
              name="options-vertical"
              color="#A5A5A5"
              size={24}
            />
          </TouchableOpacity>
        </View>
        {this.renderModal2()}
        {this.renderModal3()}
      </View>
    );
  }
  renderList() {
    const { remplacantPostule } = this.props;
    return remplacantPostule.map((annonce) => {
      console.log("ANNONCE");
      console.log(annonce);
      return (
        <View key={`medcab-${annonce.id}`} style={styles.medcab}>
          <ImageBackground
            style={styles.medcabImage}
            imageStyle={styles.medcabImage}
            source={{ uri: annonce.image }}
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
                {annonce.titre}
              </Text>
              <Text style={{ fontSize: 12, color: "#A5A5A5", paddingTop: 5 }}>
                {annonce.description}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "col" }}>
              <View style={styles.medcabInfo}>
                <FontAwesome name="star" color="#3C824C" size={12} />
                <Text style={{ marginLeft: 4, color: "#3C824C" }}>
                  {annonce.typeOffre}
                </Text>
              </View>
              <View style={styles.medcabInfo}>
                <FontAwesome name="location-arrow" color="#4287F5" size={12} />
                <Text style={{ marginLeft: 4, color: "#4287F5" }}>
                  {annonce.numVoie} {annonce.voie}
                </Text>
              </View>
              <View style={styles.medcabInfo}>
                <FontAwesome name="location-arrow" color="#4287F5" size={12} />
                <Text style={{ marginLeft: 4, color: "#4287F5" }}>
                  {annonce.codePostale}, {annonce.ville}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    });
  }
  render() {
    const { remplacantAnnonce } = this.props;
    const { utilisateur } = this.props;
    const { remplacantPostule } = this.props;
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.headerContainer2}>
          <View style={styles.header2}>
            <View style={{ flex: 2, flexDirection: "row" }}>
              <View style={styles.settings}>
                <View style={styles.location}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("HomePage");
                    }}
                  >
                    <Ionicons color="white" name="md-arrow-back" size={24} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
            <View style={{ marginTop: 50 }}>
              {this.renderTel()}
              {Separator()}
              {this.renderEmail()}
              {Separator()}
              {utilisateur.type === "recruteur" ? (
                <View>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    Votre annonce :
                  </Text>
                  {this.renderAnnonce()}
                </View>
              ) : (
                <View>
                  <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    Les annonces où vous avez postulé :
                  </Text>
                  {this.renderList()}
                </View>
              )}
            </View>
          </Card>
          {utilisateur.type === "recruteur" ? (
            <View style={styles.container}>
              <View style={{ marginTop: 15 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  Personne ayant postulé à votre annonce :
                </Text>
              </View>
              <View style={{ marginTop: 15 }}>
                <Carousel
                  layout={"stack"}
                  layoutCardOffset={18}
                  ref={(ref) => (this.carousel = ref)}
                  data={remplacantAnnonce}
                  sliderWidth={SLIDER_WIDTH}
                  itemWidth={ITEM_WIDTH}
                  renderItem={this._renderItem.bind(this)}
                  onSnapToItem={(index) =>
                    this.setState({ activeIndex: index })
                  }
                />
              </View>
            </View>
          ) : (
            <View></View>
          )}
          {this.renderModal()}
        </View>
      </ScrollView>
    );
  }
}

const moduleState = (state) => ({
  medcabs: state.medcabs.spots,
  filters: state.medcabs.filters,
  mylocation: state.medcabs.mylocation,
  utilisateur: state.medcabs.user,
  remplacantAnnonce: state.medcabs.remplacantAnnonce,
  annonceUser: state.medcabs.annonceUser,
  remplacantPostule: state.medcabs.remplacantPostule,
});

const moduleActions = {
  setAnnonceUtilisateur,
  updateAnnonce,
};

export default connect(moduleState, moduleActions)(Profil);

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#465881",
    borderWidth: 2,
  },
  text: {
    color: "#fff",
    fontSize: 15,
  },
  modalTextSpace: {
    marginTop: 3,
    marginBottom: 3,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30,
  },
  bouton: {
    marginTop: 10,
    backgroundColor: "#4F7942",
  },
  bouton2: {
    marginTop: 10,
    backgroundColor: "#465881",
  },
  avatarAnnonce: {
    width: 35,
    height: 35,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    marginTop: 1,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer2: {
    top: 0,
    height: height * 0.1,
    width: width,
  },
  header2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.15,
    paddingHorizontal: 14,
  },
  headerImage2: {
    top: 0,
    height: height * 0.25,
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  headerColumn: {
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        alignItems: "center",
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: "center",
      },
    }),
  },
  placeIcon: {
    color: "white",
    fontSize: 26,
  },
  scroll: {
    backgroundColor: "#FFF",
  },
  telContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  userCityRow: {
    backgroundColor: "transparent",
  },
  location: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#465881",
  },
  userCityText: {
    color: "#A5A5A5",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  userImage: {
    borderColor: mainColor,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 8,
    textAlign: "center",
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

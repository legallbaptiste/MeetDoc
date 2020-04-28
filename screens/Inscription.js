import React, { Component } from "react";
import {
	Text,
	Alert,
	Button,
	ScrollView,
	Dimensions,
	View,
	ActivityIndicator,
	StyleSheet,
	Platform,
	TextInput,
} from "react-native";
import { connect } from "react-redux";
import devConst from "../constants/devConst";
import { setUser, setEtablissement } from "../reducers/reducer";
import AwesomeAlert from "react-native-awesome-alerts";
import CustomButton from "../components/CustomButton";
import { CheckBox } from "native-base";
import Select2 from "react-native-select-two";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as DocumentPicker from "expo-document-picker";

const { width, height } = Dimensions.get("screen");

class Inscription extends React.Component {
	static navigationOptions = {
		header: null,
	};

	state = {
		image: null,
		document: null,
		// ActivityIndicator_Loading: false,
		nom: "",
		prenom: "",
		username: "",
		password: "",
		numTel: "",
		cartePro: "",
		voie: "",
		numVoie: "",
		ville: "",
		codePostale: "",
		pays: "",
		specialite: "",
		description: "",
		cv: "",
		showAlert: false,
		data: [],
		typeProfil: "",
		titleChoixProfil: "Choix du profil",
		titleChoixEtablissement: "Choisir votre établissement",
	};

	handleUploadPhoto = () => {
		const createFormData = (photo, body) => {
			const data = new FormData();

			data.append("photo", {
				name: "Photo1",
				type: "image",
				uri: Platform.OS === "android" ? photo : photo.replace("file://", ""),
			});

			Object.keys(body).forEach((key) => {
				data.append(key, body[key]);
			});

			return data;
		};
		console.log(createFormData(this.state.image, { userId: "123" }));
		fetch("http://" + devConst.ip + ":3000/upload/image", {
			method: "POST",
			body: createFormData(this.state.image, { userId: "123" }),
		})
			.then((response) => response.json())
			.then((response) => {
				this.setState({ cartePro: response.file.filename });
				return response;
			})
			.catch((error) => {
				console.log("upload error", error);
			});
	};

	handleUploadDocument = () => {
		const createFormDataDocument = (doc, body) => {
			const data = new FormData();

			data.append("file", {
				name: "Document1",
				type: "file",
				uri: Platform.os === "android" ? doc : doc.replace("file://", ""),
			});

			Object.keys(body).forEach((key) => {
				data.append(key, body[key]);
			});

			return data;
		};
		fetch("http://" + devConst.ip + ":3000/upload/document", {
			method: "POST",
			body: createFormDataDocument(this.state.document, { userId: "123" }),
		})
			.then((response) => response.json())
			.then((response) => {
				console.log("upload succes", response);
				this.setState({ cv: response.file.filename });
			})
			.catch((error) => {
				console.log("upload error", error);
				alert("Upload failed!");
			});
	};

	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== "granted") {
				alert("Sorry, we need camera roll permissions to make this work!");
			}
		}
	};

	_pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});
			if (!result.cancelled) {
				this.setState({ image: result.uri });
				await this.handleUploadPhoto();
			}
		} catch (E) {
			console.log(E);
		}
	};

	_pickDocument = async () => {
		let result = await DocumentPicker.getDocumentAsync({});
		console.log(result);
		if (!result.cancelled) {
			this.setState({ document: result.uri });
			await this.handleUploadDocument();
		}
	};

	go = () => {
		const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (reg.test(this.state.email) === true) {
			alert("valid");
		} else {
			alert();
		}
	};
	showAlert = () => {
		this.setState({
			showAlert: true,
		});
	};

	hideAlert = () => {
		this.setState({
			showAlert: false,
		});
	};

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

	onSelectedItemsChange = (selectedItems) => {
		this.setState({ selectedItems });
	};

	async inscription() {
		// this.setState({ ActivityIndicator_Loading: true }, async () => {
		if (this.state.typeProfil === "recruteur") {
			const bodyRecruteur = {
				user: {
					nom: this.state.nom,
					prenom: this.state.prenom,
					email: this.state.username,
					motDePasse: this.state.password,
					numTel: this.state.numTel,
					cartePro: this.state.cartePro,
				},
				adresse: {
					voie: this.state.voie,
					numVoie: this.state.numVoie,
					ville: this.state.ville,
					codePostale: this.state.codePostale,
					pays: this.state.pays,
				},
				recruteur: {
					specialite: this.state.specialite,
					descriptionLibre: this.state.description,
					idEtablissement: this.state.data[0].toString(),
				},
			};
			fetch("http://" + devConst.ip + ":3000/user/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(bodyRecruteur),
			})
				.then((response) => response.text())
				.then((responseJsonFromServer) => {
					alert(responseJsonFromServer);

					// this.setState({ ActivityIndicator_Loading: false });
				})
				.catch((error) => {
					console.error(error);

					// this.setState({ ActivityIndicator_Loading: false });
				});
			console.log("Inscription Recruteur OK");
			this.showAlert();
			this.props.navigation.navigate("SignInScreen");
		} else {
			const bodyRemplacant = {
				user: {
					nom: this.state.nom,
					prenom: this.state.prenom,
					email: this.state.username,
					motDePasse: this.state.password,
					numTel: this.state.numTel,
					cartePro: this.state.cartePro,
				},
				adresse: {
					voie: this.state.voie,
					numVoie: this.state.numVoie,
					ville: this.state.ville,
					codePostale: this.state.codePostale,
					pays: this.state.pays,
				},
				remplacant: {
					specialite: this.state.specialite,
					descriptionLibre: this.state.description,
					cv: this.state.cv,
				},
			};
			fetch("http://" + devConst.ip + ":3000/user/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(bodyRemplacant),
			})
				.then((response) => response.text())
				.then((responseJsonFromServer) => {
					//this.setState({ ActivityIndicator_Loading: false });
					console.log("responseJsonFromServer", responseJsonFromServer);
				})
				.catch((error) => {
					console.error(error);

					// this.setState({ ActivityIndicator_Loading: false });
				});
			console.log("Inscription Remplacant OK");
			this.showAlert();
			this.props.navigation.navigate("SignInScreen");
		}
	}

	render() {
		const listEtablissement = [];

		const { showAlert } = this.state;
		const { etablissement } = this.props;
		const { selectedItems } = this.state;
		const { data } = this.state;
		etablissement.forEach((item, i) => {
			listEtablissement.push({ id: item.id, name: item.nomEtablissement });
		});
		return (
			<ScrollView>
				<View style={styles.container}>
					<Text style={styles.logo}>Adopte ton doc'</Text>
					<View
						style={styles.separatorContainer}
						animation={"zoomIn"}
						delay={700}
						duration={400}
					>
						<View style={styles.separatorLine} />
						<Text style={styles.separatorOr}>{" Informations "}</Text>
						<View style={styles.separatorLine} />
					</View>
					<View style={styles.inputView}>
						<TextInput
							value={this.state.nom}
							onChangeText={(nom) => this.setState({ nom })}
							label="Nom"
							placeholder="Nom"
							placeholderTextColor="#003f5c"
							style={styles.inputText}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							value={this.state.prenom}
							onChangeText={(prenom) => this.setState({ prenom })}
							label="Prenom"
							placeholder="Prenom"
							placeholderTextColor="#003f5c"
							style={styles.inputText}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							value={this.state.username}
							onChangeText={(username) => this.setState({ username })}
							label="Email"
							placeholder="Email"
							placeholderTextColor="#003f5c"
							style={styles.inputText}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							value={this.state.password}
							onChangeText={(password) => this.setState({ password })}
							label="Mot de passe"
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
							label="Numéro de téléphone"
							placeholder="Numéro de téléphone"
							placeholderTextColor="#003f5c"
							style={styles.inputText}
						/>
					</View>
					<View style={styles.inputView}>
						<Button
							title="Insérer votre carte de médecin"
							onPress={this._pickImage}
						/>
					</View>
					<View
						style={styles.separatorContainer}
						animation={"zoomIn"}
						delay={700}
						duration={400}
					>
						<View style={styles.separatorLine} />
						<Text style={styles.separatorOr}>{" Adresse "}</Text>
						<View style={styles.separatorLine} />
					</View>
					<View style={styles.inputView}>
						<TextInput
							value={this.state.numVoie}
							onChangeText={(numVoie) => this.setState({ numVoie })}
							label="Numéro de voie"
							placeholder="Numéro de voie"
							placeholderTextColor="#003f5c"
							style={styles.inputText}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							value={this.state.voie}
							onChangeText={(voie) => this.setState({ voie })}
							label="Voie"
							placeholder="Voie"
							placeholderTextColor="#003f5c"
							style={styles.inputText}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							value={this.state.ville}
							onChangeText={(ville) => this.setState({ ville })}
							label="Ville"
							placeholder="Ville"
							placeholderTextColor="#003f5c"
							style={styles.inputText}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							value={this.state.codePostale}
							onChangeText={(codePostale) => this.setState({ codePostale })}
							label="Code postal"
							placeholder="Code postal"
							placeholderTextColor="#003f5c"
							style={styles.inputText}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							value={this.state.pays}
							onChangeText={(pays) => this.setState({ pays })}
							label="Pays"
							placeholder="Pays"
							placeholderTextColor="#003f5c"
							style={styles.inputText}
						/>
					</View>
					<View
						style={styles.separatorContainer}
						animation={"zoomIn"}
						delay={700}
						duration={400}
					>
						<View style={styles.separatorLine} />
						<Text style={styles.separatorOr}>{" Status "}</Text>
						<View style={styles.separatorLine} />
					</View>
					<View style={styles.item}>
						<Select2
							isSelectSingle
							colorTheme="#003f5c"
							popupTitle={this.state.titleChoixProfil}
							listEmptyTitle="Il n'y a pas de profil possible"
							title={this.state.titleChoixProfil}
							selectButtonText="Valider"
							cancelButtonText="Annuler"
							searchPlaceHolderText="Rechercher.."
							data={[
								{ id: 1, name: "Médecins remplaçants" },
								{ id: 2, name: "Médecins installées" },
								{ id: 3, name: "Etablisseents de santé" },
								{ id: 4, name: "Collectivités territoriales" },
							]}
							onSelect={(typeProfil) => {
								switch (typeProfil[0]) {
									case 1:
										var titleChoixProfil = "Médecins remplaçants";
										break;
									case 2:
										var titleChoixProfil = "Médecins installées";
										break;
									case 3:
										var titleChoixProfil = "Etablisseents de santé";
										break;
									case 4:
										var titleChoixProfil = "Collectivités territoriales";
										break;
								}
								this.setState({ titleChoixProfil: titleChoixProfil });
								console.log("title ", this.state.titleChoixProfil);
								if (typeProfil[0] == 1) {
									this.setState({ typeProfil: "remplacant" });
								} else {
									this.setState({ typeProfil: "recruteur" });
								}
							}}
							onRemoveItem={(typeProfil) => {
								this.setState({ typeProfil });
							}}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							value={this.state.specialite}
							onChangeText={(specialite) => this.setState({ specialite })}
							label="Specialite"
							placeholder="Specialité"
							placeholderTextColor="#003f5c"
							style={styles.inputText}
						/>
					</View>
					<View style={styles.inputView}>
						<TextInput
							value={this.state.descriptionLibre}
							onChangeText={(descriptionLibre) =>
								this.setState({ descriptionLibre })
							}
							label="Description"
							placeholder="Description"
							placeholderTextColor="#003f5c"
							style={styles.inputText}
						/>
					</View>
					{this.state.typeProfil === "remplacant" ? (
						<View style={styles.inputView}>
							<Button
								title="Selectionner votre CV"
								onPress={this._pickDocument}
							/>
						</View>
					) : (
						<View style={styles.inputView}>
							<Select2
								isSelectSingle
								colorTheme="#003f5c"
								popupTitle={this.state.titleChoixEtablissement}
								listEmptyTitle="Il n'y a pas d'établissement"
								title={this.state.titleChoixEtablissement}
								selectButtonText="Valider"
								cancelButtonText="Annuler"
								searchPlaceHolderText="Rechercher.."
								data={listEtablissement}
								onSelect={(data) => {
									this.setState({
										titleChoixEtablissement:
											listEtablissement[data[0] - 1].name,
									});
									console.log(data);
									this.setState({ data });
								}}
								onRemoveItem={(data) => {
									this.setState({ data });
								}}
							/>
						</View>
					)}

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

					<View
						style={styles.separatorContainer}
						animation={"zoomIn"}
						delay={700}
						duration={400}
					>
						<View style={styles.separatorLine} />
						<View style={styles.separatorLine} />
					</View>
					<View animation={"zoomIn"} delay={800} duration={400}>
						<CustomButton
							text={"S'inscrire"}
							onPress={this.inscription.bind(this)}
							buttonStyle={styles.signInButton}
							textStyle={styles.signInButtonText}
						/>
					</View>
					{/* {this.state.ActivityIndicator_Loading ? (
						<ActivityIndicator
							color="#009688"
							size="large"
							style={styles.ActivityIndicatorStyle}
						/>
					) : null} */}
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#003f5c",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	containerSelect: {
		width: "100%",
		minHeight: 45,
		borderRadius: 2,
		paddingHorizontal: 16,
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#cacaca",
		paddingVertical: 4,
	},
	logo: {
		marginTop: "9%",
		fontWeight: "bold",
		fontSize: 50,
		color: "#fb5b5a",
		marginBottom: 40,
	},
	inputView: {
		width: "80%",
		backgroundColor: "#fff",
		borderRadius: 25,
		height: 50,
		marginBottom: 20,
		justifyContent: "center",
		padding: 20,
	},
	inputText: {
		height: 50,
		color: "#465881",
	},

	ActivityIndicatorStyle: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
	},
	forgot: {
		color: "white",
		fontSize: 11,
	},
	loginText: {
		color: "white",
	},
	signInButton: {
		marginHorizontal: width * 0.1,
		backgroundColor: "#1976D2",
	},
	signInButtonText: {
		color: "white",
	},
	separatorContainer: {
		marginHorizontal: width * 0.1,
		alignItems: "center",
		flexDirection: "row",
		marginVertical: 20,
	},
	separatorLine: {
		flex: 1,
		borderWidth: StyleSheet.hairlineWidth,
		height: StyleSheet.hairlineWidth,
		borderColor: "#9B9FA4",
	},
	separatorOr: {
		color: "#9B9FA4",
		marginHorizontal: 8,
	},
	item: {
		width: "80%",
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 10,
		marginBottom: 10,
		flexDirection: "row",
	},
	checkBoxTxt: {
		marginLeft: 20,
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

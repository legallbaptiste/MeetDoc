import React, { Component } from "react";
import { Text, Alert, Button, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { connect } from "react-redux";
import devConst from "../constants/devConst";
import { setUser } from "../reducers/reducer";

class Connexion extends React.Component {
	state = {
		username: "",
		password: "",
	};

	go = () => {
		const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (reg.test(this.state.email) === true) {
			alert("valid");
		} else {
			alert();
		}
	};

	async api(url) {
		const baseUrl = "http://" + devConst.ip + ":3000/";
		const response = await fetch(baseUrl + url);
		const data = await response.json();
		return data;
	}

	onLogin = (nom, mdp) => {
		try {
			api("/User/" + nom).then((user) => {
				if (username == user.email && mdp == user.motDePasse) {
					console.log("YEYE EST UN FDP");

					this.props.setUser(user);
					this.props.navigation.navigate("HomePage");
				} else {
					console.log("Pas le bon mdp ou mail");
				}
			});
		} catch (err) {
			console.log("Erreur avec le fetch ---->  ", err);
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.inputext}>Sample Login Form</Text>
				<TextInput
					value={this.state.username}
					onChangeText={(username) => this.setState({ username })}
					label="Email"
					style={styles.input}
				/>

				<TextInput
					value={this.state.password}
					onChangeText={(password) => this.setState({ password })}
					label="Password"
					secureTextEntry={true}
					style={styles.input}
				/>

				<Button
					title={"Login"}
					style={styles.input}
					onPress={this.onLogin.bind(this, "recruteur@eisti.eu", "toto")}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#00FFFF",
	},
	input: {
		width: 200,
		height: 44,
		padding: 10,
		borderWidth: 1,
		borderColor: "black",
		marginBottom: 10,
	},
	inputext: {
		width: 200,
		height: 44,
		padding: 10,
		textAlign: "center",
		fontWeight: "bold",
		borderWidth: 1,
		borderColor: "black",
		marginBottom: 10,
	},
});

const moduleState = (state) => ({
	utilisateur: state.medcabs.user,
});

const moduleActions = {
	setUser,
};

export default connect(moduleState, moduleActions)(Connexion);

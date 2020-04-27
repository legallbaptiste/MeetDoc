import React, { Component } from 'react'
import { Card, Icon } from 'react-native-elements'
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import mainColor from '../constants/constant'

import Email from '../components/Email'
import Separator from '../components/Separator'
import Tel from '../components/Tel'

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
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
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
})

class Contact extends Component {
	static navigationOptions = {
		header: null,
	};

  state = {

  }

  onPressPlace = () => {
    console.log('place')
  }

  onPressTel = number => {
    Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
  }

  onPressSms = () => {
    console.log('sms')
  }

  onPressEmail = email => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
      console.log('Error:', err)
    )
  }

  renderHeader = () => {


    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri: "https://orig00.deviantart.net/dcd7/f/2014/027/2/0/mountain_background_by_pukahuna-d73zlo5.png",
          }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
                uri: "https://scontent.fcdg2-1.fna.fbcdn.net/v/t1.0-9/206299_140273562710584_2239187_n.jpg?_nc_cat=111&_nc_sid=cdbe9c&_nc_oc=AQkOH2ujJiCQh0t81p9NI2RUVwwjaVQZ-Xn4JWp6TikQYD_JH9RjOF9gxwdqiwAthgU&_nc_ht=scontent.fcdg2-1.fna&oh=bb7d750cd61a3fa58a785f3be9ddc149&oe=5EC9A6D5",
              }}
            />
            <Text style={styles.userNameText}>Nom</Text>
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
                  Ville, Pays
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  renderTel = () => {

        return (
          <Tel
            key={`tel-${"1"}`}
            index={1}
            name={"Mobile"}
            number={"0629977341"}
            onPressSms={this.onPressSms}
            onPressTel={this.onPressTel}
          />
        )
  }

  renderEmail = () => {
        return (
          <Email
            key={`email-${"1"}`}
            index={1}
            name={"Email personnel"}
            email={"legallbapt@eisti.eu"}
            onPressEmail={this.onPressEmail}
          />
        )
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
						<View style={{marginTop: 50}}>
            {this.renderTel()}
            {Separator()}
            {this.renderEmail()}
						{Separator()}
					</View>

          </Card>
        </View>
      </ScrollView>
    )
  }
}

export default Contact

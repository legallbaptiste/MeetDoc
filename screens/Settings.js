import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  Switch
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons, MaterialIcons, Foundation, FontAwesome } from '@expo/vector-icons';

import { setFilters } from '../reducers/reducer';

const { width, height } = Dimensions.get('screen');

class Settings extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    sort: 'distance',
    type: 'all',
    price: 'free',
    option_full: true,
    option_rated: true,
    option_free: false,
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('HomePage')}>
            <Ionicons name="md-arrow-back" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Filter</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('HomePage')}>
            <Ionicons name="ios-search" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const {
      sort,
      type,
      price,
      option_full,
      option_rated,
      option_free,
    } = this.props.filters;

    const activeType = (key) => type === key;

    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <View>
              <Text style={styles.title}>Trier par</Text>
            </View>
            <View style={styles.group}>
              <TouchableOpacity
                style={[styles.button, styles.first, sort === 'distance' ? styles.active : null]}
                onPress={() => this.props.setFilters({ sort: 'distance' })}
              >
                <Text style={[styles.buttonText, sort === 'distance' ? styles.activeText : null]}>Distance</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, sort === 'ratings' ? styles.active : null]}
                onPress={() => this.props.setFilters({ sort: 'ratings' })}
              >
                <Text style={[styles.buttonText, sort === 'ratings' ? styles.activeText : null]}>Note</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.last, sort === 'reviews' ? styles.active : null]}
                onPress={() => this.props.setFilters({ sort: 'reviews' })}
              >
                <Text style={[styles.buttonText, sort === 'reviews' ? styles.activeText : null]}>Avis</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View>
              <Text style={styles.title}>Recherche</Text>
            </View>
            <View style={styles.group}>
              <TouchableOpacity
                style={[styles.button, styles.first, activeType('all') ? styles.active : null]}
                onPress={() => this.props.setFilters({ type: 'all' })}
              >
                <View style={{ flexDirection: 'row', }}>
                  <MaterialIcons name="local-hospital" size={24} color={activeType('all') ? '#FFF' : '#3C824C' } />
                  <Ionicons name="ios-person-add" size={24} color={activeType('all') ? '#FFF' : '#4287F5' } />
                </View>
                <Text style={[styles.buttonText, activeType('all') ? styles.activeText : null]}>Tous</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, activeType('medecin') ? styles.active : null]}
                onPress={() => this.props.setFilters({ type: 'medecin' })}
              >
                <MaterialIcons name="local-hospital" size={24} color={activeType('medecin') ? '#FFF' : '#4287F5'} />
                <Text style={[styles.buttonText, activeType('medecin') ? styles.activeText : null]}>Remplacement médecin</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.last, activeType('hopital') ? styles.active : null]}
                onPress={() => this.props.setFilters({ type: 'hopital' })}
              >
                <Ionicons name="ios-person-add" size={24} color={activeType('hopital') ? '#FFF' : '#4287F5'}/>
                <Text style={[styles.buttonText, activeType('hopital') ? styles.activeText : null]}>Cabinet</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View>
              <Text style={styles.title}>Price</Text>
            </View>
            <View style={styles.group}>
              <TouchableOpacity
                style={[styles.button, styles.first, price === 'free' ? styles.active : null]}
                onPress={() => this.props.setFilters({ price: 'free' })}
              >
                <Text style={[styles.buttonText, price === 'free' ? styles.activeText : null]}>Gratuit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, price === '$$' ? styles.active : null]}
                onPress={() => this.props.setFilters({ price: '$$' })}
              >
                <Text style={[styles.buttonText, price === '$$' ? styles.activeText : null]}>$$</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, price === '$$$' ? styles.active : null]}
                onPress={() => this.props.setFilters({ price: '$$$' })}
              >
                <Text style={[styles.buttonText, price === '$$$' ? styles.activeText : null]}>$$$</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.last, price === '$$$$' ? styles.active : null]}
                onPress={() => this.props.setFilters({ price: '$$$$' })}
              >
                  <Text style={[styles.buttonText, price === '$$$$' ? styles.activeText : null]}>$$$$</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View>
              <Text style={styles.title}>Plus d'options</Text>
            </View>
            <View>
              <View style={styles.option}>
                <Text style={{ fontWeight: '500', }}>Options numéro 1</Text>
                <Switch
                  value={option_full}
                  ios_backgroundColor="#EAEAED"
                  trackColor={{false: "#EAEAED", true: "#4287F5"}}
                  onValueChange={() => this.props.setFilters({ option_full: !option_full })}
                />
              </View>
              <View style={styles.option}>
                <Text style={{ fontWeight: '500', }}>Options numéro 2</Text>
                <Switch
                  value={option_rated}
                  ios_backgroundColor="#EAEAED"
                  trackColor={{false: "#EAEAED", true: "#4287F5"}}
                  onValueChange={() => this.props.setFilters({ option_rated: !option_rated })}
                />
              </View>
              <View style={styles.option}>
                <Text style={{ fontWeight: '500', }}>Options numéro 3</Text>
                <Switch
                  value={option_free}
                  ios_backgroundColor="#EAEAED"
                  trackColor={{false: "#EAEAED", true: "#4287F5"}}
                  onValueChange={() => this.props.setFilters({ option_free: !option_free })}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const moduleState = state => ({
  filters: state.medcabs.filters,
  loading: state.medcabs.loading,
});

const moduleActions = {
  setFilters,
}

export default connect(moduleState, moduleActions)(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.1,
    width: width,
    paddingHorizontal: 14,
  },
  section: {
    flexDirection: 'column',
    marginHorizontal: 14,
    marginBottom: 14,
    paddingBottom: 24,
    borderBottomColor: '#EAEAED',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    marginVertical: 14,
  },
  group: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#4287F5',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 14,
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '500',
  },
  active: {
    backgroundColor: '#4287F5',
  },
  activeText: {
    color: '#FFF'
  },
  first: {
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
  },
  last: {
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
  },
  option: {
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

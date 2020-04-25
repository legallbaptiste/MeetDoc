import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
  Switch,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons, MaterialIcons, Foundation, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const { width, height } = Dimensions.get('screen');

class Formulaire extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    dataku: [],
  }


  klikGet(){
    var url = 'http://192.168.1.72:3000/markers';
    axios.get(url)
    .then((ambilData) => {
      console.log(ambilData.data);
      this.setState({
        dataku: ambilData.data,
      })
    })
  };

  klikPost(){

    fetch('http://192.168.1.72:3000/markers', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 7,
        type: this.state.input2,
        name: this.state.input3,
        description: this.state.input4,
        rating: this.state.input5,
        distance : this.state.input6,
        price: this.state.input7,
        image: this.state.input8,
        latitude: this.state.input9,
        longitude: this.state.input10,
      }),
    });
  }



  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Campings')}>
            <Ionicons name="md-arrow-back" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.title}>Formulaire ajout médecin/cabinet</Text>
        </View>

      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
                <View>
      <View style={{flexDirection:'column', alignItems:'center'}}>



      <TextInput
      placeholder='ID'
      style={{height: 55, width: 350, fontSize: 15}}
      onChangeText={(input1) => this.setState({input1})}
      value={this.state.input1}
      />

      <TextInput
      placeholder='Type'
      style={{height: 55, width: 350, fontSize: 15}}
      onChangeText={(input2) => this.setState({input2})}
      value={this.state.input2}
      />

      <TextInput
      placeholder='Name'
      style={{height: 55, width: 350, fontSize: 15}}
      onChangeText={(input3) => this.setState({input3})}
      value={this.state.input3}
      />

      <TextInput
      placeholder='Description'
      style={{height: 55, width: 350, fontSize: 15}}
      onChangeText={(input4) => this.setState({input4})}
      value={this.state.input4}
      />

      <TextInput
      placeholder='Rating'
      style={{height: 55, width: 350, fontSize: 15}}
      onChangeText={(input5) => this.setState({input5})}
      value={this.state.input5}
      />

      <TextInput
      placeholder='Distance'
      style={{height: 55, width: 350, fontSize: 15}}
      onChangeText={(input6) => this.setState({input6})}
      value={this.state.input6}
      />

      <TextInput
      placeholder='Price'
      style={{height: 55, width: 350, fontSize: 15}}
      onChangeText={(input7) => this.setState({input7})}
      value={this.state.input7}
      />


      <TextInput
      placeholder='Image'
      style={{height: 55, width: 350, fontSize: 15}}
      onChangeText={(input8) => this.setState({input8})}
      value={this.state.input8}
      />

      <TextInput
      placeholder='Longitude'
      style={{height: 55, width: 350, fontSize: 15}}
      onChangeText={(input9) => this.setState({input9})}
      value={this.state.input9}
      />

      <TextInput
      placeholder='Latitude'
      style={{height: 55, width: 350, fontSize: 15}}
      onChangeText={(input10) => this.setState({input10})}
      value={this.state.input10}
      />
      </View>

      <View style={{flexDirection:'row', justifyContent:'center'}}>
      <TouchableOpacity
      style={{
          backgroundColor:'blue', borderRadius:10,
          flex:1, width:100, height:50, margin:20,
          flexDirection:'row', justifyContent:'center',
          alignItems:'center'
          }}
      onPress={this.klikPost.bind(this)}
      >
      <Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
      Soumettre
      </Text>
      </TouchableOpacity>

      
      </View>



      </View>
      </SafeAreaView>

    );
  }
}

const moduleState = state => ({
  filters: state.campings.filters,
  loading: state.campings.loading,
});


export default connect(moduleState)(Formulaire);

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

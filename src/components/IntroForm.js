import React, { Component } from 'react';
import { View, 
        Text,
        TextInput,
        ScrollView, 
        Picker, 
        TouchableWithoutFeedback,
        TouchableOpacity ,
        ActivityIndicator,
        Button,
        StyleSheet,
        Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { RadioButton, RadioGroup } from 'react-native-flexi-radio-button'
import Header from './commom/header'
import { connect } from 'react-redux';
import { infoUpdate, infoCreate } from '../actions/IntroActions'
import firebase from 'firebase'
//import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker'

class Input extends Component {
    render() {
        return (
            <View style={{ paddingTop: 10 }}>
                <View style={{ height: 55, borderColor: '#000', borderWidth: 2,borderRadius:25,justifyContent:'center'}}>
                    <View>
                    <TextInput {...this.props}
                        //    tintColor={'#79c5c4'}
                        underlineColorAndroid={'transparent'}
                        
                        style={{ height: 60 }}
                    />
                    </View>
                    
                </View>
            </View>
        );
    }
}

class InfoForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
          loading: false,
          dp: 'https://i.stack.imgur.com/gjwr8.png'
         }
       }
       openPicker(){
         this.setState({ loading: true })
         const Blob = RNFetchBlob.polyfill.Blob
         const fs = RNFetchBlob.fs
         window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
         window.Blob = Blob
         //const { uid } = this.state.user
         const uid = "12345"
         ImagePicker.openPicker({
           width: 300,
           height: 300,
           cropping: true,
           mediaType: 'photo'
         }).then(image => {
     
           const imagePath = image.path
     
           let uploadBlob = null
     
           const imageRef = firebase.storage().ref(uid).child("dp.jpg")
           let mime = 'image/jpg'
           fs.readFile(imagePath, 'base64')
             .then((data) => {
               //console.log(data);
               return Blob.build(data, { type: `${mime};BASE64` })
           })
           .then((blob) => {
               uploadBlob = blob
               return imageRef.put(blob, { contentType: mime })
             })
             .then(() => {
               uploadBlob.close()
               return imageRef.getDownloadURL()
             })
             .then((url) => {
     
               let userData = {}
               //userData[dpNo] = url
               //firebase.database().ref('users').child(uid).update({ ...userData})
     
               let obj = {}
               obj["loading"] = false
               obj["dp"] = url
               this.setState(obj)
     
             })
             .catch((error) => {
               console.log(error)
             })
         })
         .catch((error) => {
           console.log(error)
         })
       }

    onButtonPress() {
        const { name, State, age, ethnicity, race, height, weight, genderSelectedIndex, gender, about } = this.props
        this.props.infoCreate({ name, State, age, ethnicity: ethnicity || 'Hispanic or Latino', race: race || 'American Indian', height, weight, genderSelectedIndex, gender })
    }

    onRadioButtonSelect(index, value) {
        this.props.infoUpdate({prop:'gender',value})
    }
    render() {
        const dpr = (
      <TouchableWithoutFeedback  onPress={() => this.openPicker()}
        >
                                
      <Image style={{width: 95, height: 95,borderRadius:100/2}}
             source={{uri: this.state.dp}}
          //source={require('./icons/user.png')}
             resizeMode='cover'/>
      
  </TouchableWithoutFeedback> ) 

   const dps = this.state.loading ? <ActivityIndicator animating={this.state.loading} /> : (
     <View style={{ borderRadius:110/2, backgroundColor: '#dd574c', width: 100, height: 100,borderWidth:2 ,borderColor:'#dd574c'}}>
       { dpr }
     </View>
   )
  // color:#192f6a
        return (
            
            <View style={{ flex: 1, backgroundColor: '#e8e8e8' }}>
                <Header headerText={'Introduction'} />
                <ScrollView style={{ flex: 1, backgroundColor: '#e8e8e8' }}>
                <LinearGradient  colors={['#4c669f', '#3b5998', '#192f6a']}>
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                         {/* <View 
                          style={{ borderRadius:110/2, backgroundColor: '#fff', width: 100, height: 100,borderWidth:2 }}
                         > 
                             <TouchableWithoutFeedback  onPress={this.getImage}>
                                
                                <Image style={{width: 95, height: 95,borderRadius:100/2}}
                                       source={{uri: this.state.image_uri}}
                                    //source={require('./icons/user.png')}
                                       resizeMode='cover'/>
                                
                            </TouchableWithoutFeedback>    
                            {dps}
                            
                        </View> */}
                        {dps}
                    </View> 
                    
                    <View style={{ flex: 0.8, padding: 10 }}>
                        <Input placeholder={"Name"}
                            value={this.props.name}
                            onChangeText={value => this.props.infoUpdate({ prop: 'name', value })}
                        />
                        <Input placeholder={"State"}
                            value={this.props.State}
                            onChangeText={value => this.props.infoUpdate({ prop: 'State', value })}
                        />
                        <Input placeholder={"Age"}
                            value={this.props.age}
                            onChangeText={value => this.props.infoUpdate({ prop: 'age', value })}
                            keyboardType='numeric'
                        />
                        <View style={{ paddingTop: 10 }}>
                            <View style={{ height: 60, borderColor: '#dd574c', borderWidth: 2, justifyContent: 'center',borderRadius:25 }}>
                                <View style={{ flex: 1 ,paddingLeft:10}}>
                                    {/* <View style={{justifyContent:'flex-start',height:10,paddingLeft}}> */}
                                    <Text style={{ paddingLeft: 5 }}>Ethnicity</Text>
                                    {/* </View> */}
                                    <View >
                                        <Picker style={{ width: '100%' }} mode={'dropdown'}
                                            selectedValue={this.props.ethnicity}
                                            onValueChange={value => this.props.infoUpdate({ prop: 'ethnicity', value })}>
                                            <Picker.Item label="Hispanic or Latino" value="Hispanic or Latino" />
                                            <Picker.Item label="Non-Hispanic or Non-Latino" value="Non-Hispanic or Non-Latino" />
                                        </Picker>
                                    </View>

                                </View>
                            </View>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <View style={{ height: 60, borderColor: '#dd574c', borderWidth: 2, justifyContent: 'center',borderRadius:25 }}>
                                <View style={{ flex: 1 ,paddingLeft:10}}>
                                    <Text style={{ paddingLeft: 5 }}>Race</Text>
                                    <View >
                                        <Picker style={{ width: '100%' }} mode={'dropdown'}
                                            selectedValue={this.props.race}
                                            onValueChange={value => this.props.infoUpdate({ prop: 'race', value })}>
                                            <Picker.Item label="American Indian" value="American Indian" />
                                            <Picker.Item label="Asian" value="Asian" />
                                            <Picker.Item label="Native Hawaiian or Other Pacific Islander" value="Native Hawaiian or Other Pacific Islander" />
                                            <Picker.Item label="Black or African American" value="Black or African American" />
                                            <Picker.Item label="White" value="White" />
                                        </Picker>
                                    </View>

                                </View>
                            </View>
                        </View>

                        <Input placeholder={"Height (in inches)"}
                            value={this.props.height}
                            onChangeText={value => this.props.infoUpdate({ prop: 'height', value })}
                            keyboardType='numeric'
                        />
                        <Input placeholder={"Weight (in pounds)"}
                            value={this.props.weight}
                            onChangeText={value => this.props.infoUpdate({ prop: 'weight', value })}
                            keyboardType='numeric'
                        />
                        <RadioGroup style={{ flexDirection: 'row' }}
                            selectedIndex={this.props.genderSelectedIndex}
                            onSelect={(index, value) => this.onRadioButtonSelect(index,value)}
                        >
                            <RadioButton value={'Male'}>
                                <Text>Male</Text>
                            </RadioButton>
                            <RadioButton value={'Female'}>
                                <Text>Female</Text>
                            </RadioButton>
                        </RadioGroup>
                        <View style={style.buttonContainerStyle}>
                            <TouchableOpacity style={style.buttonStyle} onPress={this.onButtonPress.bind(this)}>
                                <Text style={style.buttonTextStyle}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </LinearGradient>
                </ScrollView>
            </View>
        );
    }

}

const style = {
    buttonStyle: {
        borderRadius: 20,
        height: 50,
        backgroundColor: '#dd574c',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        elevation: 4,
        position: 'relative'
    },
    buttonTextStyle: {
        color: '#fff',
        fontSize: 20,
    },
    buttonContainerStyle: {
        paddingTop: 10
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });

mapStateToProps = (state) => {
    const { name, State, age, ethnicity, race, height, weight, genderSelectedIndex, gender } = state.info;

    return { name, State, age, ethnicity, race, height, weight, genderSelectedIndex, gender };
}

export default connect(mapStateToProps, { infoCreate, infoUpdate })(InfoForm);
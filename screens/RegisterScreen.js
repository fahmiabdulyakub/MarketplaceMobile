import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Alert,
    AsyncStorage,
    ActivityIndicator
} from "react-native";
import {Button, ThemeProvider, Input, Image} from "react-native-elements";
// import {Ionicons} from "@expo/vector-icons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import {styles} from "../styles/RegisterScreenStyles"

const theme = {
  colors: {
    primary: "#000",
  },
};

export default class RegistrationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fastShippingChecked: false,
      UserEmail: '',
      UserPhone: '',
      UserPassword: '',
      ConfirmPassword: '',
      emailValidate: true,
      phoneValidate: true,
      passwordValidate: true,
      dataSource:'',
      Messange:'',
      
    };
  }

  //validasi isi Email dan phone
  validText(data, type){
    //ini javascript buat email "abc@mail.com"
    const alph = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //ini javascript buat phone // << max 10-13 , yg diganti yg {5,8} ==> {min, max}
    const num = /^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,8}$/;

    const { UserPassword } = this.state;

    if (type == 'email'){
      if(alph.test(data)){
        // Alert.alert('yeay')
        this.setState({
          emailValidate:true,
          UserEmail: data.trim(),
          Messange: ''
        })
        return false;
      } else {
        // Alert.alert('incorrenct')
        this.setState({
          emailValidate:false,
          Messange: 'Please enter a valid email address'
        })
        return true;
      }
    }
    if (type == 'phone'){
      if(num.test(data)){
        this.setState({
          phoneValidate:true,
          UserPhone: data.trim(),
          Messange: ''
        })
        return false;
      } else {
        this.setState({
          phoneValidate:false,
          Messange: 'Please enter a valid phone number'
        })
        return true;
      }
    }    
    if (type == 'password'){
      //maksimal password >= 2 index alias 3 huruf [0, 1, 2]
      if (UserPassword.length >= 2 ){
        this.setState({
          passwordValidate:true,
          UserPassword: data.trim(),
          Messange: ''
        })
        return false;
      } else {
        this.setState({
          passwordValidate:false,
          UserPassword: data.trim(),
          Messange: 'Your password must be at least 3 characters'
        })
        return true;
      }
    }
  }

  //ini validasi kalau ada baris yg kosong
  validate = () => {
    const {UserEmail, UserPhone, UserPassword, ConfirmPassword} = this.state
    // if (UserEmail == "") {
    //     alert("Please fill your email")
    //     return false
    // } else 
    if (UserPhone == "") {
        alert("Please fill your number phone")
        return false
    } else if (UserPassword == "") {
        alert("Please fill your password")
        return false
    } 
    // else if (UserPassword !== ConfirmPassword) {
    //     alert("Your Password and Confim Password was Wrong!")
    //     return false
    // }
    return true
}

registration_Function = () => {
 
    const {UserEmail, UserPhone, UserPassword} = this.state;
    this.setState({ loading: true });

    if (this.validate()) {
        return fetch('https://genio.co.id/geniooapi/api/authentication/buyer/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //ini parameternya
                user: UserEmail,
                no_hp: UserPhone,
                password: UserPassword
            })
        })
        .then((response) => response.json())// response.text())
        .then((responseJson) => {
          this.setState({
                  isLoading: false,
                  dataSource: responseJson,
                  infoUser: ''

              }, () => {
                this.state.infoUser = this.state.dataSource[0];
                console.log(JSON.stringify(this.state.infoUser));
                    if (this.state.infoUser.email !== undefined ) {
                      if(this.state.infoUser.email !== undefined){
                      AsyncStorage.setItem('Email', this.state.infoUser.email);
                      // AsyncStorage.setItem('password', response.password);
                      AsyncStorage.setItem('isLoggedIn', '1');
                      Alert.alert(this.state.infoUser.email);
                      this.props.navigation.navigate('Home');
                    }
                    else{
                      Alert.alert(responseJson);
                    }
                        } 
                      else {
                          setTimeout(() => {
                            Alert.alert(
                                'Warning',
                                'Email or Phone Alread Exist, \nPlease Try Again With Different Email or Phone'
                            );
                          }, 100);
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                })
    } 
  }

//aslinya...
// registration_Function = () => {
//     fetch('https://maturan.co/v1/api/buyer', {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     phone: this.state.phone,
//     email: this.state.email, 
//     password: this.state.password
//   })
// }).then((response) => response.json())
//   .then((responseJson) => {
//     // Showing response message coming from server after inserting records.
//     Alert.alert(responseJson);
//   }).catch((error) => {
//     console.error(error);
//   });
// }

  static navigationOptions = ({ navigation }) => ({
    header: null,
  });


  render() {
    return (
      <ThemeProvider theme={theme}>
        <SafeAreaView style={styles.Back}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View>
            <Image
              style={styles.logo}
              source={require('../image/maturann.png')}
            />
          </View>
          <View style={styles.inputsContainer}>
            <Input
              containerStyle={styles.inputContainerGlobal}
              placeholder="yourmail@mail.co"
              // onChangeText={data => this.setState({ UserEmail: data.trim() })}
              onChangeText={(data)=> this.validText(data,'email')}
              label="E-mail"
              labelStyle={styles.inputLabelStyle}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputInsideStyle}
              placeholderTextColor="red"
            />
            <Input
              containerStyle={styles.inputContainerGlobal}
              placeholder="081234567890"
              // onChangeText={data => this.setState({ UserPhone: data.trim() })}
              onChangeText={(data)=> this.validText(data,'phone')}
              label="Phone"
              labelStyle={styles.inputLabelStyle}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputInsideStyle}
              placeholderTextColor="red"
              keyboardType='phone-pad'
            />
            <Input
              containerStyle={styles.inputContainerGlobal}
              placeholder="**********"
              // onChangeText={data => this.setState({ UserPassword: data })}
              onChangeText={(data)=> this.validText(data,'password')}
              label="Password"
              labelStyle={styles.inputLabelStyle}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputInsideStyle}
              placeholderTextColor="red"
              secureTextEntry
            />
            {/* <Input
              containerStyle={styles.inputContainerGlobal}
              placeholder="**********"
              onChangeText={data => this.setState({ ConfirmPassword: data })}
              label="Password"
              labelStyle={styles.inputLabelStyle}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputInsideStyle}
              placeholderTextColor="red"
              secureTextEntry
            /> */}
            <View style={styles.checkBoxContainer}>
              <Text style={styles.notificationText}> 
                {this.state.Messange}
                {/* Registration confirmation will be emailed to you. */}
              </Text>
            </View>

            <Button
              buttonStyle={styles.saveButton}
              titleStyle={styles.titleButtonStyle}
              title="REGISTER"
              containerStyle={styles.saveButtonContainer}
              onPress={this.registration_Function}
              // onPress={() => this.props.navigation.navigate("Home")}
            />
          </View>
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
              <Text style={styles.linkText}>Log In</Text>
            </TouchableOpacity>
            <View style={styles.verticalLine} />
            <TouchableOpacity onPress={() => this.props.navigation.navigate("LostPassword")}>
              <Text style={styles.linkText}>Lost your password?</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}
import React from "react";
import { Avatar, Button, Input, ThemeProvider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { 
  StyleSheet, 
  View, 
  Text, 
  AsyncStorage, 
  Alert, 
  ActivityIndicator,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { id } from "date-fns/locale";

const theme = {
  colors: {
    primary: "#000",
  },
};

export default class CheckoutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.getData();
    this.state = {
      dataSource:'',
      infoUser : '',
      id_akun:'',
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#fff",
      borderBottomWidth: 0,
      marginHorizontal: 24,
      elevation: 0,
    },
    title: "My Account",
    headerTitleStyle: {
      fontFamily: "work-sans-semibold",
      fontSize: 18,
      textAlign: "center",
      flex: 1,
    },
  });

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('id_konsumen');
      
      if (value !== null){
        this.setState({ id_akun: value,});
      }
    } catch(e) {
      // error reading value
    }
  } 

  
  componentDidMount() {
    
    const id_user = JSON.stringify(this.state.id_akun);
    
    return fetch('https://genio.co.id/geniooapi/api/authentication/buyer/user/detail?id_konsumen=' + id_user)
    .then((response) => response.json())// response.text())
    .then((responseJson) => {
      this.setState({
              isLoading: false,
              dataSource: responseJson,
              

          },  () => {
            if(this.state.id_akun =='85'){
              alert(this.state.id_akun);

            }
            
        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    if (this.state.dataSource && this.state.dataSource.length) {
    this.state.infoUser = this.state.dataSource[0];
    
    }
    
    return (
      
      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.container}>
            <View style={styles.avatarContainer}>
              <Avatar
                containerStyle={{ borderWidth: 4, padding: 2 }}
                rounded
                size="xlarge"
                source={{
                  uri: "https://maturan.co//asset//foto_user//shiva_artgroup.jpg",
                }}
              />
              <Text style={styles.defaultText}>Hello dear</Text>
              <Text style={styles.nameStyle}>{this.state.id_akun}</Text>
            </View>
            <View style={styles.sortingContainer}>
              <Button
                title="ORDER"
                type="clear"
                containerStyle={[styles.sortingButtonContainer, styles.sortingPriceButtonContainer]}
                buttonStyle={[styles.sortingButton]}
                titleStyle={styles.sortingButtonTitle}
                onPress={() => this.props.navigation.navigate("Orders")}
              />
              <View style={styles.verticalLine} />
              <Button
                title="Account Details"
                type="clear"
                containerStyle={[styles.popularityButtonContainer, styles.sortingButtonContainer]}
                buttonStyle={styles.sortingButton}
                titleStyle={[styles.sortingButtonTitle, styles.activeSortingButtonTitle]}
              />
              <View style={styles.verticalLine} />
              <Button
                title="Logout"
                type="clear"
                containerStyle={styles.showAllButtonContainer}
                buttonStyle={styles.sortingButton}
                titleStyle={styles.sortingButtonTitle}
                onPress={() => this.props.navigation.navigate("Login")}
              />
            </View>
            <View style={styles.contactDetailsContainer}>
              <Text style={styles.contactText}>Contact Details</Text>
              <View style={styles.line} />
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder={this.state.infoUser.no_hp}
                label="Mobile"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                keyboardType="numeric"
                placeholderTextColor="#000"
              />
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder={this.state.infoUser.user_email}
                label="Email"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                placeholderTextColor="#000"
              />
            </View>
            <View style={styles.contactDetailsContainer}>
              <Text style={styles.contactText}>Password change</Text>
              <View style={styles.line} />
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="*********"
                label="Current"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                placeholderTextColor="#000"
                secureTextEntry
              />
              <Text style={styles.passwordHint}>leave blank to leave unchanged</Text>
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="*********"
                label="New"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                placeholderTextColor="#000"
                secureTextEntry
              />
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="*********"
                label="Confirm"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                placeholderTextColor="#000"
                secureTextEntry
              />
            </View>
            <Button
              buttonStyle={styles.saveButton}
              titleStyle={styles.titleButtonStyle}
              title="SAVE CHANGES"
              containerStyle={styles.saveButtonContainer}
              onPress={() => this.props.navigation.navigate("SavedSuccessful")}
            />
          </View>
        </KeyboardAwareScrollView>
      </ThemeProvider>
    );
  }
}
const styles = StyleSheet.create({
  headerBackButton: {
    marginLeft: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "gold",
    paddingHorizontal: 24,
  },
  contentContainer: {},
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "gold",
  },
  avatarContainer: {
    marginTop: 16,
    flexDirection: "column",
    alignItems: "center",
  },
  nameStyle: {
    fontFamily: "work-sans-semibold",
    fontSize: 20,
  },
  defaultText: {
    fontFamily: "work-sans",
    fontSize: 12,
    marginVertical: 20,
  },
  sortingContainer: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  sortingButtonContainer: {
    padding: 0,
  },
  verticalLine: {
    borderLeftWidth: 1,
    borderRightColor: "#000",
  },
  sortingButtonTitle: {
    color: "#000",
    fontFamily: "work-sans",
    fontSize: 14,
  },
  activeSortingButtonTitle: {
    fontFamily: "work-sans-bold",
  },
  sortingPriceButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sortingButtonIcon: {
    marginRight: 16,
  },
  contactDetailsContainer: {
    marginTop: 32,
  },
  contactText: {
    marginBottom: 16,
    fontFamily: "work-sans",
    fontSize: 14,
  },
  inputContainerGlobal: {
    flexDirection: "row",
    paddingHorizontal: 0,
    alignItems: "center",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  inputLabelStyle: {
    flex: 24,
    fontFamily: "work-sans",
    fontSize: 12,
    color: "#000",
  },
  inputContainerStyle: {
    flex: 76,
    borderBottomColor: "#000000",
    borderBottomWidth: 0,
    borderLeftColor: "#000000",
    borderLeftWidth: 1,
    height: 21,
    paddingLeft: 24,
  },
  inputStyle: {
    fontFamily: "work-sans-semibold",
    fontSize: 12,
  },
  passwordHint: {
    marginTop: 10,
    fontFamily: "work-sans",
    fontSize: 12,
    color: "#CCCCCC",
  },
  saveButton: {
    marginTop: 24,
    justifyContent: "space-around",
    borderRadius: 0,
    height: 55,
    marginBottom: 32,
  },
  titleButtonStyle: {
    fontFamily: "work-sans-bold",
    fontSize: 18,
    flex: 1,
    textTransform: "uppercase",
  },
});

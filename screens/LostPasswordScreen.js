import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, ThemeProvider, Input, Image } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const theme = {
  colors: {
    primary: "#000",
  },
};

export default class LostPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fastShippingChecked: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  render() {
    return (
      <ThemeProvider theme={theme}>
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
              placeholder="youremail@gmail.com"
              label="Email"
              labelStyle={styles.inputLabelStyle}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputInsideStyle}
              placeholderTextColor="red"
            />
            {/* <Input
              containerStyle={styles.inputContainerGlobal}
              placeholder="Password"
              label="Password"
              labelStyle={styles.inputLabelStyle}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputInsideStyle}
              placeholderTextColor="#000"
              secureTextEntry
              // onChangeText={UserPassword => this.setState({UserPassword})}
              onChangeText={(pass) => this.setState({UserPassword: pass})}
              value={this.state.UserPassword}
            /> */}
            {/* <View style={styles.checkBoxContainer}>
              <Text style={styles.notificationText}>
                Lost your password? Please enter your username or email address. You will receive a
                link to create a new password via email.
              </Text>
            </View> */}
            
            <Button
              buttonStyle={styles.saveButton}
              titleStyle={styles.titleButtonStyle}
              title="RESET"
              containerStyle={styles.saveButtonContainer}
              onPress={() => this.props.navigation.navigate("Login")}

            />
            
            
          </View>
        
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
              <Text style={styles.linkText}>Log In</Text>
            </TouchableOpacity>
            <View style={styles.verticalLine} />
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Registrasi")}>
              <Text style={styles.linkText}>Register</Text>
            </TouchableOpacity>
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
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    alignItems: "center",
  },
  contentContainer: {
    backgroundColor: "#ffd700",
  },
  logo: {
    height: 165,
    width: 185,
  },
  inputContainerGlobal: {
    flexDirection: "row",
    paddingHorizontal: 0,
    alignItems: "center",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    paddingVertical: 16,
    backgroundColor: '#ffd700',
  },
  inputLabelStyle: {
    flex: 24,
    fontFamily: "Roboto",
    fontSize: 12,
    color: "red",
  },
  inputContainerStyle: {
    flex: 76,
    borderBottomColor: "#000000",
    borderBottomWidth: 0,
    borderLeftColor: "#000000",
    borderLeftWidth: 1,
    height: 21,
    paddingLeft: 24,
    justifyContent: "center",
    backgroundColor: '#ffd700'
  },
  addressButtonContainer: {
    flex: 76,
    borderBottomColor: "#000000",
    borderBottomWidth: 0,
    borderLeftColor: "#000000",
    borderLeftWidth: 1,
    borderRadius: 0,
    paddingLeft: 24,
    justifyContent: "center",
  },
  inputInsideStyle: {
    fontFamily: "Roboto",
    fontSize: 12,
  },
  inputsContainer: {
    backgroundColor: "#ffd700",
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginTop: 50,
    marginBottom: 50,
  },
  checkBoxContainer: {
    borderWidth: 0,
    backgroundColor: "#ffd700",
    padding: 0,
    marginTop: 32,
    marginBottom: 32,
    marginRight: 0,
    marginLeft: 0,
  },
  notificationText: {
    textAlign: "justify",
  },
  checkBoxIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    backgroundColor: "#F05829",
  },
  saveButton: {
    justifyContent: "space-around",
    borderRadius: 0,
    height: 55,
    marginTop: 16,
    backgroundColor: 'red'
  },
  titleButtonStyle: {
    fontFamily: "Roboto",
    fontSize: 18,
    flex: 1,
    textTransform: "uppercase",
  },
  linkContainer: {
    flexDirection: "row",
  },
  linkText: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: 'red'
  },
  verticalLine: {
    borderLeftWidth: 1,
    borderRightColor: "#000",
    marginHorizontal: 16,
  },
  emptyBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#F05829",
  },
});
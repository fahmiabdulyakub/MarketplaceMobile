import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, ThemeProvider, Input, CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const theme = {
  colors: {
    primary: "#000",
  },
  Button: {
    titleStyle: {
      fontFamily: "work-sans-bold",
      fontSize: 18,
    },
    buttonStyle: {
      borderRadius: 0,
      height: 55,
      marginBottom: 24,
    },
  },
};

export default class DeliveryScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#fff",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      elevation: 0,
      marginHorizontal: 24,
    },
    title: "Delivery Address",
    headerTitleStyle: {
      fontFamily: "work-sans-semibold",
      fontSize: 18,
      textAlign: "center",
      flex: 1,
    },
    headerLeft: (
      <Button
        containerStyle={{
          marginLeft: 0,
        }}
        buttonStyle={{
          paddingVertical: 10,
          paddingRight: 20,
        }}
        type="clear"
        onPress={() => {
          navigation.goBack();
        }}
        icon={<Ionicons name="ios-arrow-back" size={20} color="#000" />}
      />
    ),
  });

  render() {
    return (
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.infoWarningContainer}>
              <View style={styles.infoWarning}>
                <Ionicons name="ios-information-circle-outline" size={16} color="#000" />
                <Text style={styles.infoWarningText}>
                  You currently have no saved addresses. Get started by adding one.
                </Text>
              </View>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[
                { key: "48 Lexington St, Soho, London" },
                { key: "45 Lexington St, Soho, London" },
              ]}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.props.navigation.navigate("DeliveryAddress")}>
                  <Text style={styles.addressBadge}>{item.key}</Text>
                </TouchableOpacity>
              )}
            />
            <View style={styles.contactDetailsContainer}>
              <Text style={styles.contactText}>Contact Details</Text>
              <View style={styles.line}></View>
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="Paul"
                label="First Name"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                placeholderTextColor="#000"
              />
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="Gascoigne"
                label="Last Name"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                placeholderTextColor="#000"
              />
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="2344329452342"
                label="Mobile"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                keyboardType="numeric"
                placeholderTextColor="#000"
              />
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="gascoigne@gmail.com"
                label="Email"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                placeholderTextColor="#000"
              />
            </View>
            <View>
              <Text style={styles.contactText}>address Details</Text>
              <View style={styles.line}></View>
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="GB"
                label="Country"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                placeholderTextColor="#000"
              />
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="48 Lexington St, Soho"
                label="address"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                placeholderTextColor="#000"
              />
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="London"
                label="Town / City"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                placeholderTextColor="#000"
              />
              <Input
                containerStyle={styles.inputContainerGlobal}
                placeholder="1800"
                label="Postcode"
                labelStyle={styles.inputLabelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                placeholderTextColor="#000"
              />
            </View>
            <View style={styles.infoWarningContainer}>
              <View style={styles.infoWarning}>
                <Ionicons name="ios-information-circle-outline" size={16} color="#000" />
                <Text style={styles.infoWarningText}>
                  This will be your default shipping address.
                </Text>
              </View>
              <View style={styles.infoWarning}>
                <Ionicons name="ios-information-circle-outline" size={16} color="#000" />
                <Text style={styles.infoWarningText}>
                  This will be your default billing address.
                </Text>
              </View>
            </View>
            <CheckBox
              activeOpacity={1}
              containerStyle={styles.checkBoxContainer}
              textStyle={{
                fontSize: 14,
                marginLeft: 24,
                color: "#000",
              }}
              fontFamily="work-sans"
              title="Create account with this data"
              checked={this.state.checked}
              onPress={checked => this.setState({ checked: !this.state.checked })}
              checkedIcon={<View style={styles.emptyBox}></View>}
              uncheckedIcon={
                <View style={styles.checkBoxIconContainer}>
                  <Ionicons name="ios-checkmark" size={20} color="#fff" />
                </View>
              }
            />

            <Button
              style={styles.saveButton}
              title="SAVE ADDRESS"
              buttonStyle={styles.saveButton}
              titleStyle={styles.titleButtonStyle}
              containerStyle={styles.saveButtonContainer}
              onPress={() => this.props.navigation.goBack()}
            />
          </ScrollView>
        </View>
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
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  contentContainer: {},
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
  },
  infoWarningContainer: {
    marginTop: 32,
  },
  infoWarning: {
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  infoWarningText: {
    marginLeft: 16,
    fontFamily: "work-sans",
    fontSize: 12,
  },
  contactDetailsContainer: {
    marginBottom: 24,
  },
  contactText: {
    marginBottom: 16,
    fontFamily: "work-sans",
    fontSize: 14,
  },
  addressBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 16,
    marginBottom: 32,
    fontFamily: "work-sans-bold",
    fontSize: 12,
  },
  checkBoxContainer: {
    borderWidth: 0,
    backgroundColor: "#fff",
    padding: 0,
    marginTop: 0,
    marginBottom: 32,
    marginRight: 0,
    marginLeft: 0,
  },
  checkBoxIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    backgroundColor: "#F05829",
  },
  emptyBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#F05829",
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
  titleButtonStyle: {
    fontFamily: "work-sans-bold",
    fontSize: 18,
    flex: 1,
    textTransform: "uppercase",
  },
  saveButton: {
    marginTop: 0,
    justifyContent: "space-around",
    borderRadius: 0,
    height: 55,
    marginBottom: 32,
  },
});

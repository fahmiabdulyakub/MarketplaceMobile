import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, ThemeProvider, Input } from "react-native-elements";
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

export default class DeliveryAddressScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#fff",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      marginHorizontal: 24,
      elevation: 0,
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
                <Text style={styles.infoWarningText}>You have saved addresses.</Text>
              </View>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[
                { key: "48 Lexington St, Soho, London" },
                { key: "45 Lexington St, Soho, London" },
              ]}
              renderItem={({ item }) => <Text style={styles.addressBadge}>{item.key}</Text>}
            />
            <View style={styles.contactDetailsContainer}>
              <Text style={styles.contactText}>Contact Details</Text>
              <View style={styles.line}></View>
              <Input
                containerStyle={{
                  flexDirection: "row",
                  paddingHorizontal: 0,
                  alignItems: "center",
                  borderBottomColor: "#000000",
                  borderBottomWidth: 1,
                  paddingVertical: 16,
                }}
                placeholder="Paul"
                label="First Name"
                labelStyle={{
                  flex: 24,
                  fontFamily: "work-sans",
                  fontSize: 12,
                  color: "#000",
                }}
                inputContainerStyle={{
                  flex: 76,
                  borderBottomColor: "#000000",
                  borderBottomWidth: 0,
                  borderLeftColor: "#000000",
                  borderLeftWidth: 1,
                  height: 21,
                  paddingLeft: 24,
                }}
                inputStyle={{
                  fontFamily: "work-sans-semibold",
                  fontSize: 12,
                }}
                placeholderTextColor="#000"
              />
              <Input
                containerStyle={{
                  flexDirection: "row",
                  paddingHorizontal: 0,
                  alignItems: "center",
                  borderBottomColor: "#000000",
                  borderBottomWidth: 1,
                  paddingVertical: 16,
                }}
                placeholder="Gascoigne"
                label="Last Name"
                labelStyle={{
                  flex: 24,
                  fontFamily: "work-sans",
                  fontSize: 12,
                  color: "#000",
                }}
                inputContainerStyle={{
                  flex: 76,
                  borderBottomColor: "#000000",
                  borderBottomWidth: 0,
                  borderLeftColor: "#000000",
                  borderLeftWidth: 1,
                  height: 21,
                  paddingLeft: 24,
                }}
                inputStyle={{
                  fontFamily: "work-sans-semibold",
                  fontSize: 12,
                }}
                placeholderTextColor="#000"
              />
              <Input
                containerStyle={{
                  flexDirection: "row",
                  paddingHorizontal: 0,
                  alignItems: "center",
                  borderBottomColor: "#000000",
                  borderBottomWidth: 1,
                  paddingVertical: 16,
                }}
                placeholder="2344329452342"
                label="Mobile"
                labelStyle={{
                  flex: 24,
                  fontFamily: "work-sans",
                  fontSize: 12,
                  color: "#000",
                }}
                inputContainerStyle={{
                  flex: 76,
                  borderBottomColor: "#000000",
                  borderBottomWidth: 0,
                  borderLeftColor: "#000000",
                  borderLeftWidth: 1,
                  height: 21,
                  paddingLeft: 24,
                }}
                inputStyle={{
                  fontFamily: "work-sans-semibold",
                  fontSize: 12,
                }}
                placeholderTextColor="#000"
              />
            </View>
            <View>
              <Text style={styles.contactText}>address Details</Text>
              <View style={styles.line}></View>
              <Input
                containerStyle={{
                  flexDirection: "row",
                  paddingHorizontal: 0,
                  alignItems: "center",
                  borderBottomColor: "#000000",
                  borderBottomWidth: 1,
                  paddingVertical: 16,
                }}
                placeholder="GB"
                label="Country"
                labelStyle={{
                  flex: 24,
                  fontFamily: "work-sans",
                  fontSize: 12,
                  color: "#000",
                }}
                inputContainerStyle={{
                  flex: 76,
                  borderBottomColor: "#000000",
                  borderBottomWidth: 0,
                  borderLeftColor: "#000000",
                  borderLeftWidth: 1,
                  height: 21,
                  paddingLeft: 24,
                }}
                inputStyle={{
                  fontFamily: "work-sans-semibold",
                  fontSize: 12,
                }}
                placeholderTextColor="#000"
              />
              <Input
                containerStyle={{
                  flexDirection: "row",
                  paddingHorizontal: 0,
                  alignItems: "center",
                  borderBottomColor: "#000000",
                  borderBottomWidth: 1,
                  paddingVertical: 16,
                }}
                placeholder="48 Lexington St, Soho"
                label="address"
                labelStyle={{
                  flex: 24,
                  fontFamily: "work-sans",
                  fontSize: 12,
                  color: "#000",
                }}
                inputContainerStyle={{
                  flex: 76,
                  borderBottomColor: "#000000",
                  borderBottomWidth: 0,
                  borderLeftColor: "#000000",
                  borderLeftWidth: 1,
                  height: 21,
                  paddingLeft: 24,
                }}
                inputStyle={{
                  fontFamily: "work-sans-semibold",
                  fontSize: 12,
                }}
                placeholderTextColor="#000"
              />
              <Input
                containerStyle={{
                  flexDirection: "row",
                  paddingHorizontal: 0,
                  alignItems: "center",
                  borderBottomColor: "#000000",
                  borderBottomWidth: 1,
                  paddingVertical: 16,
                }}
                placeholder="London"
                label="Town / City"
                labelStyle={{
                  flex: 24,
                  fontFamily: "work-sans",
                  fontSize: 12,
                  color: "#000",
                }}
                inputContainerStyle={{
                  flex: 76,
                  borderBottomColor: "#000000",
                  borderBottomWidth: 0,
                  borderLeftColor: "#000000",
                  borderLeftWidth: 1,
                  height: 21,
                  paddingLeft: 24,
                }}
                inputStyle={{
                  fontFamily: "work-sans-semibold",
                  fontSize: 12,
                }}
                placeholderTextColor="#000"
              />
              <Input
                containerStyle={{
                  flexDirection: "row",
                  paddingHorizontal: 0,
                  alignItems: "center",
                  borderBottomColor: "#000000",
                  borderBottomWidth: 1,
                  paddingVertical: 16,
                }}
                placeholder="1800"
                label="Postcode"
                labelStyle={{
                  flex: 24,
                  fontFamily: "work-sans",
                  fontSize: 12,
                  color: "#000",
                }}
                inputContainerStyle={{
                  flex: 76,
                  borderBottomColor: "#000000",
                  borderBottomWidth: 0,
                  borderLeftColor: "#000000",
                  borderLeftWidth: 1,
                  height: 21,
                  paddingLeft: 24,
                }}
                inputStyle={{
                  fontFamily: "work-sans-semibold",
                  fontSize: 12,
                }}
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

            <Button style={styles.saveButton} title="SAVE ADDRESS" />
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
});

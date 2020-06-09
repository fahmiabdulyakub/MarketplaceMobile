import React from "react";
import { Button, ThemeProvider } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { StyleSheet, View, Text } from "react-native";

const theme = {
  colors: {
    primary: "#000",
  },
};

export default class AccountCreatedSuccessScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#E8E8E8",
      borderBottomColor: "#E8E8E8",
      borderBottomWidth: 1,
      marginHorizontal: 24,
      elevation: 0,
    },
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.container}>
            <View style={styles.thanxHeaderContainer}>
              <Text style={styles.thanxHeader}>Account was Created</Text>
            </View>
            <View style={styles.thanxTextContainer}>
              <Text style={styles.thanxText}>
                Inside your account you can change personal data and track orders
              </Text>
            </View>
            <Button
              buttonStyle={styles.saveButton}
              titleStyle={styles.titleButtonStyle}
              title="GO TO PROFILE"
              containerStyle={styles.saveButtonContainer}
              onPress={() => this.props.navigation.navigate("Home")}
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
    backgroundColor: "#E8E8E8",
    paddingHorizontal: 24,
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "#E8E8E8",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 24,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
  },
  imageThanx: {
    marginTop: 110,
    height: 188,
    width: 201,
  },
  thanxHeader: {
    fontFamily: "work-sans",
    fontSize: 38,
    textTransform: "uppercase",
    color: "#000",
    textAlign: "center",
  },
  thanxText: {
    fontFamily: "work-sans",
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  thanxHeaderContainer: {
    marginVertical: 48,
  },
  thanxTextContainer: {
    marginBottom: 48,
  },
  titleButtonStyle: {
    fontFamily: "work-sans",
    fontSize: 18,
    textTransform: "uppercase",
  },
  saveButton: {
    borderWidth: 0,
    borderRadius: 0,
    height: 55,
    width: "100%",
    marginHorizontal: 0,
    justifyContent: "space-around",
  },
  saveButtonContainer: {
    marginTop: 200,
    height: 55,
    paddingHorizontal: 24,
  },
});

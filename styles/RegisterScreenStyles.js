import {StyleSheet} from "react-native";


export const styles = StyleSheet.create({
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
    checkBoxIconContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: 20,
      height: 20,
      backgroundColor: "#ffd700",
    },
    saveButton: {
      justifyContent: "space-around",
      borderRadius: 0,
      height: 55,
      marginBottom: 16,
      backgroundColor:"red"
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
      color:'red'
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
    notificationText: {
      fontFamily: "Roboto",
      fontSize: 12,
    },
    Back: {
      flex: 1,
      backgroundColor: "#fff",
    },
  });
  
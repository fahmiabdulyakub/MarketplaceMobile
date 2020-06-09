import {StyleSheet} from "react-native";


export const styles = StyleSheet.create({
  headerBackButton: {
    marginLeft: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
  },
  checkoutSliderContainer: {
    paddingLeft: 24,
    marginVertical: 16,
  },
  productImage: {
    marginRight: 8,
    width: 110,
    height: 110,
    borderRadius: 5,
  },
  deleteIconContainer: {
    flex: 1,
    borderLeftColor: "#000",
    borderLeftWidth: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "column",
    marginLeft: 48,
  },
  swipeContainer: {
    marginVertical: 32,
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productContent: {
    alignItems: "flex-start",
    justifyContent: "space-around",
    flexDirection: "column",
    width: 100,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productTitle: {
    fontFamily: "Roboto",
    fontSize: 16,
    marginBottom: 8,
  },
  actualPrice: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#F05829",
    marginRight: 8,
  },
  oldPrice: {
    fontFamily: "Roboto",
    fontSize: 10,
    textDecorationLine: "line-through",
  },
  productCountButtons: {
    paddingHorizontal: 8,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#000",
  },
  plusButton: {
    borderRadius: 0,
    backgroundColor: "transparent",
  },
  minusButton: {
    borderRadius: 0,
    backgroundColor: "transparent",
  },
  countValueContainer: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
  countValueText: {
    marginVertical: 8,
    textAlign: "center",
  },
  titleButtonStyle: {
    marginLeft: 10,
    fontFamily: "Roboto",
    fontSize: 18,
    textAlign: "center",
  },
  buttonIconContainer: {
    borderLeftWidth: 1,
    borderLeftColor: "#fff",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginLeft: 25,
  },
  saveButton: {
    justifyContent: "space-around",
    borderRadius: 5,
    height: 55,
    marginTop: 0,
    backgroundColor: "#ffd700",
  },
  totalButtonText: {
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 18,
    marginRight: 8,
  },
  totalButtonValue: {
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 18,
    textAlign: "center",
  },
});

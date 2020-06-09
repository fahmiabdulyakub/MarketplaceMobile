import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  ThemeProvider,
  Image
} from "react-native-elements";
//import CartItems  from '../komponen/CartItems.component';
//import CustomerForm from '../komponen/CustomerForm.component';
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Swipeout from "react-native-swipeout";
//import Logo from '../komponen/Logo.component';
import Cart from '../komponen/Cart.component';
import { connect } from 'react-redux';
//import PaymentGateway from 'react-native-midtrans-payment';
const midtransClient = require('midtrans-client');



const theme = {
  colors: {
    primary: "gold",
  },
};

class CheckoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yuerel: '',
    };
  }
  async pay1() {
    // Create Snap API instance
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: 'SB-Mid-server-KwD1SOryRA9QmJRtLuv7uw40',
      clientKey: 'SB-Mid-client-cUOnTtFZi_sZ59D4',
    });

    let parameter = {
      transaction_details: {
        order_id: 'test-transaction-140',
        gross_amount: 1000,
      },
      credit_card: {
        secure: true,
      },
    };
    await snap.createTransactionRedirectUrl(parameter).then(url => {
      //Actions.push('ViewScreen',{yuerel : url}),
      console.log('yuerel :' + url);
      this.state.yuerel = url;
      this.props.navigation.navigate("MTPaymentScreen", { yuerel: url, })
    });
  }
  static navigationOptions = ({ navigation }) => ({
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
    headerRight: <Cart navigation={navigation} />,
    headerStyle: {
      backgroundColor: "#fff",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      elevation: 0,
      marginHorizontal: 24,
    },
    title: "Cart",
    headerTitleStyle: {
      fontFamily: "work-sans-semibold",
      fontSize: 18,
      textAlign: "center",
      flex: 1,
    },
  });
  render() {
    const { cartItems, cartTotal, navigation } = this.props;
    return (
      /*<View style={styles.container}>
        <Text>'Contents of cart:' + {JSON.stringify(cartItems)}</Text>
      </View>*/
      
      <ThemeProvider theme={theme}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.container}>
            <View style={styles.container}>
              <FlatList
                style={styles.productListContainer}
                showsHorizontalScrollIndicator={false}
                data={cartItems}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.swipeContainer}>
                    <Swipeout
                      right={[
                        {
                          component: (
                            <TouchableOpacity
                              onPress={() => this.deleteItem(item.id)}
                              //onPress={() => { this.props.removeItem({items})}}
                              //onPress={()=>(this.swipeHandleDelete())}
                              style={styles.deleteIconContainer}
                            >
                              <Ionicons name="md-trash" size={28} color="#F05829" />
                            </TouchableOpacity>
                          ),
                          backgroundColor: "#fff",
                        },
                      ]}
                      autoClose
                      backgroundColor="transparent"
                      buttonWidth={96}
                    >

                      <View style={styles.productContainer}>
                        <TouchableOpacity onPress={() => this.deleteItemById(item.id)}>
                          <Image source={{ uri: item.photomainpath }} style={styles.productImage} />
                        </TouchableOpacity>
                        <View style={styles.productContent}>
                          <Text style={styles.productTitle}>
                            {item.name}
                          </Text>
                          <View style={styles.priceRow}>
                            <Text style={styles.actualPrice}>Rp {item.sellprice}</Text>
                          </View>
                        </View>
                        <View style={styles.productCountButtons}>
                          <Button
                            buttonStyle={styles.plusButton}
                            titleStyle={styles.titleButtonStyle}
                            icon={<Ionicons name="ios-add" size={18} color="#000" />}
                          />
                          <View style={styles.countValueContainer}>
                            <Text style={styles.countValueText}>1</Text>
                          </View>
                          <Button
                            buttonStyle={styles.minusButton}
                            titleStyle={styles.titleButtonStyle}
                            icon={<Ionicons name="ios-remove" size={18} color="#000" />}
                          />
                        </View>
                      </View>
                    </Swipeout>
                  </View>
                )}
              />
              <Button
                buttonStyle={styles.saveButton}
                titleStyle={styles.titleButtonStyle}
                title="CHECKOUT"
                icon={
                  <View style={styles.buttonIconContainer}>
                    <Text style={styles.totalButtonText}>Total</Text>
                    <Text style={styles.totalButtonValue}>Rp.{cartTotal}</Text>
                  </View>
                }
                iconRight
                onPress={async () => await this.pay1()}
                containerStyle={styles.saveButtonContainer}
              //onPress={() => this.props.navigation.navigate("Checkout")}
              //this.props.navigation.navigate("Checkout") => this._storeData
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ThemeProvider > 
    ); 
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.cart.cart,
  cartTotal: state.cart.total
});
export default connect(
  mapStateToProps
)(CheckoutScreen);

const styles = StyleSheet.create({
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
    width: 108,
    height: 108,
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
    width: 145,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productTitle: {
    fontFamily: "work-sans",
    fontSize: 16,
    marginBottom: 8,
  },
  actualPrice: {
    fontFamily: "work-sans-bold",
    fontSize: 16,
    color: "#F05829",
    marginRight: 8,
  },
  oldPrice: {
    fontFamily: "work-sans-bold",
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
    fontFamily: "work-sans-bold",
    fontSize: 18,
    paddingHorizontal: 48,
  },
  buttonIconContainer: {
    borderLeftWidth: 1,
    borderLeftColor: "#fff",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  saveButton: {
    justifyContent: "space-around",
    borderRadius: 0,
    height: 55,
    marginBottom: 24,
  },
  totalButtonText: {
    color: "#fff",
    fontFamily: "work-sans",
    fontSize: 12,
    marginRight: 8,
  },
  totalButtonValue: {
    color: "#fff",
    fontFamily: "work-sans-bold",
    fontSize: 18,
  },
});


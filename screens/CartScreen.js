import React, { Component, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
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
import CartHeader from '../komponen/Cart.component';
import { connect } from 'react-redux';
//import PaymentGateway from 'react-native-midtrans-payment';
const midtransClient = require('midtrans-client');
import { format } from "date-fns";
//import { addToCart, removeItem } from '../redux/actions/cartActions';
import { styles, theme } from "../styles/CartScreenStyles";
import { bindActionCreators } from 'redux';
import * as cartActions from '../redux/actions/cartActions';



class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yuerel: '',
      buyerid: 0,
      isLoading: true,
      dataSource: []
    };
  }

  async pay1(total) {
    // Create Snap API instance
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: 'SB-Mid-server-KwD1SOryRA9QmJRtLuv7uw40',
      clientKey: 'SB-Mid-client-cUOnTtFZi_sZ59D4',
    });

    let time = format(new Date(), 'yyMMddHHmmss');
    let orderId = 'TRX' + time + Math.floor(Math.random() * 100);
    console.log('\n order_id:' + orderId)

    let parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: total,
      },
      credit_card: {
        secure: true,
      },
    };
    await snap.createTransactionRedirectUrl(parameter).then(url => {
      console.log('yuerel :' + url);
      console.log('trxID: ' + orderId)
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
    headerRight: <CartHeader navigation={navigation} />,
    headerStyle: {
      backgroundColor: "#fff",
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      elevation: 0,
      marginHorizontal: 24,
    },
    title: "Cart",
    headerTitleStyle: {
      fontFamily: "Roboto",
      fontSize: 18,
      textAlign: "center",
      flex: 1,
      marginTop: 10,
    },
  });

  addItemToCart (mod, item) {
    console.log("ProdukDetail aft QTY:" + JSON.stringify(item)+ "\n")
    mod == 'plus'? this.props.actions.addToCart(item) : this.props.actions.removeItem(item)
   // this.props.addToCart(item);
  }


  upItemToCart(updatedItem) {
    updatedItem.qty = parseInt(updatedItem.qty) + 1;
    console.log('\nupdatedItem.qty: ' + JSON.stringify(updatedItem.qty))
    this.props.actions.updateItemToCart(updatedItem);
  }

  async componentDidMount() {
    let { actions } = this.props;
    //actions.fetchCartData(1);

    if (this.props.cartInfo && this.props.cartInfo.length > 0) {
      console.log('\n cartInfo: ' + JSON.stringify(this.props.cartInfo[0].totalprice))
    } else {
      actions.fetchCartData(1);
    }
  }

  render() {
    const { cartItems, cartTotal, cartInfo, itemsQty, navigation } = this.props;
    //console.log("cartInfo CartScreen: " + JSON.stringify(cartInfo))
    //const cInfo = JSON.stringify(cartInfo[0].totalprice);
    //console.log("totalprice of CartScreen: " + cartTotal)
    //console.log("cartItems CartScreen: " + JSON.stringify(cartItems))
  
    /*if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }*/
    return (
      /*<View style={styles.container}>
        <Text>'Contents of cartInfo:' {JSON.stringify(cartInfo)} ', itemsQty:' {itemsQty} </Text>
      </View>*/

      <ThemeProvider theme={theme}>
        <SafeAreaView>
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
                  //keyExtractor={(item, index) => item.id}
                  keyExtractor={(item, index) => index}
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
                              <Text style={styles.actualPrice}>Rp.{item.sellprice}</Text>
                            </View>
                            <View style = {styles.line}></View>
                            <View style={styles.priceRow}>
                              <Text style={styles.actualPrice}>Rp.{item.sellprice * item.qty}</Text>
                            </View>
                          </View>
                          <View style={styles.productCountButtons}>
                            <Button
                              buttonStyle={styles.plusButton}
                              titleStyle={styles.titleButtonStyle}
                              icon={<Ionicons name="ios-add" size={18} color="#000" />}
                              onPress={() => this.addItemToCart('plus', item)}
                            />
                            <View style={styles.countValueContainer}>
                              <Text style={styles.countValueText}>{item.qty}</Text>
                            </View>
                            <Button
                              buttonStyle={styles.minusButton}
                              titleStyle={styles.titleButtonStyle}
                              icon={<Ionicons name="ios-remove" size={18} color="#000" />}
                              onPress={() => this.addItemToCart('minus', item)}
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
                  title="BAYAR"
                  icon={
                    <View style={styles.buttonIconContainer}>
                      {/* <Text style={styles.totalButtonText}>Total</Text> */}
                      <Text style={styles.totalButtonValue}>Rp.{cartTotal}</Text>
                    </View>
                  }
                  iconRight
                  onPress={async () => await this.pay1(cartTotal)}
                  containerStyle={styles.saveButtonContainer}
                //onPress={() => this.props.navigation.navigate("Checkout")}
                //this.props.navigation.navigate("Checkout") => this._storeData
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ThemeProvider >
    );
  }
}

const mapStateToProps = (state) => ({
  cartInfo: state.cart.cartInfo,
  cartItems: state.cart.cart,
  cartTotal: state.cart.total,
  itemsQty: state.cart.itemsQty,
});

const ActionCreators = Object.assign(
  {},
  cartActions,
);


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(
  //mapStateToProps, mapDispatchToProps, { addToCart, removeItem }
  mapStateToProps, mapDispatchToProps
)(CartScreen);



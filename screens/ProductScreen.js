import React from "react";
import {
  Button,
  Image,
  Overlay,
  ThemeProvider,
  Rating
} from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import ColorRadioButtons from "../components/ColorRadioButtons";
import SizeRadioButtons from "../components/SizeRadioButtons";
import { connect } from 'react-redux';
import CartHeader from '../komponen/Cart.component';
import { addToCart } from '../redux/actions/cartActions';
import { sarana } from '../data';


//import  Product  from '../components/Product.component';


class ProductScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      isLoading: true,
      id: this.props.navigation.state.params.id,
      //uri: "https://maturan.co/asset/foto_produk/",
    };
  }

  addItemToCart (Qty) {
    //console.log("ProdukDetail bef QTY:" + JSON.stringify(this.state.produkDetail) + "\n")

    var itemDetail = this.state.produkDetail
    var newItemDetail = {...itemDetail, 'qty': Qty}
    //console.log("ProdukDetail aft QTY:" + JSON.stringify(newItemDetail)+ "\n")
    this.props.addToCart(newItemDetail);
    this.props.navigation.navigate('Cart')
  }

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <Button
        containerStyle={{
          marginLeft: 0,
          // width: "100%"
        }}
        buttonStyle={{
          padding: 0,
          backgroundColor: "#fff",
          borderRadius: 40,
          width: 40,
          height: 40,
          marginTop: 15,
        }}
        type="evilicon"
        onPress={() => {
          navigation.goBack();
        }}
        icon={<Ionicons name="ios-arrow-back" size={18} color="#000" />}
      />
    ),
    headerRight: <CartHeader navigation={navigation} />,
    headerStyle: {
      backgroundColor: "#fff",
      borderBottomWidth: 0,
      marginHorizontal: 24,
      elevation: 0,
    },
    // headerTransparent: true,
    // title: "Produk",
    // headerTitleStyle: {
    //   fontFamily: "Roboto",
    //   fontSize: 18,
    //   textAlign: "center",
    //   flex: 1,
    //   marginTop: 20,
    //   color: "#e90003",
    //   width: '100%',
    headerTransparent: false,
    title: "Produk",
    headerTitleStyle: {
      fontFamily: "Roboto",
      fontSize: 18,
      textAlign: "center",
      flex: 1,
      marginTop: 20,
      color: "#e90003",

    },

  });

  componentDidMount() {
    const id = this.state.id;
    return fetch('https://maturan.co/v1/api/product/detail?id=' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          produkDetail: '',
        }, function () {
          
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

    console.log("\n \n id_produk: " + this.state.id)

    if (this.state.dataSource && this.state.dataSource.length) {
      this.state.produkDetail = this.state.dataSource[0];
      console.log("\n produkDetail: " + JSON.stringify(this.state.produkDetail));
    }

    let gambarArr = JSON.stringify(this.state.produkDetail.photomainpath).split(';').map((value, index) => {

      let gbr = "" + value.replace(/\"/g, '')
      return gbr
    })
    console.log('\n \n gambarArr: ' + JSON.stringify(gambarArr))

    return (
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor="transparent" translucent />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View>
            <SwiperFlatList
              index={0}
              showPagination
              paginationDefaultColor="#D8D8D8"
              paginationActiveColor="#F05829"
              paginationStyle={styles.paginationStyle}
              paginationStyleItem={styles.paginationStyleItem}

              data={gambarArr}

              renderItem={({ item }) => (

                <View style={styles.swiperPicContainer}>
                  <Image source={{ uri: item }} style={styles.productSwiperPic} />
                </View>
              )}
            />
          </View>

          <View style={styles.container}>
          <View style={styles.productContent}>
              <Text style={styles.productTitle}>{this.state.produkDetail.name}</Text>
              <Text style={styles.productDesc}>{this.state.produkDetail.descriptionshort}
              </Text>
              <Text style={styles.oldPrice}>Rp.{this.state.produkDetail.price}</Text>
              <Text style={styles.actualPrice}>Rp.{this.state.produkDetail.sellprice}</Text>
              <Text style={styles.stock}>Berat: {this.state.produkDetail.weight} KG - Tersedia {this.state.produkDetail.stock} {this.state.produkDetail.unit}</Text>
            </View>
            {/* <View style={styles.priceRow}>
              <Text style={styles.oldPrice}>Rp.{this.state.produkDetail.price}</Text>
              <Text style={styles.actualPrice}>Rp.{this.state.produkDetail.sellprice}</Text>
            </View> */}
            {/* <View>
              <Text style={styles.stok}>{this.state.produkDetail.stock}</Text>
            </View> */}
            {/* <View style={styles.attributeContainer}>
              <ColorRadioButtons options={options} />
              <TouchableOpacity
                style={styles.sizeButtonStyle}
                onPress={() => this.setState({ isVisible: true })}
              >
                <Text style={styles.titleButtonStyleSize}>size</Text>
                <Text style={styles.productTitleSize}>XS</Text>
              </TouchableOpacity>
              <Overlay
                height={300}
                containerStyle={styles.overlayContainer}
                isVisible={this.state.isVisible}
                onBackdropPress={() => this.setState({ isVisible: false })}
                overlayStyle={styles.overlayStyle}
              >
                <SizeRadioButtons size={size} />
              </Overlay>
            </View> */}
            <Button
              buttonStyle={styles.saveButton}
              titleStyle={styles.titleButtonStyle}
              title="BELI"
              icon={
                <View style={styles.appleLogoButtonContainer}>
                  <Text style={styles.priceInsideButtonText}>Rp.{this.state.produkDetail.sellprice}</Text>
                </View>
              }
              iconRight
              containerStyle={styles.saveButtonContainer}
              onPress={() => this.addItemToCart(1)}
            />
            <View>
              <Text style={styles.titleproduct}>Penjual : {this.state.produkDetail.sellername}</Text>
                  <Rating
                    imageSize={20}
                    readonly
                    startingValue="4.5"
                    style={styles.ratingContainer}
                  />
              <Text style={styles.productfull}>Alamat : {this.state.produkDetail.city}</Text>
            </View>
            <View>
              <Text style={styles.titleproduct}>Deskripsi :</Text>
              <Text style={styles.productfull}>{this.state.produkDetail.descriptionfull}</Text>
            </View>
            <View style={styles.tabsContainer}>
              {/* <Button
                buttonStyle={styles.tabButton}
                titleStyle={styles.titleTabButton}
                title="Product information"
                icon={<Ionicons name="ios-arrow-round-forward" size={20} color="#000" />}
                iconRight
                type="clear"
                containerStyle={styles.saveButtonContainer}
                onPress={() => this.props.navigation.navigate("ProductInformation")}
              /> */}
              <Button
                buttonStyle={styles.tabButton}
                titleStyle={styles.titleTabButton}
                title="Reviews"
                icon={<Ionicons name="ios-arrow-round-forward" size={20} color="#000" />}
                iconRight
                type="clear"
                containerStyle={styles.saveButtonContainer}
                onPress={() => this.props.navigation.navigate("Reviews")}
              />
              {/* <Button
                buttonStyle={styles.tabButton}
                titleStyle={styles.titleTabButton}
                title="Additional Information"
                icon={<Ionicons name="ios-arrow-round-forward" size={20} color="#000" />}
                iconRight
                type="clear"
                containerStyle={styles.saveButtonContainer}
              /> */}
            </View>
            <View style={styles.relatedItemsHeadingContainer}>
              <Text style={styles.relatedItemsHeading}>Rekomendasi</Text>
              {/* <Text style={styles.titleTabButton}>5 items</Text> */}
            </View>
          </View>
          <View style={styles.relatedItemsCardsContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={sarana}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.relatedItemCard} onPress={() => this.props.navigation.navigate("Product", { id: item.id })}>
                  <Image style={styles.imageRelatedItem} source={{ uri: item.photomainpath }} />
                  <Text style={[styles.titleTabButton, styles.titleRelatedItem]}>{item.name}</Text>
                  <View style={styles.priceRowRelated}>
                    <Text style={styles.oldPrice}>Rp {item.price}</Text>
                    <Text style={styles.actualPrice}>Rp {item.sellprice}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </KeyboardAwareScrollView>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = (state) => ({
  produkDetail: state.produkDetail
})
export const { width, height } = Dimensions.get("window");
export default connect(mapStateToProps, { addToCart })(ProductScreen);

const styles = StyleSheet.create({
  headerBackButton: {
    marginLeft: 24,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  swiperPicContainer: {
    height: 350,
    width,
    justifyContent: "center",
    marginTop: 8,
  },
  productSwiperPic: {
    height: 350,
    width,
    justifyContent: "center",
    marginTop: 8,
  },
  paginationStyle: {
    marginVertical: 0,
    bottom: -22,
  },
  paginationStyleItem: {
    width: 5,
    height: 5,
    marginHorizontal: 8,
  },
  priceRow: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    textAlign: "center",   
  },
  actualPrice: {
    fontFamily: "Roboto",
    fontSize: 15,
    color: "red",
    // marginRight: 8,
  },
  oldPrice: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: "#646464",
    textDecorationLine: "line-through",
    color: "#000",
    // marginRight: 5,
  },
  stock: {
    marginTop: 10,
    color: "#000",
    paddingTop: -40,
    fontSize: 12,
  },
  productContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  productTitle: {
    maxWidth: 300,
    fontFamily: "Roboto",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
    color: '#000',
  },
  productfull: {
    fontFamily: "Roboto",
    fontSize: 15,
    textAlign: "justify",
    paddingTop: 10,
    color: "#000",
  },
  titleproduct: {
    fontWeight: "bold",
    marginTop: 10,
    color: '#000',
  },
  productDesc: {
    marginVertical: 0,
    fontFamily: "Roboto",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
    paddingTop: -50,
    color: "#000",
  },
  attributeContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sizeButtonStyle: {
    borderLeftWidth: 1,
    flex: 43,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleButtonStyleSize: {
    marginRight: 16,
    fontFamily: "Roboto",
    fontSize: 12,
  },
  productTitleSize: {
    fontFamily: "Roboto",
    fontSize: 18,
  },
  tabsContainer: {
    marginTop: 16,
  },
  tabButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  titleTabButton: {
    fontFamily: "Roboto",
    fontSize: 15,
    color: "#000"
  },
  relatedItemsHeadingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
  },
  relatedItemsHeading: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#000",
  },
  relatedItemsCardsContainer: {
    marginLeft: 24,
    marginTop: 16,
  },
  relatedItemCard: {
    marginRight: 8,
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 130,
  },
  imageRelatedItem: {
    height: 130,
    width: 130,
    borderRadius: 9,
  },
  titleRelatedItem: {
    marginTop: 8,
  },
  priceRowRelated: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  actualPriceRelated: {
    fontFamily: "Roboto",
    fontSize: 9,
    color: "#F05829",
    marginRight: 8,
  },
  oldPriceRelated: {
    fontFamily: "Roboto",
    fontSize: 9,
    color: "#646464",
    textDecorationLine: "line-through",
  },
  overlayContainer: {
    backgroundColor: "rgba(0,0,0,.2)",
  },
  overlayStyle: {
    padding: 32,
    borderRadius: 0,
  },
  titleButtonStyle: {
    fontFamily: "Roboto",
    fontSize: 18,
    flex: 57,
    paddingBottom: 0,
    paddingTop: 0,
  },
  appleLogoButtonContainer: {
    borderLeftWidth: 1,
    borderLeftColor: "#fff",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    flex: 43,
  },
  priceInsideButtonText: {
    fontFamily: "Roboto",
    fontSize: 18,
    color: "#fff",
  },
  saveButton: {
    justifyContent: "space-around",
    borderRadius: 5,
    height: 55,
    marginTop: 12,
    borderColor: "#e90003",
  },
  ratingContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

const theme = {
  colors: {
    primary: "gold",
  },
};

const options = [
  {
    key: "pay",
    color: "#F4A603",
  },
  {
    key: "performance",
    color: "#B82D4A",
  },
  {
    key: "aToZ",
    color: "#595E67",
  },
  {
    key: "zToA",
    color: "#24433F",
  },
];

const size = [
  {
    key: "pay",
    text: "XS – 38 - 38 / 40",
  },
  {
    key: "performance",
    text: "XS – 38 - 38 / 40",
  },
  {
    key: "aToZ",
    text: "XS – 38 - 38 / 40",
  },
  {
    key: "zToA",
    text: "XS – 38 - 38 / 40",
  },
];

const relatedItems = [
  {
    title: "Sweatshirt with Gucci basquiat print",
    picture:
      "https://wondermedia.ru/wp-content/uploads/2017/12/New-Wave-Medical-Front-Yellow-800x1200.jpg",
    price: "$ 32",
    oldprice: "$ 64",
  },

];

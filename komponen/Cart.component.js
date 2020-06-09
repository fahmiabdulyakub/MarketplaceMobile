import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Animated
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";
import { Icon, Badge ,Avatar} from 'react-native-elements'

export class Cart extends Component {
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.cartItems !== this.props.cartItems) {
           
        }
    }
    onPress = () => {
        this.props.navigation.navigate('Cart');
    }
    render() {
        const { cartItems } = this.props;
        return (
           
                <TouchableOpacity style={styles.container}onPress={this.onPress}>
                {/* <Text style={styles.cart}>{(cartItems).length} items</Text>  
                <Badge value="99+" status="error" /> */}
                    <View style={{marginRight: 0,marginTop: 20 }}>
                        <Icon 
                            name='cart'
                            type='evilicon'
                            color='#f50'
                            size= {35}
                            onPress={() => this.props.navigation.navigate("Cart")} />
                              <Badge status="success" value={(cartItems).length} containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
                        </View> 
                </TouchableOpacity>
           
        );
    }
}
const mapStateToProps = (state) => ({
    cartItems: state.cart.cart
});
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    cart:{
        color: 'black',
        fontSize: 14
    }
})
export default connect(
    mapStateToProps
)(Cart);
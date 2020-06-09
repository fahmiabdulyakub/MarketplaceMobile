import React, {Component} from "react";
import {Platform, View, ActivityIndicator, StatusBar, AsyncStorage} from "react-native";
import {createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator} from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import Login from "../screens/Login";
import AuthScreen from "../screens/AuthScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import LostPasswordScreen from "../screens/LostPasswordScreen";
import {View} from "native-base";
import {create} from "react-test-renderer";

const AuthStack = createStackNavigator(
    {Home: HomeScreen, Auth: AuthScreen, Registration: RegistrationScreen, LostPassword: LostPasswordScreen, Profile: ProfileScreen}
);

AuthStack.navigationOptions = {
    headerMode: "none",
    navigationOptions: {
        headerVisible: false
    }
};

const Auth = createStackNavigator({Login: Login})

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._loadData();
    }

    render() {
        return (
            <View>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        )
    }

    _loadData = async () => {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        this
            .props
            .navigation
            .navigate(
                isLoggedIn == '1'
                    ? 'Login'
                    : 'App'
            ) // navigate ini ada di bawah
    }
}

export default createAppContainer(createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AuthStack,
    Auth: Auth
}, {initialRouteName: 'AuthLoading'}))

export default AuthStack;
import React, { Component } from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default class MTPaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yuerel: this.props.navigation.state.params.yuerel,
    };
  }

  render() {
    return (
      <WebView
        source={{ uri: this.state.yuerel }}
        style={{ marginTop: 0 }}
      />
      );
  }
}


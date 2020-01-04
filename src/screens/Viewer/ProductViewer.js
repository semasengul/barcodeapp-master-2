import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
  SafeAreaView
} from "react-native";
const { Connection, Request } = require("tedious");

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "abnadmin",
      password: "Abn321**"
    },
    type: "default"
  },
  server: "185.28.62.14",
  options: {
    database: "efyazilim_Db",
    encrypt: false
  }
};



  class ProductViewer extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      console.log(this.props.navigation.state.params.data);
      console.log(this.props.navigation.state.params.type);gc
      const connection = new Connection(config);
      connection.on("connect", err => {
        if (err) {
          console.error(err.message);
        } else {
          const request = new Request(
            `SELECT URUN_ADI
            FROM dbadmin1.Urunler
            WHERE urun_id =${this.props.navigation.state.params.data}`,
            (err, rowCount) => {
              if (err) {
                console.error(err.message);
              } else {
                console.log(`${rowCount} row(s) returned`);
              }
            }
          );
          connection.execSql(request);
        }
      });
    }

    render() {
      let itemData = this.props.navigation.state.params.data
      let itemType = this.props.navigation.state.params.type
      return (
        <View>
          <Text>
            {itemType}
          </Text>
          <Text>
            {itemData}
          </Text>
        </View>
      );
    }
  }

  export default ProductViewer;

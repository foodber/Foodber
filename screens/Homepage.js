import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView
} from "react-native";
import { Constants } from "expo";
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyDluonuaPcLFWSjnA7h8EaRCKxZnUHJ19g",
  authDomain: "foodber-65c10.firebaseapp.com",
  databaseURL: "https://foodber-65c10.firebaseio.com",
  projectId: "foodber-65c10",
  storageBucket: "foodber-65c10.appspot.com",
  messagingSenderId: "669394895252"
};

firebase.initializeApp(config);

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "Place Order: ",
      cart: "",
      orders: []
    };
  }
  static navigationOptions = {
    title: "Homepage"
  };

  componentDidMount() {
    //this is going to ref our firebase JUST ONCE when component mounts
    //it is going to look under orders for all the children and we can access it through snapshot
    //snapshot.val() will return a object with the key as a random string and value as the orders
    //we set our orders state with the new array for values in foodTrucks
    firebase
      .database()
      .ref()
      .child("trucks")
      .once("value", snapshot => {
        const data = snapshot.val();
        if (data) {
          const foodTrucks = [];
          //Object.keys(data).forEach(order => foodTrucks.push(data[order]));
          for (let key in data) {
            foodTrucks.push({ [key]: data[key].name });
          }
          this.setState({
            orders: [...foodTrucks]
          });
        }
      });
    //this is going to ref our firebase at orders and put a event listener on there
    //this will trigger everytime a child is added to our orders
    //if the value in the child being added is valid it will add it to our orders state
    //which will make our page re-render since state was updated
    // firebase
    //   .database()
    //   .ref()
    //   .child('orders')
    //   .on('child_added', snapshot => {
    //     const data = snapshot.val();
    //     console.log('on', data);
    //     if (data) {
    //       this.setState(prevState => ({
    //         orders: [...prevState.orders, data],
    //       }));
    //     }
    //   });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.theHeader}>All Trucks</Text>
        <View>
          {this.state.orders.map(order => {
            //console.log(Object.keys(order));
            return (
              <View key={Object.keys(order)} style={styles.padding}>
                <View style={styles.ViewBox}>
                  <Text
                    style={styles.FoodBox}
                    onPress={() =>
                      this.props.navigation.navigate("singleTruck", {
                        truckKey: Object.keys(order)
                      })
                    }
                  >
                    {Object.values(order)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    //backgroundColor: '#f7b7332',
    marginTop: Constants.statusBarHeight
  },
  padding: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 7
  },
  ViewBox: {
    paddingLeft: 10,
    // borderRadius: 5,
    // borderWidth: 1,
    backgroundColor: "#f5f5f5"
  },
  FoodBox: {
    //textAlign: 'center',
    //alignSelf: 'flex-start',
    justifyContent: "flex-start",
    height: 75,
    fontSize: 22
  },
  theHeader: {
    flex: 1,
    justifyContent: "flex-start",
    fontSize: 30,
    //color: 'rgba(96,100,109, 1)',
    color: "#dc143c"
    //lineHeight: 50,
    //textAlign: 'left',
  }
});

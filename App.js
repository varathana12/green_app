/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Dimensions,
    StatusBar,
    TouchableWithoutFeedback,Animated,ScrollView} from 'react-native';
import TestAnimation from './src/test_animation'
import NavBar from './src/nav_bar'
import { SafeAreaView } from 'react-navigation';
import {theme} from "./src/constant/color";
import TabNavigator from './src/routes/tab_nav'
import {MiniPlayer} from "./src/mini_player";
import { Provider } from "react-redux";
import {TOP} from "./src/constant/variable";
import store from './src/store/index'
import { Provider as PaperProvider } from 'react-native-paper';
import PlayDemo from './src/screens/play_demo'
var { width, height } = Dimensions.get('window');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};



export default class App extends Component<Props> {
  state = {
    overlayWidth:0,
      drawerWidth: new Animated.Value(0)
  }
  componentDidMount(){
      console.log("ddd")
  }
  onDismiss(){
      this.setState({ overlayWidth:0})
      Animated.timing(
          this.state.drawerWidth,
          {
              toValue:0,
              duration:120
          }
      ).start()

  }
  onOpen(){
    this.setState({ overlayWidth:width})
      Animated.timing(
          this.state.drawerWidth,
          {
            toValue:300,
              duration:120
          }
      ).start()


  }
  render() {
    const {drawer,overlay} = this.state
    return (
       <View style={styles.container}>
           <Provider store={store}>
               <PaperProvider>
                    <NavBar/>
                 <TabNavigator/>
                <PlayDemo/>
               </PaperProvider>
           </Provider>
        </View>


    );
  }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {

    flex: 1,
    marginTop:TOP,
    backgroundColor: '#f7f7f7',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom:0,
        opacity: 0.4,
        height:height,
        backgroundColor: 'black',
    },
    drawer:{
      zIndex:1,
        backgroundColor:"white",
        opacity:1,
        height:height,
        left:0,
        position:"absolute"
    },
    safeArea: {
        flex: 1,
        backgroundColor: "white"
    },

});


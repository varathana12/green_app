import React from 'react';
import { Text, View,Platform } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {Home} from "../screens/home";
import {Artist} from "../screens/artist";
import {Download} from "../screens/download";
import {theme} from "../constant/color";
import Icon from 'react-native-vector-icons/Ionicons';
import {icon, TAB} from "../constant/variable";
import {Top} from "../screens/top";
import IconAwsome from 'react-native-vector-icons/FontAwesome'
import PlayDemo from '../screens/play_demo'
const TabNavigator = createBottomTabNavigator({
        Music: {
            screen:Home,
            navigationOptions: {
                tabBarLabel:"Song",
                tabBarIcon: ({ tintColor }) => (
                    <IconAwsome name={"music"} color={tintColor} size={20}/>
                )
            },
        },
        // Play: {
        //     screen:PlayDemo,
        //     navigationOptions: {
        //         tabBarLabel:"Song",
        //         tabBarIcon: ({ tintColor }) => (
        //             <Icon name={icon+"musical-note"} color={tintColor} size={20}/>
        //         )
        //     },
        // },
        Artist: {
            screen:Artist,
            navigationOptions: {
                tabBarLabel:"Artist",
                tabBarIcon: ({ tintColor }) => (
                    <Icon name={icon+"microphone"} color={tintColor} size={20}/>
                )
            },
        },
        Top: {
            screen:Top,
            navigationOptions: {
                tabBarLabel:"Top Song",
                tabBarIcon: ({ tintColor }) => (
                    <IconAwsome name={"heart"} color={tintColor} size={20}/>
                )
            },
        },
        Download: {
            screen:Download,
            navigationOptions: {
                tabBarLabel:"Download",
                tabBarIcon: ({ tintColor }) => (
                    <IconAwsome name={"download"} color={tintColor} size={20}/>
                )
            },
        },

    },

    {
        tabBarOptions: {
            activeTintColor: "white",
            inactiveTintColor:theme,
            activeBackgroundColor:theme,
            showLabel:false,
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: 'white',
                borderTopWidth: 0,
                elevation:8,
                height:TAB


            },
            tabStyle:{

            }

        }
    }
);

export default createAppContainer(TabNavigator);

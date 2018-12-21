import {Platform,Dimensions,StatusBar} from 'react-native';

export const icon = Platform.OS === "ios" ? "ios-" : "md-";
export const mini_player_height = 100
export const small_player_height = 50
export const { width, height } = Dimensions.get('window');
export const BOTTOM = Platform.OS === "ios" ? 34 : 0;
export const TOP = Platform.OS === "ios" ? 44 : 0;
export const STATUS_BAR = Platform.OS === "ios" ? 0 : StatusBar.currentHeight;
export const TAB = 50


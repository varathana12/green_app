import React from 'react'
import {View, Animated, Text, StyleSheet,StatusBar,Platform,TextInput,Keyboard} from 'react-native'

import Icon from "react-native-vector-icons/Ionicons";
import IconAwsome from 'react-native-vector-icons/FontAwesome'
import {icon, TOP, width} from "./constant/variable";
import {theme} from "./constant/color";
import { Searchbar } from 'react-native-paper';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
class NavBar extends React.Component{
    state = {
        firstQuery: '',
    };
    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow () {
        alert('Keyboard Shown');
    }

    _keyboardDidHide () {
        alert('Keyboard Hidden');
    }
    componentDidMount(){

    }
    renderSearch(){
        const { firstQuery } = this.state;
        return(
            <View style={styles.container}>
                <TextInput
                    editable={true}
                    style={{width:width,height:64}}
                    label='Email'
                    value={this.state.text}
                    onChangeText={text => this.setState({ text })}
                    onSubmitEditing={Keyboard.dismiss}
                />
            </View>
        )
    }
    renderBar(){
        return(
            <View style={styles.container}>
                <View style={styles.element}>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}

                    />
                </View>

                <View style={styles.element}>
                    <Text style={[styles.title]}>
                        Music
                    </Text>
                </View>

                <View style={styles.element}>
                    <Text style={[styles.title,{right:22}]}>
                        <Icon
                            style={{fontWeight:400}}
                            name={icon+"search"}
                            color={theme}
                            size={25}
                        />
                    </Text>
                </View>
            </View>
        )
    }

    render(){
        return(
            <View>
                {this.renderBar()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        height:64,
        top:0,
        width:"100%",
        position:'absolute',
        elevation:8,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",

    },
    element:{
        width:80,
        backgroundColor:'transparent',
        justifyContent:"center"
    },
    title:{
        position:'absolute',
        fontSize:16,
        fontWeight:'400',
        justifyContent:'center',
        color:theme
    }
})
export default NavBar;

import React from 'react'
import {View,Text,StyleSheet,Dimensions, TouchableWithoutFeedback,Animated} from 'react-native'
var { width, height } = Dimensions.get('window');
import Icon from "react-native-vector-icons/Ionicons";
import {icon} from './constant/variable'
import {theme} from "./constant/color";

class Bottom_Nav extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            active: new Animated.Value(0),
            element_style:{},
            title_active:{}
        }

    }

    handleOnpress(value){
        switch(value){
            case 1:
                this.setState({
                    element_style:{first:styles.element_active},
                    title_active:{first:styles.title_active}
                })
                break;
            case 2:
                this.setState({
                    element_style:{second:styles.element_active},
                    title_active:{second:styles.title_active}
                })
                break
            case 3:
                this.setState({
                    element_style:{third:styles.element_active},
                    title_active:{third:styles.title_active}
                })
                break
        }
        Animated.timing(
            this.state.active,
            {
            toValue:100,
                duration:120
        }).start()
    }


    render(){
        const {active} = this.state
        const activeInterpolate = active.interpolate(
            {
                inputRange: [0, 100],
                outputRange: ["white", theme],
                extrapolate: 'clamp'
            }

        )
        var style_Active = {
            backgroundColor:activeInterpolate
        }
        return(
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={()=>this.handleOnpress(1)}>
                <View style={[styles.element,this.state.element_style.first]}>

                    <Icon
                        name={icon+"musical-note"}
                        style={[styles.icon,this.state.title_active.first]}
                        size={20}
                    />
                    <Text style={[styles.title,this.state.title_active.first]}>Music</Text>
                </View>
                </TouchableWithoutFeedback>


                <TouchableWithoutFeedback onPress={()=>this.handleOnpress(2)}>
                    <View style={[styles.element,this.state.element_style.second]}>

                        <Icon
                            name={icon+"microphone"}
                            style={[styles.icon,this.state.title_active.second]}
                            size={20}
                        />
                        <Text style={[styles.title,this.state.title_active.second]}>Artist</Text>
                    </View>
                </TouchableWithoutFeedback>


                <TouchableWithoutFeedback onPress={()=>this.handleOnpress(3)}>
                <View style={[styles.element,this.state.element_style.third]}>

                    <Icon
                        name={icon+"download"}
                        style={[styles.icon,this.state.title_active.third]}
                        size={20}
                    />
                    <Text style={[styles.title,this.state.title_active.third]}>Download</Text>
                </View>
                </TouchableWithoutFeedback>


            </View>
        )
    }

}

var styles = StyleSheet.create({
    container:{
        width:"100%",
        height:50,
        backgroundColor:"white",
        position:"absolute",
        elevation:8,
        bottom:0,
        flexDirection:"row",
        justifyContent:'space-between'
    },
    element:{
        height:"100%",
        width:width/3,
        justifyContent:"center",
        alignItems:"center",
        marginLeft:1,
        marginRight:1,
        flexDirection:'column',
        borderTopRightRadius:8,
        borderTopLeftRadius:8
    },
    title:{
        color: theme,
        fontWeight:"400",
        fontSize:12
    },
    icon:{
        color: theme,
        fontWeight:"400"
    },
    element_active:{
        backgroundColor:theme,
    },
    title_active:{
        color:"white",
        fontWeight:"400"
    }
})
export default Bottom_Nav;

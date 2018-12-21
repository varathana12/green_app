import React from 'react'
import {View,Text,StyleSheet,Image,Animated} from 'react-native'
import {width} from "./constant/variable";
import {Slide} from "./slider";
import Icon from "react-native-vector-icons/Ionicons";
import IconAwsome from "react-native-vector-icons/FontAwesome";
import {icon} from "./constant/variable";
import {theme} from "./constant/color";
import Ripple from 'react-native-material-ripple';

import LottieView from 'lottie-react-native';
export class MiniPlayer extends React.Component{


    render(){
        const {music_content,rotate} =this.props
        return(
            <View style={styles.container}>

                    <View style={styles.image_container}>
                        <Animated.Image style={[styles.image,rotate]}
                               source={{uri:music_content.src}}/>
                    </View>

                    <View style={{justifyContent:"center",width:"75%"}}>
                        <View >
                            <View style={{height:20,justifyContent:"center",width:"100%",alignItems:"center"}}>
                                <Text style={{color:"gray",fontSize:10,color:theme}}>
                                    {music_content.title? music_content.title.toUpperCase():""}</Text>
                            </View>

                            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",
                                marginVertical:5,paddingHorizontal:60}}>
                                <Ripple style={{height:25,width:25,
                                    opacity:0.8,
                                    backgroundColor:"white",
                                    borderColor:theme,
                                    alignItems:"center",justifyContent:"center"}}
                                        rippleContainerBorderRadius={30}
                                        rippleCentered={true}
                                        rippleColor={theme}
                                >
                                    <Image style={{width:20,height:20}} source={require('./asset/rewind.png')}/>
                                </Ripple>
                                <Ripple style={{height:35,width:35,alignItems:"center",
                                    opacity:0.8,
                                    backgroundColor:"white",
                                    borderColor:theme,
                                    justifyContent:"center"
                                    ,marginLeft:"20%",marginRight:"20%"}}
                                        rippleContainerBorderRadius={35}
                                        rippleCentered={true}
                                        rippleColor={theme}
                                >
                                <IconAwsome
                                    style={{fontWeight:300,paddingTop:5,paddingBottom:5}}
                                    name={"play-circle"}
                                    color={theme}
                                    size={35}
                                />
                                </Ripple>

                                <Ripple style={{height:25,width:25,
                                    backgroundColor:"white",
                                    borderColor:theme,
                                    opacity:0.8,

                                    alignItems:"center",justifyContent:"center"}}
                                        rippleContainerBorderRadius={30}
                                        rippleCentered={true}
                                        rippleColor={theme}

                                >
                                    <Image style={{width:20,height:20}} source={require('./asset/fast-forward-button.png')}/>
                                </Ripple>

                            </View>
                        </View>
                       <Slide/>
                    </View>




            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{

        height:100,
        backgroundColor:"white",
        flexDirection:"row"


    },
    image_container:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        width:"25%"
    },
    image:{
        width:65,
        height:65,
        borderRadius:65,
        opacity:0.8
    }
})

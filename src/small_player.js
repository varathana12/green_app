import React from 'react'
import {View,Text,StyleSheet,Image,Animated} from 'react-native'
import {width} from "./constant/variable";
import {Slide} from "./slider";
import Icon from "react-native-vector-icons/Ionicons";
import IconAwsome from "react-native-vector-icons/FontAwesome";
import {icon} from "./constant/variable";
import {theme} from "./constant/color";
import Ripple from 'react-native-material-ripple';
import MarqueeText from 'react-native-marquee';
import LottieView from 'lottie-react-native';
export class SmallPlayer extends React.Component{


    render(){
        const {music_content} =this.props
        const {title} = music_content
        return(
            <View style={styles.container}>

                <View style={styles.title_container}>
                    <LottieView
                        resizeMode="cover"
                        autoPlay={true}
                        style={[{width:40,height:40,opacity:0.9}]}
                        loop={true}
                        source={require('./asset/sound_visualizer-w600-h600')}

                    />
                    <View style={{paddingHorizontal:10}}>
                        <MarqueeText
                            style={{ fontSize: 24 }}
                            duration={10000}
                            marqueeOnStart={true}
                            loop
                            marqueeResetDelay={false}
                            marqueeDelay={ false}>
                            <Text style={styles.small_title}>{title? title.toUpperCase(): "Unknown"}</Text>
                        </MarqueeText>
                    </View>

                </View>


                        <View style={{flexDirection:"row",width:"40%",justifyContent:"space-around",alignItems:"center"}}>
                            <Ripple style={{height:36,width:36,
                                opacity:0.8,
                                backgroundColor:"white",
                                borderColor:theme,
                                alignItems:"center",justifyContent:"center"}}
                                    rippleContainerBorderRadius={36}
                                    rippleCentered={true}
                                    rippleColor={"gray"}
                            >
                                <Image style={{width:20,height:20}} source={require('./asset/rewind.png')}/>
                            </Ripple>
                            <Ripple style={{height:46,width:46,alignItems:"center",
                                opacity:0.8,
                                backgroundColor:"white",
                                borderColor:theme,
                                justifyContent:"center"}}
                                    rippleContainerBorderRadius={40}
                                    rippleCentered={true}
                                    rippleColor={"gray"}
                            >
                                <IconAwsome
                                    style={{fontWeight:300}}
                                    name={"play-circle"}
                                    color={theme}
                                    size={35}
                                />
                            </Ripple>

                            <Ripple style={{height:36,width:36,
                                backgroundColor:"white",
                                borderColor:theme,
                                opacity:0.8,

                                alignItems:"center",justifyContent:"center"}}
                                    rippleContainerBorderRadius={36}
                                    rippleCentered={true}
                                    rippleColor={theme}

                            >
                                <Image style={{width:20,height:20}} source={require('./asset/fast-forward-button.png')}/>
                            </Ripple>

                        </View>


                </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{

        height:50,
        backgroundColor:"white",
        flexDirection:"row"


    },
    title_container:{
        alignItems:"center",
        justifyContent:"flex-start",
        width:"60%",
        paddingHorizontal:10,
        flexDirection:"row"
    },
    image:{
        width:40,
        height:40,
        borderRadius:80,
        opacity:0.5
    },
    small_title:{
        color:theme,
        fontSize:11,
        opacity:0.8,
    }
})

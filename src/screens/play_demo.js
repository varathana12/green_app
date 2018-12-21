import React from 'react'
import {View,Animated,Text,Image,StyleSheet,PanResponder,TouchableWithoutFeedback} from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import {format_artist} from "../init/init";
import {width, height, TAB, STATUS_BAR,
    mini_player_height,small_player_height} from "../constant/variable";
import {theme} from "../constant/color";
import {BOTTOM} from "../constant/variable";
import {MiniPlayer} from "../mini_player";
import Icon from "react-native-vector-icons/Ionicons";
import IconAwsome from "react-native-vector-icons/FontAwesome";
import Ripple from 'react-native-material-ripple';
import Slider from 'react-native-slider'
import LottieView from 'lottie-react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';
import {SmallPlayer} from "../small_player";


import {connect} from 'react-redux'
const SCREEN_HEIGHT = height - STATUS_BAR
const initial_bottom = BOTTOM + TAB
const duration = 10 * 60 * 1000
const degree = (duration / 5000) * 360 +"deg"
class PlayDemo extends React.Component{

    constructor(props){
        super(props)

        this.animatedSpin = new Animated.Value(0);
        this.state ={
            slider: 0,
            type:"medium"
        }
    }

    spinImage(){
        Animated.timing(this.animatedSpin, {
            toValue: 360,
            duration: duration
        }).start(animation=>{
        })
    }
    componentDidMount(){
        this.spinImage()
        //setInterval(this.onHandlePlay(),10000)

        // Or set a specific startFrame and endFrame with:
    }

    onHandlePlay(){

        this.animatedSpin = new Animated.Value(0)
        this.spinImage()
        //setInterval(this.spinImage, 30000);
    }
    onPush(){
        //this.animatedSpin.stopAnimation()
    }

    componentWillMount(){
        const {is_close} = this.props
        var state_x = 0;
        this.height_player = mini_player_height
        this.state_transform = this.height_player
        this.panResponder = PanResponder.create({


            onMoveShouldSetPanResponder: (evt, gestureState) => {

                var getDy = Math.abs(gestureState.dy)
                var getDx = Math.abs(gestureState.dx)
                return (getDx >20 || getDy > 20) ? true : false

            },
            onPanResponderGrant: (evt, gestureState) => {
                //this.animated.extractOffset()
            },
            onPanResponderMove: (evt, gestureState) => {
                var getDy = gestureState.dy
                var setY = this.state_transform - getDy
                var getDx = gestureState.dx
                setY = setY >= SCREEN_HEIGHT? SCREEN_HEIGHT: setY
                setY = setY <= small_player_height? small_player_height : setY
                var absX = Math.abs(getDx)
                var absY = Math.abs(getDy)
                if((this.state_transform === this.height_player) && (absX > absY)){
                    if(absX > 20){

                        is_close.x.setValue(getDx)
                        state_x = getDx
                    }


                }else {
                    if(absY > 10){
                        is_close.setValue({x:0, y:setY})
                        state_x = 0

                    }
                    else{
                        is_close.x.setValue(0)
                        state_x = 0
                    }


                }

            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                var getDy = gestureState.dy
                var getDx = state_x

                if(Math.abs(getDx) > width - width/1.5){
                    if(getDx >= width - width/1.5){
                        Animated.spring(is_close.x, {
                            toValue: width,
                            duration:0,

                        }).start()
                    }else if(getDx <= - (width - width/1.5)){
                        Animated.spring(is_close.x, {
                            toValue: -width,
                            duration:0,

                        }).start()
                    }else{

                    }

                }
                else if (getDy < -50) {
                    if(this.state_transform === (SCREEN_HEIGHT)){
                        Animated.spring(is_close.y, {
                            toValue: SCREEN_HEIGHT,
                            duration:0,
                        }).start()
                        console.log("start")
                    }
                    else{

                        Animated.timing(is_close.y, {
                            toValue: SCREEN_HEIGHT,
                            duration:200,

                        }).start()
                        this.state_transform = SCREEN_HEIGHT
                    }


                }
                else if (getDy > 5) {
                    if(this.state_transform === (this.height_player)){
                        Animated.spring(is_close.y, {
                            toValue: small_player_height,
                            duration:0,
                        }).start()
                        this.height_player = small_player_height
                        this.state_transform = small_player_height
                        this.setState({type:"small"})
                    }else if(getDy > 50){
                        Animated.timing(is_close.y, {
                            toValue: this.height_player,
                            duration:200
                        }).start()
                        this.state_transform = this.height_player
                    }
                    else {
                        Animated.spring(is_close.y, {
                            toValue: this.state_transform,
                            duration:0,
                        }).start()
                    }
                }
                else {
                    Animated.parallel([
                        Animated.spring(is_close.y, {
                            toValue: this.state_transform,
                            duration:0,
                        }),
                        Animated.spring(is_close.x, {
                            toValue: 0,
                            duration:0,
                        })
                    ]).start()
                }
            }
        })
    }


    handleTypePlayer(){
        const {is_close}=  this.props
        Animated.spring(is_close.y, {
            toValue: mini_player_height,
            duration:0,
        }).start(res=>{
            this.height_player = mini_player_height
            this.state_transform = mini_player_height
        })
        this.setState({type:"medium"})
    }



    render(){
        const {is_close, music_content} = this.props
        const interpolateRotation = this.animatedSpin.interpolate({
            inputRange: [0, 360],
            outputRange: ["0deg", degree],
        })
        const animatedSpinStyle = {
             transform: [
                 { rotate: interpolateRotation }
             ]
        }
        const animatedQuit = {
            transform: [{translateX:is_close.x}]
        }
        const animatedOpacityX = is_close.x.interpolate({
            inputRange: [-width,0, width],
            outputRange: [0, 1, 0]
        })

        var animatedBottom = is_close.y.interpolate({
            inputRange: [this.height_player + 20, SCREEN_HEIGHT],
            outputRange: [initial_bottom, 0 ],
        })
        console.log(animatedBottom)

        var animatedOpacitySmallContainer = is_close.y.interpolate({
            inputRange: [this.height_player, this.height_player + 200],
            outputRange: [1, 0 ],
        })
        var animatedOpacityLargeContainer = is_close.y.interpolate({
            inputRange: [this.height_player + 200, SCREEN_HEIGHT],
            outputRange: [0,1 ],
        })
        var animatedElevation = is_close.y.interpolate({
            inputRange: [0, SCREEN_HEIGHT - 200],
            outputRange: [1,8 ],
        })
        const AnimatedTouchable = Animated.createAnimatedComponent(TouchableWithoutFeedback);

        return(
            <View {...this.panResponder.panHandlers}>
            <Animated.View

                style={[animatedQuit,styles.container,{height:is_close.y,bottom:animatedBottom,
                    elevation:animatedElevation,opacity:animatedOpacityX}]}>
                <Animated.View style={[{opacity:animatedOpacityLargeContainer},
                    styles.large_container]}>

                    <View style={styles.wrapper_large_image}>
                        <AnimatedCircularProgress
                            size={width - 180}
                            width={5}
                            fill={this.state.slider}
                            tintColor={theme}
                            onAnimationComplete={() => console.log('onAnimationComplete')}
                            backgroundColor={"#d3d3d3"} >
                            {
                                (fill) => (
                                    <LinearGradient
                                        colors={[theme,"white"]}
                                        style={{borderRadius:width - 192}}
                                        >
                                    <Animated.Image style={[styles.large_image,animatedSpinStyle]}
                                                    source={{uri:music_content.src}}/>
                                    </LinearGradient>
                                )
                            }

                        </AnimatedCircularProgress>

                    </View>
                    <View style={styles.wrapper_beat}>
                        <LottieView
                            style={styles.beat_image}
                            source={require('../asset/sound_visualizer-w600-h600')}

                            autoPlay={true}
                            loop={true}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.wrapper_large_title}>
                        <Text style={styles.large_title}>{music_content.title? music_content.title.toUpperCase():""}</Text>
                        <Text style={styles.artist}>{music_content.artist}</Text>
                    </View>
                    <View style={styles.wrapper_slider}>
                        <View style={{flexDirection:"row",justifyContent:"space-between",width:width,paddingHorizontal:20}}>
                            <Ripple style={{height:30,width:60,
                                backgroundColor:"white",
                                borderColor:theme,
                                alignItems:"center",justifyContent:"center"}}
                                    rippleCentered={true}
                                    rippleContainerBorderRadius={60}
                                    rippleColor={theme}
                            >
                                <Icon
                                    style={{fontWeight:300}}
                                    name={"ios-shuffle"}
                                    color={theme}
                                    size={25}
                                />
                            </Ripple>
                            <Ripple style={{height:30,width:60,
                                backgroundColor:"white",
                                borderColor:theme,
                                alignItems:"center",justifyContent:"center"}}
                                    rippleContainerBorderRadius={60}
                                    rippleCentered={true}
                                    rippleColor={theme}
                            >
                                <Icon
                                    style={{fontWeight:300}}
                                    name={"ios-repeat"}
                                    color={theme}
                                    size={25}
                                />
                            </Ripple>
                        </View>
                        <Slider
                            style={{width:width - 40,
                                position:"relative",height:25,borderRadius:25}}
                            thumbTintColor={theme}
                            minimumTrackTintColor={theme}
                            minimumValue={0}
                            step={1}
                            maximumValue={100}
                            value={this.state.slider}
                            onValueChange={slider=> {
                                clearTimeout(this.sliderTimeoutId)
                                this.sliderTimeoutId = setTimeout(() => {
                                    this.setState({slider})
                                }, 50)
                            }}
                        />
                        <View style={styles.wrapper_time}>
                            <Text style={styles.time}>00:00</Text>
                            <Text style={styles.time}>03:12</Text>
                        </View>
                    </View>
                    <View style={styles.wrapper_music_control}>
                        <Ripple style={{height:45,width:45,
                            opacity:0.8,
                            borderColor:theme,
                            borderRadius:45,

                            alignItems:"center",justifyContent:"center"}}
                                rippleContainerBorderRadius={30}
                                rippleCentered={true}
                                rippleColor={theme}
                        >
                            <Image style={{width:30,height:30}} source={require('../asset/rewind.png')}/>
                        </Ripple>
                        <Ripple style={{height:60,width:60,alignItems:"center",
                            elevation:0,
                            backgroundColor:"white",
                            borderColor:theme,
                            opacity:0.8,
                            borderRadius:30,
                            justifyContent:"center",
                            alignItems:"center",
                            paddingLeft:5,marginLeft:"20%",marginRight:"20%"}}
                                rippleContainerBorderRadius={30}
                                rippleCentered={true}
                                rippleColor={theme}
                        >
                            <IconAwsome
                                style={{fontWeight:300}}
                                name={"play-circle"}
                                color={theme}
                                size={60}
                            />
                        </Ripple>

                        <Ripple style={{height:45,width:45,
                            backgroundColor:"white",
                            borderColor:theme,
                            opacity:0.8,
                            borderRadius:25,
                            alignItems:"center",justifyContent:"center"}}
                                rippleContainerBorderRadius={30}
                                rippleCentered={true}
                                rippleColor={theme}

                        >
                        <Image style={{width:30,height:30}} source={require('../asset/fast-forward-button.png')}/>
                        </Ripple>
                    </View>

                </Animated.View>

                    <TouchableWithoutFeedback onPress={()=>this.handleTypePlayer()}>
                    <Animated.View style={[{opacity:animatedOpacitySmallContainer},styles.small_container]}>
                    {
                        this.state.type === "medium"
                            ?<MiniPlayer rotate={animatedSpinStyle} music_content={music_content}/>
                            :<SmallPlayer music_content={music_content}/>
                    }

                    </Animated.View>
                    </TouchableWithoutFeedback>


            </Animated.View>
            </View>
        )
    }

}



const mapStateToProps = state =>{
    return {
        is_close:state.is_close,
        music_content:state.music_content
    }
}
export default connect(mapStateToProps)(PlayDemo)


var styles = StyleSheet.create({
    container:{
        position:"absolute",
        width:width,
        backgroundColor:"white",
        elevation:0,
    },
    more:{
      height:"5%",
      width:width
    },
    large_container:{
        position:"absolute",
        width:width,
        backgroundColor:"white",
        flexDirection:"column",
        height:"100%"

    },
    small_container:{
        position:"absolute",
        flexDirection:"row",

    },
    wrapper_small_image:{
        width:"30%",
        height:"100%",
        justifyContent:"center",

    },
    wrapper_large_image:{
        width:width - 24,
        marginLeft:12,
        height:"35%",
        alignItems:"center",
        justifyContent:"center"
    },
    small_image:{
        borderRadius:80,
        width:80,
        height:80

    },
    large_image:{
        width:width- 192,
        height:width - 192,
        borderRadius:width -192,
        opacity:0.3
    },
    wrapper_beat:{
        width:width,
        justifyContent:"center",
        alignItems:"center",
        height:"10%",
        opacity:0.7

    },
    beat_image:{
        width:width - 96,
        height:100,


    },
    wrapper_large_title:{
        width:width,

        alignItems:"center",
        justifyContent:"center",
        height:"15%"
    },
    large_title:{
        fontSize:14,
        color:theme,
        opacity:0.7,
        fontWeight:"500"
    },
    artist:{
        fontSize:14,
        color:"gray"
    },
    wrapper_music_control:{
        width:width,
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems:"center",
        height:"15%",
        paddingHorizontal:60,
        opacity:1
    },
    wrapper_slider:{
        justifyContent: 'center',
        alignItems: 'center',
        height:"20%",
    },
    wrapper_time:{
        justifyContent:"space-between",
        flexDirection:"row",
        paddingHorizontal:30,
        width:width
    },
    time:{
        color:theme,
        fontSize:12
    }

})

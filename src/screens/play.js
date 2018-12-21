import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    PanResponder,
    ScrollView,
    Image,
    Slider
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {BOTTOM, TAB, TOP} from "../constant/variable";

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const initial_transform = (BOTTOM + TAB+TOP + 100)
class AppleMusicUI extends Component {

    state = {
        isScrollEnabled: false,
        styles_image: {
            position:"relative",

        }
    }
    componentWillMount() {

        this.scrollOffset = 0
        var state_transform = SCREEN_HEIGHT - initial_transform
        this.animation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - initial_transform })

        this.panResponder = PanResponder.create({

            onMoveShouldSetPanResponder: (evt, gestureState) => {
                // console.log(this.scrollOffset)
                // if ((state_transform === (-SCREEN_HEIGHT+initial_transform) && gestureState.dy < 0)
                // || (state_transform === (SCREEN_HEIGHT - initial_transform) && gestureState.dy > 0)
                // ) {
                //
                //     return false
                // } else {
                //
                //     return true
                // }
                return true
            },
            onPanResponderGrant: (evt, gestureState) => {
                this.animation.extractOffset()
            },
            onPanResponderMove: (evt, gestureState) => {
               // console.log(gestureState.dy)
                this.animation.setValue({ x: 0, y: gestureState.dy })
            },
            onPanResponderRelease: (evt, gestureState) => {
                const getDy = gestureState.dy
                // if (gestureState.moveY > SCREEN_HEIGHT - initial_transform) {
                //     console.log("first")
                //     Animated.spring(this.animation.y, {
                //         toValue: 0,
                //         tension: 1
                //     }).start()
                // }

                   if (getDy < -50) {
                        if(state_transform === (-SCREEN_HEIGHT + initial_transform)){
                            Animated.spring(this.animation.y, {
                                toValue: 0,
                                duration:0,
                            }).start()
                            console.log("start")
                        }
                        else{

                            Animated.timing(this.animation.y, {
                                toValue: -SCREEN_HEIGHT + initial_transform,
                                duration:200,

                            }).start()
                            state_transform = -SCREEN_HEIGHT + initial_transform
                        }


                }
                else if (getDy > 80) {
                    if(state_transform === (SCREEN_HEIGHT - initial_transform)){
                        Animated.spring(this.animation.y, {
                            toValue: 0,
                            duration:0,
                        }).start()
                    }else {
                        Animated.timing(this.animation.y, {
                            toValue: SCREEN_HEIGHT - initial_transform,
                            duration:200
                        }).start()
                        state_transform = SCREEN_HEIGHT - initial_transform
                    }
                }
                else {
                       Animated.spring(this.animation.y, {
                           toValue: 0,
                           duration:0,
                       }).start()
                   }
                console.log(this.animation.y._value)

            }

        })
    }

    render() {

        const animatedHeight = {
            transform: this.animation.getTranslateTransform()
        }

        animatedImageHeight = this.animation.y.interpolate({
            inputRange: [0, SCREEN_HEIGHT - initial_transform],
            outputRange: [SCREEN_WIDTH, 32],
            extrapolate: "clamp"
        })
        animatedSongTitleOpacity = this.animation.y.interpolate({
            inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - initial_transform],
            outputRange: [0, 0, 1],
            extrapolate: "clamp"
        })
        animatedImageMarginLeft = this.animation.y.interpolate({
            inputRange: [0, SCREEN_HEIGHT - initial_transform],
            outputRange: [0, 10],
            extrapolate: "clamp"
        })

        animatedHeaderHeight = this.animation.y.interpolate({
            inputRange: [0, SCREEN_HEIGHT - initial_transform],
            outputRange: [SCREEN_HEIGHT / 2, 90],
            extrapolate: "clamp"
        })
        animatedSongDetailsOpacity = this.animation.y.interpolate({
            inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - initial_transform],
            outputRange: [1, 0, 0],
            extrapolate: "clamp"
        })
        animatedBackgroundColor = this.animation.y.interpolate({
            inputRange: [0, SCREEN_HEIGHT - initial_transform],
            outputRange: ['white','transparent',],
            extrapolate: "clamp"
        })
        return (
            <Animated.View style={{ flex: 1, backgroundColor: animatedBackgroundColor,position:"absolute",zIndex:12 ,
                width:SCREEN_WIDTH,height:SCREEN_HEIGHT}}>
                <Animated.View
                    {... this.panResponder.panHandlers}
                    style={[animatedHeight, { position: 'absolute',
                        left: 0, right: 0, zIndex: 10, backgroundColor: 'white', height: SCREEN_HEIGHT }]}
                >
                        <Animated.View
                            style={{ height: animatedHeaderHeight, borderTopWidth: 1,
                                borderTopColor: '#ebe5e5', flexDirection: 'row', alignItems: 'center' }}
                        >
                            <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                                <Animated.View style={{ height: animatedImageHeight,
                                    width: animatedImageHeight, marginLeft: animatedImageMarginLeft }}>
                                    <Animated.Image style={{borderRadius:animatedImageHeight, flex: 1, width: null, height: null }}
                                           source={{uri:"https://prodrumloops.com/wp-content/uploads/2017/01/shape-of-me.jpg"}} />
                                </Animated.View>
                                <Animated.Text style={{ opacity: animatedSongTitleOpacity, fontSize: 18, paddingLeft: 10 }}>Hotel California(Live)</Animated.Text>
                            </View>
                            <Animated.View style={{ opacity: animatedSongTitleOpacity, flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Ionicons name="md-pause" size={32} />
                                <Ionicons name="md-play" size={32} />
                            </Animated.View>
                        </Animated.View>

                        <Animated.View style={{ height: animatedHeaderHeight, opacity: animatedSongDetailsOpacity }}>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Hotel California (Live)</Text>
                                <Text style={{ fontSize: 18, color: '#fa95ed' }}>Eagles - Hell Freezes Over</Text>
                            </View>

                            <View style={{ height: 40, width: SCREEN_WIDTH, alignItems: 'center' }}>
                                <Slider
                                    style={{ width: 300 }}
                                    step={1}
                                    minimumValue={18}
                                    maximumValue={71}
                                    value={18}

                                />
                            </View>

                            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <Ionicons name="md-rewind" size={40} />
                                <Ionicons name="md-pause" size={50} />
                                <Ionicons name="md-fastforward" size={40} />
                            </View>
                        </Animated.View>
                </Animated.View>

            </Animated.View>
        );
    }
}
export default AppleMusicUI;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

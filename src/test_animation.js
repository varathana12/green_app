import React from 'react'
import { Animated, Text, View,TouchableWithoutFeedback,Dimensions} from 'react-native';


class TestAnimation extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            opacity: new Animated.Value(1),
            color: new Animated.Value(0),
            width: new Animated.Value(100),
            styleButton: styles.flatButton,
            text: styles.textFlat
        }
        this.animateValue = new Animated.Value(0)
    }

    componentDidMount(){
        Animated.parallel([
            Animated.timing(
                this.animateValue,
                {
                    toValue: 150,
                    duration: 1000
                }
            ),
            Animated.timing(
                this.state.width,
                {
                    toValue: 200,
                    duration: 200
                }
            )
        ])
        .start()

    }
    handleOnpressIn(){
        //this.setState({styleButton:styles.flatButton,text:styles.textFlat})
        Animated.timing(
            this.state.opacity,
            {
                toValue:0.5,
                duration:200
            }
        ).start()

    }
    handleOnpressOut(){
        //this.setState({styleButton:styles.fullButton,text:styles.text})
        Animated.timing(
            this.state.opacity,
            {
                toValue:1.0,
                duration:200
            }
        ).start()
    }


    render(){
        const {color, opacity} = this.state
        const {onClick} = this.props
        const interPolate = this.animateValue.interpolate(
            {
                inputRange: [0, 150],
                outputRange: ["#000", "red"],
                extrapolate: 'clamp'
            }
        )
        return(
            <View>
                <TouchableWithoutFeedback onPress={()=>{onClick()}} onPressIn={()=>this.handleOnpressIn()} onPressOut={()=>this.handleOnpressOut()}>
                    <Animated.View style={[this.state.styleButton,{width:this.state.width,opacity:opacity}]}>
                        <Text style={this.state.text}>
                            Button
                        </Text>
                    </Animated.View>
                </TouchableWithoutFeedback>

            </View>
        )

    }

}

const styles = {
    fullButton:{
        height:60,
        backgroundColor:"white",
        borderColor:"#2ecc71",
        borderRadius:100,
        borderWidth:4,

        justifyContent:"center",
        alignItems:"center"
    },
    text:{
      fontSize:16,
      fontWeight:"bold",
      color:"#2ecc71"
    },
    flatButton:{
        height:60,
        backgroundColor:"#2ecc71",
        borderRadius:100,
        justifyContent:"center",
        alignItems:"center"
    },
    textFlat:{
        fontSize:16,
        fontWeight:"bold",
        color:"white"
    },

}

export default TestAnimation

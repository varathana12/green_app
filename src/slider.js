import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Slider
} from 'react-native';
import {width} from "./constant/variable";
import {theme} from "./constant/color";

export class Slide extends Component {
    constructor() {
        super();
        this.state = {
            value: 30
        };
        this.getVal = this.getVal.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    // Set the Default State

    getVal(val) {
        console.warn(val);
    }
    onChange(v) {
        this.setState({ val: Math.round(v) });
        console.log(this.state);
    }
    render() {
        const {style} =this.props

        return (

                <Slider
                    style={[{width:"100%",elevation:8,position:"relative",height:20}]}
                    thumbTintColor={theme}
                    maximumTrackTintColor={theme}
                    minimumTrackTintColor={theme}
                    minimumValue={0}
                    maximumValue={100}
                    value={this.state.value}
                    onValueChange={value => this.setState({ value })}
                />


        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:20,
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        backgroundColor: 'red',
        elevation:8,

    },
});

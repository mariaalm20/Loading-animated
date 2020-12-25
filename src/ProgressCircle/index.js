import React, {useRef, useEffect} from 'react';
import {
  Easing,
  Animated,
  StyleSheet,
} from 'react-native';
import Svg, { G, Circle} from 'react-native-svg';
import Wave from './components/WaveAnimation'
import Christams from './components/Christmas'
import { Container, Text } from './styles';

const AnimatedText = Animated.createAnimatedComponent(Text);

export default function AnimatedView({
  percentage = 75,
  radius = 80,
  strokeWidth = 2,
  duration = 8000,
  color = "",
  textColor,
  max = 400
}) {
  const animated = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  const inputRef = useRef();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = (toValue) => {
    return Animated.timing(animated, {
      delay: 1000,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      animation(toValue === 0 ? percentage : 0);
    });
  };

 useEffect(() => {
    animation(percentage);
    animated.addListener((v) => {
      const maxPerc = 100 * v.value / max;
      const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}%`,
        });
      }
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    }, [max, percentage]);

    return () => {
      animated.removeAllListeners();
    };
  });

  return (
    <>
    <Christams />
    <Container>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G
          rotation="180"
          origin={`${halfCircle}, ${halfCircle }`}>
          <Wave />
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
            loop={true}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>
      <AnimatedText
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        radius={radius}
        textColor={textColor}
        color={color}
        style={{...StyleSheet.absoluteFill}}
      />
    </Container>
    </>
  );
}

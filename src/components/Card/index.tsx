import React, { useMemo } from 'react';
import { View } from 'react-native';
import Text, { TextProps } from '../Text';

function Card(props: View['props'] & { flat?: boolean }) {
  const shadow = useMemo(() => {
    if (props.flat) {
      return {};
    } else {
      return {
        shadowColor: '#cdcdcd',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 5,
        borderRadius: 5,
      };
    }
  }, [5, props.flat, '#000']);

  const viewStyle = Array.isArray(props.style)
    ? [
      {
        backgroundColor: '#242424',
        ...shadow,
      },
      ...props.style,
    ]
    : ([
      {
        backgroundColor: '#242424',
        ...shadow,
      },
      props.style,
    ] as View['props']['style']);

  return <View style={viewStyle}>{props.children}</View>;
}

Card.Title = (props: TextProps) => {
  const textStyle = [
    { fontSize: 20, fontWeight: '500' },
    ...(Array.isArray(props.style) ? props.style : [props.style]),
  ] as TextProps['style'];

  return (
    <Text enfase style={textStyle}>
      {props.children}
    </Text>
  );
};

export default Card;

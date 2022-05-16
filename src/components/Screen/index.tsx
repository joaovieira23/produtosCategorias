import React from 'react';
import { View } from 'react-native';

interface Props {
  children: View['props']['children'];
  forceContrast?: boolean;
}

function Screen(props: Props) {

  const backgroundColor = '#ffffff';

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
      }}
    >
      {props.children}
    </View>
  );
}

export default Screen;

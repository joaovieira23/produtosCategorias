import React from 'react';
import { View } from 'react-native';
import Text from '../Text';

import { useFonts } from 'expo-font';

interface HeaderProps {
  goBack?: () => void;
  title?: string;
  iconePerfil?: boolean;
}

export default function Header({
  title,
}: HeaderProps) {



  return (
    <View>
      {title &&
        <View
          style={{
            marginTop: 64,
            height: 30,
            margin: 16,
          }}
        >
          <Text h2 style={{ textAlign: 'center', fontFamily: 'Poppins-Bold', color: '#000000' }}>{title}</Text>
        </View>
      }

    </View>
  );
}

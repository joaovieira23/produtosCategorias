import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ButtonTab() {
  return (

    <View style={{ width: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 30, backgroundColor: '#120a8f', marginBottom: 16, overflow: 'hidden', height: 60 }}>
      <Icon name="plus" color={'#FFF'} size={36} />
    </View>
  )
};
import React, { useState, useEffect } from 'react';
import { Dimensions, View, TouchableOpacity } from 'react-native';
import Card from '../../components/Card';
import Text from '../../components/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';

export default function LimitesCategoria({ icon, local, status, color, produto, tipo }: { icon?: string, local: string, produto?: object, status?: string, tipo: string, color?: string }) {
  const { width } = Dimensions.get('screen');

  <Card
    style={{
      width: width * 0.949,
      height: 180,
      borderRadius: 5,
      marginBottom: 2,
      backgroundColor: '#2E8B57',
      justifyContent: 'center',
    }}
  >
    <View style={{ marginLeft: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ marginRight: 32, flexDirection: 'row' }}>
        <Icon name={icon} size={28} color={color ? '#000000' : '#FFFFFF'} />
        <Text h4 style={{ marginLeft: 16, color: color ? '#000000' : '#ffffff', fontFamily: 'Poppins-Bold' }}>{local}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 16, fontFamily: 'Poppins-Bold' }}>{status}</Text>
        <Icon name="chevron-right" style={{ marginRight: 16, color: color ? '#000000' : '#FFFFFF' }} size={28} />
      </View>
    </View>
    <View style={{ margin: 16 }}>
      {produto?.qtdEstoque <= produto?.estoqueMinimo &&
        <View style={{ backgroundColor: '#A52A2A', width: 160, height: 20, alignItems: 'center', borderRadius: 4, }}>
          <Text style={{ fontFamily: 'Montserrat-Bold' }}>Alerta de Estoque</Text>
        </View>
      }
      {tipo === 'categoria' ?
        <>
          <Text style={{ fontFamily: 'Montserrat-Bold' }}>{`Código: ${produto?.id}`}</Text>
          <Text style={{ fontFamily: 'Montserrat-Bold' }}>{`Descrição: ${produto?.descricao}`}</Text>
        </> :
        <>
          <Text style={{ fontFamily: 'Montserrat-Bold' }}>{`Código: ${produto?.id}`}</Text>
          <Text style={{ fontFamily: 'Montserrat-Bold' }}>{`Código da Categoria: ${produto?.categoria}`}</Text>
          <Text style={{ fontFamily: 'Montserrat-Bold' }}>{`Quantidade em estoque: ${produto?.qtdEstoque}`}</Text>
          <Text style={{ fontFamily: 'Montserrat-Bold' }}>{`Estoque Mínimo: ${produto?.estoqueMinimo}`}</Text>
          <Text style={{ fontFamily: 'Montserrat-Bold' }}>{`Ativo: ${produto?.ativo === 1 ? 'Sim' : 'Não'}`}</Text>
        </>
      }
    </View>
  </Card >
}
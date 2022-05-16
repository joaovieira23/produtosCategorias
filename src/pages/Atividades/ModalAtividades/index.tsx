import React, { useState } from 'react';
import { View, Platform, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Touchable from '../../../components/Touchable';
import Text from '../../../components/Text';
import TextInput from '../../../components/Input';
import Button from '../../../components/Button';
import useFormField from '../../../hooks/useFormField';
import axios from 'axios';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';


export default function ModalCRUD(props: any) {

  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const descricao = useFormField({
    defaultValue: '',
    validate: v => v.length > 1,
  });

  async function editCategoria() {
    setLoading(true);

    try {
      const { data } = await axios.put('http://848d-2804-431-c7d1-9812-1082-665a-7f72-7c91.ngrok.io/categorias', {
        id: props.atv.id,
        descricao: descricao.value
      });

      Alert.alert('Concluido', "Categoria editada com sucesso")

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.warn('e', e)
    }
  }

  async function deleteCategoria() {
    setLoadingDelete(true);

    Alert.alert('Tem certeza que deseja deletar essa categoria', 'Essa operação não poderá ser desfeita', [
      {
        text: 'Não',
      },
      {
        text: 'Sim!',
        onPress: async () => {
          const data = await axios.delete('http://848d-2804-431-c7d1-9812-1082-665a-7f72-7c91.ngrok.io/categorias', {
            data: {
              id: props.atv.id
            }
          });

          console.warn('jhyu', props.atv.id)

          setLoadingDelete(false);
          Alert.alert('Pronto', 'A categoria foi deletada com sucesso!');
        },
      },
    ]);
  }



  return (
    <>
      <Modal
        style={{ margin: '4%' }}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        isVisible={props.showModal}
        onBackdropPress={() => props.setShowModal(false)}
      >
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 10, marginVertical: '20%', padding: 14 }}>
          <View style={{ paddingVertical: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
              <Text h2 style={{ maxWidth: 300, color: '#000000', fontFamily: 'Poppins-Bold' }}>
                {'Editar Categoria'}
              </Text>

              <Touchable onPress={() => props.setShowModal(false)}>
                <Icon size={24} color={'#cdcdcd'} name="close" />
              </Touchable>
            </View>

            <TextInput
              placeholderTextColor={'white'}
              autoCapitalize="none"
              colorPlaceholder
              label={'Descrição'}
              value={descricao.value}
              onChangeText={novoNome => descricao.setValue(novoNome)}
              error={descricao.error ? 'Campo obrigatório' : undefined}
              onFocus={() => descricao.setFocus(true)}
              onBlur={() => descricao.setFocus(false)}
            />

            <View style={{ marginTop: 54, alignItems: 'center' }}>
              <Button
                loading={loading}
                label={"Editar"}
                onPress={() => editCategoria()} />
              <Button
                negativo
                loading={loadingDelete}
                label={"Excluir"}
                onPress={() => deleteCategoria()} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
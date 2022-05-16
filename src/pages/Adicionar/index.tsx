import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native'
import TextInput from '../../components/Input';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Text from '../../components/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import useFormField from '../../hooks/useFormField';
import Screen from '../../components/Screen';
//@ts-ignore
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export default function Adicionar() {
  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(1);

  const [openFormulario, setOpenFormulario] = useState(false);

  const [value, setValue] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [valueFormulario, setValueFormulario] = useState(1);
  const [items, setItems] = useState([
    {
      value: 1,
      icon: () => <Icon color={'#4081ec'} name='arrow-all' size={24} />,
      label: "Ativo",
    },
    {
      value: 2,
      icon: () => <Icon color={'#4081ec'} name='check-outline' size={24} />,
      label: "Inativo",
    }
  ]);

  const [tipoFormulario, setTipoFormulario] = useState([
    {
      value: 1,
      icon: () => <Icon color={'#4081ec'} name='ungroup' size={24} />,
      label: "Produto",
    },
    {
      value: 2,
      icon: () => <Icon color={'#4081ec'} name='trackpad' size={24} />,
      label: "Categoria",
    }
  ]);

  const descricao = useFormField({
    defaultValue: '',
    validate: v => v.length > 1,
  });

  const qtdEstoque = useFormField({
    defaultValue: '',
    validate: v => v.length > 0,
  });

  const estoqueMinimo = useFormField({
    defaultValue: '',
    validate: v => v.length > 0,
  });

  const fetchApi = async () => {
    try {
      const { data } = await axios.get('http://848d-2804-431-c7d1-9812-1082-665a-7f72-7c91.ngrok.io/categorias');
      const categoriasFormatadas = data.map((ct) => {
        return {
          value: ct.id,
          icon: () => <Icon color={'#4081ec'} name='trackpad' size={24} />,
          label: ct.descricao
        }
      });

      setCategorias(categoriasFormatadas);
    } catch (error) {
      console.warn('error', error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [])

  async function adicionarProdutosECategorias() {
    if (valueFormulario === 2) {
      setLoading(true);
      await axios.post('http://848d-2804-431-c7d1-9812-1082-665a-7f72-7c91.ngrok.io/categorias', {
        descricao: descricao.value
      });

      Alert.alert('Parabens', 'Categoria criada com sucesso');
      setLoading(false);
    } else if (valueFormulario === 1) {
      setLoading(true);
      await axios.post('http://848d-2804-431-c7d1-9812-1082-665a-7f72-7c91.ngrok.io/produtos', {
        descricao: descricao.value,
        categoria: value2,
        qtdEstoque: qtdEstoque.value,
        estoqueMinimo: estoqueMinimo.value,
        ativo: value === 1 ? true : false
      });

      Alert.alert('Parabens', 'Produto criado com sucesso');
      setLoading(false);
    }
  }

  return (
    <Screen forceContrast>
      <KeyboardAwareScrollView contentContainerStyle={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
      }} >
        <View style={{ paddingHorizontal: 12, marginTop: 8 }}>
          <Header title="Adicionar" />
          <DropDownPicker
            placeholder={'Selecione uma categoria'}
            open={openFormulario}
            value={valueFormulario}
            items={tipoFormulario}
            setOpen={setOpenFormulario}
            //@ts-ignore
            setValue={setValueFormulario}
            setItems={setTipoFormulario}
          />
          <View style={{ padding: 24, flex: 1, justifyContent: 'space-between' }}>
            <View style={{ marginVertical: 32 }}>
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

              {valueFormulario === 1 &&
                <>
                  <View style={{ marginTop: 8 }}>
                    <View style={{ marginBottom: open2 ? 164 : 0 }}>
                      <Text style={{ color: '#000000', marginBottom: 8 }}>Categoria a escolher</Text>
                      <DropDownPicker
                        placeholder={'Selecione uma categoria'}
                        textStyle={{
                          fontFamily: 'Poppins-Medium'
                        }}
                        open={open2}
                        value={value2}
                        items={categorias}
                        setOpen={setOpen2}
                        //@ts-ignore
                        setValue={setValue2}
                        setItems={setCategorias}
                      />
                    </View>
                  </View>

                  <TextInput
                    placeholderTextColor={'white'}
                    autoCapitalize="none"
                    colorPlaceholder
                    label={'Quantidade em Estoque'}
                    value={qtdEstoque.value}
                    onChangeText={novoNome => qtdEstoque.setValue(novoNome)}
                    error={qtdEstoque.error ? 'Campo obrigatório' : undefined}
                    onFocus={() => qtdEstoque.setFocus(true)}
                    onBlur={() => qtdEstoque.setFocus(false)}
                  />

                  <TextInput
                    placeholderTextColor={'white'}
                    autoCapitalize="none"
                    colorPlaceholder
                    label={'Estoque Mínimo'}
                    value={estoqueMinimo.value}
                    onChangeText={novoNome => estoqueMinimo.setValue(novoNome)}
                    error={estoqueMinimo.error ? 'Campo obrigatório' : undefined}
                    onFocus={() => estoqueMinimo.setFocus(true)}
                    onBlur={() => estoqueMinimo.setFocus(false)}
                  />

                  <View style={{ marginTop: 8 }}>
                    <DropDownPicker
                      placeholder={'Selecione uma categoria'}
                      textStyle={{
                        fontFamily: 'Poppins-Medium'
                      }}
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      //@ts-ignore
                      setValue={setValue}
                      setItems={setItems}
                    />
                  </View>
                </>
              }
            </View>
          </View>


          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <Button loading={loading} onPress={() => adicionarProdutosECategorias()} label="Salvar" />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
}
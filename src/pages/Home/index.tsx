import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import ListaAtividades from '../../components/ListaAtividades'
import Header from '../../components/Header'
import { useIsFocused } from '@react-navigation/native';
import Text from '../../components/Text'
import CheckBox from 'react-native-check-box'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import ModalCRUD from '../../pages/Home/ModalCRUD';
import axios from 'axios';

export default function Home() {
  const [showModalExtrato, setShowModalExtrato] = useState(false);
  const [clickAtv, setClickAtv] = useState();
  const [produtos, setProdutos] = useState([]);
  const isFocused = useIsFocused();
  const [selecionado, setSelecionado] = useState([]);
  const [listarEstoque, setListarEstoque] = useState(false);

  const fetchApi = async () => {
    try {
      const { data } = await axios.get('http://848d-2804-431-c7d1-9812-1082-665a-7f72-7c91.ngrok.io/produtos');
      setSelecionado(data);
      setProdutos(data);
    } catch (error) {
      console.warn('error', error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [isFocused, showModalExtrato])

  function handleClickAtividade(atv: any) {
    setShowModalExtrato(true);
    setClickAtv(atv);
  }

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [items, setItems] = useState([
    {
      value: 1,
      icon: () => <Icon color={'#4081ec'} name='arrow-all' size={24} />,
      label: "Todos",
    },
    {
      value: 2,
      icon: () => <Icon color={'#4081ec'} name='check-outline' size={24} />,
      label: "Ativos",
    },
    {
      value: 3,
      icon: () => <Icon color={'#4081ec'} name='alert-circle-outline' size={24} />,
      label: "Inativos",

    },
  ]);

  const [openOrdenacao, setOpenOrdenacao] = useState(false);
  const [valueOrdenacao, setValueOrdenacao] = useState();
  const [itemsOrdenacao, setItemsOrdenacao] = useState([
    {
      value: 'id',
      icon: () => <Icon color={'#4081ec'} name='code-array' size={24} />,
      label: "Código",
    },
    {
      value: 'descricao',
      icon: () => <Icon color={'#4081ec'} name='comment-multiple' size={24} />,
      label: "Descrição",
    },
    {
      value: 'qtdEstoque',
      icon: () => <Icon color={'#4081ec'} name='arrange-send-backward' size={24} />,
      label: "Quantidade Estoque",

    },
  ]);

  function dynamicSort(property) {
    return function (a, b) {
      return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    }
  }

  useEffect(() => {
    if (value === 1) {
      setSelecionado(produtos)
    } else if (value === 2) {
      setSelecionado(produtos.filter((mc) => mc.ativo === 1));
    } else {
      setSelecionado(produtos.filter((mc) => mc.ativo === 0));
    }
  }, [value, valueOrdenacao])


  useEffect(() => {
    if (listarEstoque) {
      setSelecionado(selecionado.sort(dynamicSort(valueOrdenacao)).filter((st) => st.qtdEstoque <= st.estoqueMinimo))
    } else setSelecionado(produtos)
  }, [listarEstoque])

  return (
    <ScrollView >
      <SafeAreaView>
        <Header title="Produtos" />
        <View style={{ marginBottom: openOrdenacao ? 64 : 0 }}>
          <View style={{ padding: 24 }}>
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
            <View style={{ marginTop: open ? 128 : 16, }}>
              <Text h2 style={{ color: '#000000', marginBottom: 4, fontFamily: 'Poppins-Bold' }}>Ordenar por: </Text>
              <DropDownPicker
                placeholder={'Ordenar por'}
                textStyle={{
                  fontFamily: 'Poppins-Medium'
                }}
                open={openOrdenacao}
                value={valueOrdenacao}
                items={itemsOrdenacao}
                setOpen={setOpenOrdenacao}
                //@ts-ignore
                setValue={setValueOrdenacao}
                setItems={setItemsOrdenacao}
              />
            </View>
            <CheckBox
              style={{ flex: 1, padding: 10, marginTop: openOrdenacao ? 128 : 0 }}
              onClick={() => {
                setListarEstoque(!listarEstoque)
              }}
              isChecked={listarEstoque}
              leftText={"Mostrar produtos com quantidade no estoque inferior ou igual ao minimo"}
            />
          </View>
        </View>
        {selecionado.sort(dynamicSort(valueOrdenacao)).map((atv, index) =>
          <TouchableOpacity
            key={index}
            onPress={() => handleClickAtividade(atv)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
              width: '100%',
            }}
          >
            <ListaAtividades icon="arrange-bring-to-front" produto={atv} local={atv.descricao} status={atv.categoria} />
          </TouchableOpacity>
        )}

        {showModalExtrato && (
          <ModalCRUD
            atv={clickAtv}
            showModal={showModalExtrato}
            setShowModal={setShowModalExtrato}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
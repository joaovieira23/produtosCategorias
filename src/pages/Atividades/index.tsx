import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
// import { createTable, obtemTodosTiposAtividades } from '../../api/src/db';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Screen from '../../components/Screen';
import Header from '../../components/Header';
import ListaAtividades from '../../components/ListaAtividades';
import { useIsFocused } from '@react-navigation/native';
import ModalAtividades from './ModalAtividades';
import axios from 'axios';
//@ts-ignore
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export default function Adicionar() {
  const [showModalExtrato, setShowModalExtrato] = useState(false);
  const isFocused = useIsFocused();
  const [produtos, setProdutos] = useState([]);
  const [tipoAtividade, setTipoAtividade] = useState("");
  const [tipoAtividadeList, setTipoAtividadeList] = useState([]);
  const [recarregaTela, setRecarregaTela] = useState(true);
  const [produtoSelecionado, setProdutoSelecionado] = useState();
  const [criarTabela, setCriarTabela] = useState(false);

  const fetchApi = async () => {
    try {
      const { data } = await axios.get('http://848d-2804-431-c7d1-9812-1082-665a-7f72-7c91.ngrok.io/categorias');
      setProdutos(data);
    } catch (error) {
      console.warn('error', error);
    }
  };


  useEffect(() => {
    fetchApi();
  }, [isFocused, showModalExtrato])

  if (!produtos) {
    return <ActivityIndicator size={32} style={{ alignItems: 'center' }} />
  }


  async function processamentoUseEffect() {

    if (!criarTabela) {
      setCriarTabela(true);
      // await createTable();
    }
    if (recarregaTela) {
      await carregaDados();
    }
  }
  useEffect(
    () => {
      processamentoUseEffect();
    }, [recarregaTela]);

  async function carregaDados() {
    try {
      // const tipoAtividade = await obtemTodosTiposAtividades();
      //@ts-ignore
      setTipoAtividadeList(tipoAtividade);
      setRecarregaTela(false);
    } catch (e: any) {
      Alert.alert(e.toString());
    }
  };

  function handleClickProduto(atv) {
    setShowModalExtrato(true);
    setProdutoSelecionado(atv);
  }

  return (
    <Screen forceContrast>
      <KeyboardAwareScrollView contentContainerStyle={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
      }} >
        <Header title="Categorias" />
        <>
          {produtos?.map((atv, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleClickProduto(atv)}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,
                width: '100%',
              }}
            >
              <ListaAtividades tipo="categoria" color="#FFFF00" icon="trackpad" produto={atv} />
            </TouchableOpacity>
          ))}
        </>


        {showModalExtrato && (
          <ModalAtividades
            atv={produtoSelecionado}
            showModal={showModalExtrato}
            setShowModal={setShowModalExtrato}
          />

        )}
      </KeyboardAwareScrollView>
    </Screen>
  );
}
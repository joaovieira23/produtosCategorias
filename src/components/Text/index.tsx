import React, { Fragment, useMemo } from 'react';
import { Text as RNText, Platform } from 'react-native';

export type TextProps = {
  enfase?: boolean;
  subtexto?: boolean;
  desabilitado?: boolean;
  link?: boolean;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
} & RNText['props'];

function Text(props: TextProps) {
  const corTexto = useMemo(() => {
    if (props.enfase) {
      return '#cdcdcd';
    } else if (props.subtexto) {
      return '#cdcdcd';
    } else if (props.desabilitado) {
      return '#cdcdcd';
    } else if (props.link) {
      return '#cdcdcd';
    }
  }, [props.enfase, props.subtexto, props.desabilitado, props.link]);

  const tamanhoFonte = useMemo(() => {
    if (props.h1) {
      // if (Platform.OS === 'web') {
      // 	return 22;
      // }
      return Platform.OS === 'ios' ? 25 : 24;
    } else if (props.h2) {
      // if (Platform.OS === 'web') {
      // 	return 18;
      // }
      return Platform.OS === 'ios' ? 21 : 20;
    } else if (props.h3) {
      // if (Platform.OS === 'web') {
      // 	return 14;
      // }
      return Platform.OS === 'ios' ? 17 : 16;
    } else if (props.h4) {
      // if (Platform.OS === 'web') {
      // 	return 12;
      // }
      return Platform.OS === 'ios' ? 15 : 14;
    } else if (props.h5) {
      // if (Platform.OS === 'web') {
      // 	return 10;
      // }
      return Platform.OS === 'ios' ? 13 : 12;
    } else if (props.h6) {
      // if (Platform.OS === 'web') {
      // 	return 8;
      // }
      return Platform.OS === 'ios' ? 11 : 10;
    }
  }, [props.h1, props.h2, props.h3, props.h4, props.h5, props.h6]);

  const style = [
    { color: corTexto || 'rgba(255, 255, 255, 0.6)' },
    tamanhoFonte ? { fontSize: tamanhoFonte } : {},
    props.style,
  ] as RNText['props'];

  return (
    <Fragment>
      <RNText {...props} style={style} />
    </Fragment>
  );
}

export default Text;

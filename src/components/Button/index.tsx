import React from 'react';
import { ActivityIndicator, Text, View, ViewStyle, TextStyle } from 'react-native';
import Touchable from '../Touchable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
	loading?: boolean;
	label?: string;
	onPress: () => any;
	labelColor?: string;
	accessibilityLabel?: string;
	containerStyle?: ViewStyle;
	labelStyle?: TextStyle;
	outlined?: boolean;
	disable?: boolean;
	icon?: string;
	negativo?: boolean;
	neutro?: boolean;
	excluir?: boolean;
	fontSize?: number;
	sizeIcon?: number;
	width?: number;
	height?: number
	border?: boolean;
}

export default function TextButton(props: Props) {
	const { loading, label, onPress, fontSize = 16, negativo, labelColor = '#120a8f', icon, sizeIcon = 20, disable = false, width = 302, height = 48 } = props;
	const Container = disable ? View : Touchable;

	return (
		<Container accessibilityLabel={props.accessibilityLabel} onPress={() => !loading && onPress()}>
			<View
				//@ts-ignore
				style={{
					borderRadius: 25,
					overflow: 'hidden',
					marginBottom: 16,
					borderColor: negativo ? 'red' : '#120a8f',
					borderWidth: 1,
					width: '100%',
					padding: 8
				}}
			>
				<View pointerEvents="auto">
					<>
						{Boolean(icon) && (
							<View style={{ marginRight: label ? 10 : 0 }}>
								{/*
                // @ts-ignore */}
								<Icon name={icon} size={sizeIcon} color={labelColor} />
							</View>
						)}

						{!loading ? (
							<Text
								style={[
									{
										fontFamily: 'Montserrat-Bold',
										letterSpacing: 1,
										fontSize: fontSize,
										color: negativo ? 'red' : '#120a8f',
										fontWeight: '500',
										textAlign: 'center',
									},
									props.labelStyle,
								]}
							>
								{label?.toUpperCase()}
							</Text>
						) : (
							<ActivityIndicator style={{ marginLeft: 7.5 }} size="small" color={labelColor} />
						)}
					</>
				</View>
			</View>
		</Container>
	);
}

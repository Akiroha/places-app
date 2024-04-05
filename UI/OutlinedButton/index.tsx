import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import styles from './styles';

interface Props {
	children: string;
	icon: any;
	onPress: () => void;
}

export default (props: Props) => {
	return (
		<Pressable
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
			onPress={props.onPress}
		>
			<Ionicons
				style={styles.icon}
				name={props.icon}
				size={18}
				color={Colors.primary500}
			/>
			<Text style={styles.text}>{props.children}</Text>
		</Pressable>
	);
};

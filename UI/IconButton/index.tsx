import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

interface Props {
	icon: any;
	size: number;
	color?: string;
	onPress: () => void;
}

export default ({ icon, size, color = 'black', onPress }: Props) => {
	return (
		<Pressable
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
			onPress={onPress}
		>
			<Ionicons name={icon} size={size} color={color} onPress={onPress} />
		</Pressable>
	);
};

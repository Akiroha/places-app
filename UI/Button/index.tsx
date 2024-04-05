import { Pressable, Text } from 'react-native';
import styles from './styles';

interface Props {
	children: string;
	onPress: () => void;
}

export default (props: Props) => {
	return (
		<Pressable
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
			onPress={props.onPress}
		>
			<Text style={styles.button}>{props.children}</Text>
		</Pressable>
	);
};

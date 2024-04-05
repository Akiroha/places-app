import { Image, Pressable, Text, View } from 'react-native';
import { Place } from '../../types';
import styles from './styles';

interface Props {
	place: Place;
	onSelect: (id: string) => void;
}

export default ({ place, onSelect }: Props) => {
	return (
		<Pressable
			style={({ pressed }) => [styles.item, pressed && styles.pressed]}
			onPress={onSelect.bind(this, place.id!)}
		>
			<Image style={styles.image} source={{ uri: place.imageUri }} />
			<View style={styles.info}>
				<Text style={styles.title}>{place.title}</Text>
				{/* @ts-ignore */}
				<Text style={styles.location}>{`${place.lat}, ${place.long}`}</Text>
			</View>
		</Pressable>
	);
};

import { FlatList, Text, View } from 'react-native';
import { Place } from '../../types';
import PlaceItem from '../PlaceItem';
import styles from './styles';
import { usePlacesList } from './PlacesList.hooks';

interface Props {
	places: Place[];
}

export default ({ places }: Props) => {
	const { selectPlaceHandler } = usePlacesList();

	if (places.length === 0) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>
					No places found. Maybe start adding some!
				</Text>
			</View>
		);
	}

	return (
		<FlatList
			style={styles.list}
			data={places}
			renderItem={({ item }) => (
				<PlaceItem place={item} onSelect={selectPlaceHandler} />
			)}
			keyExtractor={(item) => item.id!}
		/>
	);
};

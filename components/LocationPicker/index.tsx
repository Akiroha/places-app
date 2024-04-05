import { Image, Text, View } from 'react-native';
import OutlinedButton from '../../UI/OutlinedButton';
import { useLocationPicker } from './LocationPicker.hooks';
import styles from './styles';
import { getMapPreview } from '../../services/location';

export interface Props {
	onPickLocation: (location: { lat: number; long: number }) => void;
}

export default (props: Props) => {
	const { pickedLocation, getLocationHandler, pickOnMapHandler } =
		useLocationPicker(props);

	let locationPreview = <Text>No Location picked yet.</Text>;

	if (pickedLocation) {
		// locationPreview = (
		// 	<Image
		// 		style={styles.mapPreview}
		// 		// @ts-ignore
		// 		source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.long) }}
		// 	/>
		// );

		locationPreview = (
			<Text>
				Latitude: {pickedLocation.lat}, Longitude: {pickedLocation.long}
			</Text>
		);
	}

	return (
		<View>
			<View style={styles.mapPreview}>{locationPreview}</View>
			<View style={styles.actions}>
				<OutlinedButton icon="location" onPress={getLocationHandler}>
					Locate User
				</OutlinedButton>
				<OutlinedButton icon="map" onPress={pickOnMapHandler}>
					Pick on Map
				</OutlinedButton>
			</View>
		</View>
	);
};

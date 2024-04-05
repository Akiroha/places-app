import { Image, ScrollView, View, Text } from 'react-native';
import OutlinedButton from '../../UI/OutlinedButton';
import { usePlaceDetails } from './PlaceDetails.hooks';
import styles from './styles';
import { NavigationProp, RouteProp } from '@react-navigation/native';

export interface Props {
	route: RouteProp<Record<string, object | undefined>, string>;
	navigation: NavigationProp<Record<string, object | undefined>>;
}

export default (props: Props) => {
	const { fetchedPlace, showOnMapHandler } = usePlaceDetails(props);

	if (!fetchedPlace) {
		return (
			<View style={styles.fallback}>
				<Text>Loading place data...</Text>
			</View>
		);
	}

	return (
		<ScrollView>
			<Image style={styles.image} source={{ uri: fetchedPlace?.imageUri }} />
			<View style={styles.locationContainer}>
				<View style={styles.addressContainer}>
					<Text style={styles.address}>
						{/* @ts-ignore */}
						{fetchedPlace?.lat}, {fetchedPlace?.long}
					</Text>
				</View>
				<OutlinedButton icon="map" onPress={showOnMapHandler}>
					View on Map
				</OutlinedButton>
			</View>
		</ScrollView>
	);
};

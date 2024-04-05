import MapView, { Marker } from 'react-native-maps';
import { useMap } from './Map.hooks';
import styles from './styles';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import IconButton from '../../UI/IconButton';

export interface Props {
	navigation: NavigationProp<any>;
	route: RouteProp<Record<string, object | undefined>, string>;
}

export default (props: Props) => {
	const {
		region,
		selectLocationHandler,
		selectedLocation,
		savePickedLocationHandler,
		initialLocation,
	} = useMap(props);

	useLayoutEffect(() => {
		if (initialLocation) {
			return;
		}

		props.navigation.setOptions({
			headerRight: ({ tintColor }: { tintColor: string }) => (
				<IconButton
					icon="save"
					color={tintColor}
					size={24}
					onPress={savePickedLocationHandler}
				/>
			),
		});
	}, [props.navigation, savePickedLocationHandler, initialLocation]);

	return (
		<MapView
			initialRegion={region}
			style={styles.map}
			onPress={selectLocationHandler}
		>
			{selectedLocation && (
				<Marker
					title="Picked Location"
					coordinate={{
						latitude: selectedLocation.lat,
						longitude: selectedLocation.long,
					}}
				/>
			)}
		</MapView>
	);
};

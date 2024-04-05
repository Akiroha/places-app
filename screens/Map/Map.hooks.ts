import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { MapPressEvent } from 'react-native-maps';
import { Props } from '.';

export const useMap = (props: Props) => {
	const initialLocation = props.route.params && {
		// @ts-ignore
		lat: props.route.params?.initialLat,
		// @ts-ignore
		long: props.route.params?.initialLong,
	};

	const [selectedLocation, setSelectedLocation] = useState<{
		lat: number;
		long: number;
	} | null>(initialLocation ?? null);

	const region = {
		latitude: initialLocation ? initialLocation.lat : 37.78,
		longitude: initialLocation ? initialLocation.long : -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	const selectLocationHandler = (event: MapPressEvent) => {
		if (initialLocation) {
			return;
		}
		const lat = event.nativeEvent.coordinate.latitude;
		const long = event.nativeEvent.coordinate.longitude;

		setSelectedLocation({ lat, long });
	};

	const savePickedLocationHandler = useCallback(() => {
		if (!selectedLocation) {
			Alert.alert(
				'No location picked!',
				'You have to pick a location (by tapping on the map) first!',
				[{ text: 'Okay' }]
			);
			return;
		}

		props.navigation.navigate('AddPlace', {
			pickedLat: selectedLocation.lat,
			pickedLong: selectedLocation.long,
		});
	}, [props.navigation, selectedLocation]);

	return {
		region,
		selectLocationHandler,
		selectedLocation,
		savePickedLocationHandler,
		initialLocation,
	};
};

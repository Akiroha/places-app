import {
	getCurrentPositionAsync,
	PermissionStatus,
	useForegroundPermissions,
} from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
	useNavigation,
	useRoute,
	useIsFocused,
} from '@react-navigation/native';
import { Props } from '.';

export const useLocationPicker = (props: Props) => {
	const [pickedLocation, setPickedLocation] = useState<{
		lat: number;
		long: number;
	} | null>(null);
	const navigation = useNavigation();
	const route = useRoute();
	const [locationPermissionInformation, requestPermission] =
		useForegroundPermissions();
	const isFocused = useIsFocused();

	useEffect(() => {
		if (pickedLocation) {
			props.onPickLocation(pickedLocation);
		}
	}, [pickedLocation, props.onPickLocation]);

	const verifyPermissions = async () => {
		if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
			Alert.alert(
				'Insufficient permissions!',
				'You need to grant location permissions to use this app.',
				[{ text: 'Okay' }]
			);
			return false;
		}

		if (
			locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
		) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}

		return true;
	};

	const getLocationHandler = async () => {
		try {
			const hasPermission = await verifyPermissions();

			if (!hasPermission) {
				return;
			}

			const location = await getCurrentPositionAsync();

			setPickedLocation({
				lat: location.coords.latitude,
				long: location.coords.longitude,
			});
		} catch (error) {
			console.log('LocationPicker.hooks.ts error: ', error);
		}
	};

	const pickOnMapHandler = async () => {
		// @ts-ignore
		navigation.navigate('Map');
	};

	useEffect(() => {
		if (route.params && isFocused) {
			setPickedLocation({
				// @ts-ignore
				lat: route.params.pickedLat,
				// @ts-ignore
				long: route.params.pickedLong,
			});
		}
	}, [route.params && isFocused]);

	return {
		pickedLocation,
		getLocationHandler,
		pickOnMapHandler,
	};
};

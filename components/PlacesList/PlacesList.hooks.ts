import { useNavigation } from '@react-navigation/native';

export const usePlacesList = () => {
	const navigation = useNavigation();

	const selectPlaceHandler = (id: string) => {
		// @ts-ignore
		navigation.navigate('PlaceDetails', {
			placeId: id,
		});
	};

	return { selectPlaceHandler };
};

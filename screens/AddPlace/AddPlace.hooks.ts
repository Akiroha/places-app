import { Props } from '.';
import { insertPlace } from '../../services/database';
import { Place } from '../../types';

export const useAddPlace = (props: Props) => {
	const createPlaceHandler = async (place: Place) => {
		await insertPlace(place);

		props.navigation.navigate('AllPlaces');
	};

	return {
		createPlaceHandler,
	};
};

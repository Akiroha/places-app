import { useEffect, useState } from 'react';
import { Props } from '.';
import { fetchPlaceDetails } from '../../services/database';
import { Place } from '../../types';

export const usePlaceDetails = (props: Props) => {
	// @ts-ignore
	const selectedPlaceId = props?.route?.params?.placeId;
	const [fetchedPlace, setFetchedPlace] = useState<Place | null>(null);

	const showOnMapHandler = () => {
		props.navigation.navigate('Map', {
			// @ts-ignore
			initialLat: fetchedPlace?.lat,
			// @ts-ignore
			initialLong: fetchedPlace?.long,
		});
	};

	useEffect(() => {
		// use selectedPlaceId to fetch place details
		const loadPlace = async () => {
			const place = await fetchPlaceDetails(selectedPlaceId);
			setFetchedPlace(place);
			props.navigation.setOptions({ title: place.title });
		};

		loadPlace();
	}, [selectedPlaceId]);

	return {
		fetchedPlace,
		showOnMapHandler,
	};
};

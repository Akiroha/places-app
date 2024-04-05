import { useEffect, useState } from 'react';
import { Props } from '.';
import { useIsFocused } from '@react-navigation/native';
import { Place } from '../../types';
import { fetchPlaces } from '../../services/database';

export const useAllPlaces = (props: Props) => {
	const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

	const isFocused = useIsFocused();

	useEffect(() => {
		const loadPlaces = async () => {
			const places = await fetchPlaces();
			setLoadedPlaces(places);
		};
		if (isFocused) {
			loadPlaces();
			// setLoadedPlaces((prevPlaces) => [...prevPlaces, place]);
		}
	}, [isFocused]);

	return {
		loadedPlaces,
	};
};

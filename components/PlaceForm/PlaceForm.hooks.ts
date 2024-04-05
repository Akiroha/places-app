import { useCallback, useState } from 'react';
import { Props } from '.';
import { Place } from '../../types';

export const usePlaceForm = (props: Props) => {
	const [enteredTitle, setEnteredTitle] = useState('');
	const [pickedImage, setPickedImage] = useState<string | null>(null);
	const [pickedLocation, setPickedLocation] = useState<{
		lat: number;
		long: number;
	} | null>(null);

	const changeTitleHandler = (text: string) => {
		setEnteredTitle(text);
	};

	const takeImageHandler = (imageUri: string) => {
		setPickedImage(imageUri);
	};

	const pickLocationHandler = useCallback(
		(location: { lat: number; long: number }) => {
			setPickedLocation(location);
		},
		[]
	);

	const savePlaceHandler = () => {
		const place: Place = {
			imageUri: pickedImage!,
			location: pickedLocation!,
			title: enteredTitle,
			id: Math.random().toString(),
		};

		props.onCreatePlace(place);
	};

	return {
		enteredTitle,
		changeTitleHandler,
		savePlaceHandler,
		takeImageHandler,
		pickLocationHandler,
	};
};

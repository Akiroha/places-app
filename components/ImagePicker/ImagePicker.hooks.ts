import {
	launchCameraAsync,
	useCameraPermissions,
	PermissionStatus,
} from 'expo-image-picker';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Props } from '.';

export const useImagePicker = (props: Props) => {
	const [takenImage, setTakenImage] = useState<string | null>(null);
	const [cameraPermissionInformation, requestPermission] =
		useCameraPermissions();

	const verifyPermissions = async () => {
		if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
			Alert.alert(
				'Insufficient permissions!',
				'You need to grant camera permissions to use this app.',
				[{ text: 'Okay' }]
			);
			return false;
		}

		if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}

		return true;
	};

	const takeImageHandler = async () => {
		try {
			const hasPermission = await verifyPermissions();

			if (!hasPermission) {
				return;
			}

			const image = await launchCameraAsync({
				allowsEditing: true,
				aspect: [16, 9],
				quality: 0.5,
			});

			if (image?.canceled) {
				return;
			}

			setTakenImage(image?.assets[0].uri);
			props.onTakeImage(image?.assets[0].uri);
		} catch (error) {
			console.log('ImagePicker.hooks.ts error: ', error);
		}
	};

	return { takeImageHandler, takenImage };
};

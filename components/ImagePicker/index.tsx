import { Image, Text, View } from 'react-native';
import { useImagePicker } from './ImagePicker.hooks';
import styles from './styles';
import OutlinedButton from '../../UI/OutlinedButton';

export interface Props {
	onTakeImage: (imageUri: string) => void;
}

export default (props: Props) => {
	const { takeImageHandler, takenImage } = useImagePicker(props);

	let imagePreview = <Text>No image picked yet.</Text>;

	if (takenImage) {
		imagePreview = <Image source={{ uri: takenImage }} style={styles.image} />;
	}

	return (
		<View>
			<View style={styles.imagePreview}>{imagePreview}</View>
			<OutlinedButton icon="camera" onPress={takeImageHandler}>
				Take Image
			</OutlinedButton>
		</View>
	);
};

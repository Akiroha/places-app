import { ScrollView, Text, TextInput, View } from 'react-native';
import { usePlaceForm } from './PlaceForm.hooks';
import styles from './styles';
import ImagePicker from '../ImagePicker';
import LocationPicker from '../LocationPicker';
import Button from '../../UI/Button';
import { Place } from '../../types';

export interface Props {
	onCreatePlace: (place: Place) => void;
}

export default (props: Props) => {
	const {
		enteredTitle,
		changeTitleHandler,
		savePlaceHandler,
		takeImageHandler,
		pickLocationHandler,
	} = usePlaceForm(props);

	return (
		<ScrollView style={styles.form}>
			<View>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.input}
					onChangeText={changeTitleHandler}
					value={enteredTitle}
				/>
			</View>
			<ImagePicker onTakeImage={takeImageHandler} />
			<LocationPicker onPickLocation={pickLocationHandler} />
			<Button onPress={savePlaceHandler}>Add Place</Button>
		</ScrollView>
	);
};

import { NavigationProp } from '@react-navigation/native';
import PlaceForm from '../../components/PlaceForm';
import { useAddPlace } from './AddPlace.hooks';

export interface Props {
	navigation: NavigationProp<any>;
}

export default (props: Props) => {
	const { createPlaceHandler } = useAddPlace(props);

	return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

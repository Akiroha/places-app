import { RouteProp } from '@react-navigation/native';
import PlacesList from '../../components/PlacesList';
import { useAllPlaces } from './AllPlaces.hooks';

export interface Props {
	route: RouteProp<any, any>;
}

export default (props: Props) => {
	const { loadedPlaces } = useAllPlaces(props);

	return <PlacesList places={loadedPlaces} />;
};

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { useEffect } from 'react';
import { init } from './services/database';
import * as SplashScreen from 'expo-splash-screen';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
	useEffect(() => {
		const initialize = async () => {
			await init();

			SplashScreen.hideAsync();
		};

		initialize();
	}, []);

	return (
		<>
			<StatusBar style="auto" />
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerStyle: {
							backgroundColor: Colors.primary500,
						},
						headerTintColor: Colors.gray700,
						contentStyle: { backgroundColor: Colors.gray700 },
						headerBackTitle: 'Back',
					}}
				>
					<Stack.Screen
						name="AllPlaces"
						component={AllPlaces}
						options={({ navigation }) => ({
							title: 'Your Favorite Places',
							headerRight: ({ tintColor }) => (
								<IconButton
									icon="add"
									size={24}
									color={tintColor}
									onPress={() => navigation.navigate('AddPlace')}
								/>
							),
						})}
					/>
					<Stack.Screen
						name="AddPlace"
						component={AddPlace}
						options={{
							title: 'Add a new Place',
						}}
					/>
					<Stack.Screen
						name="Map"
						component={Map}
						options={{
							title: 'Pick a Location on the Map',
						}}
					/>
					<Stack.Screen
						name="PlaceDetails"
						component={PlaceDetails}
						options={{
							title: 'Loading Place...',
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}

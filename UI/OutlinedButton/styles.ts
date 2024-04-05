import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

export default StyleSheet.create({
	button: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		margin: 4,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: Colors.primary500,
	},
	pressed: {
		opacity: 0.7,
	},
	icon: {
		marginRight: 6,
	},
	text: {
		fontSize: 16,
		color: Colors.primary500,
	},
});

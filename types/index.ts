export interface Place {
	id?: string;
	title: string;
	imageUri: string;
	location: {
		lat: number;
		long: number;
	};
}

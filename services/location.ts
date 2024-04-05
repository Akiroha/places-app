export const getMapPreview = (lat: number, long: number) => {
	return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap
  &markers=color:red%7Clabel:S%7C${lat},${long}
  &key=YOUR_API_KEY&signature=YOUR_SIGNATURE`;
};

import * as SQLite from 'expo-sqlite';
import { Place } from '../types';

const database = SQLite.openDatabase('places.db');

export const init = () => {
	const promise = new Promise<void>((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        lat REAL NOT NULL,
        long REAL NOT NULL
      )`,
				[],
				() => {
					resolve();
				},
				// @ts-ignore
				(_, error) => {
					reject(error);
				}
			);
		});
	});

	return promise;
};

export const insertPlace = (place: Place) => {
	const promise = new Promise<void>((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`INSERT INTO places (title, imageUri, lat, long) VALUES (?, ?, ?, ?)`,
				[place.title, place.imageUri, place.location.lat, place.location.long],
				(_, result) => {
					console.log('database.ts result: ', result);
					// @ts-ignore
					resolve(result);
				},
				// @ts-ignore
				(_, error) => {
					reject(error);
				}
			);
		});
	});

	return promise;
};

export const fetchPlaces = () => {
	const promise = new Promise<Place[]>((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`SELECT * FROM places`,
				[],
				(_, result) => {
					const places: Place[] = result.rows._array;
					resolve(places);
				},
				// @ts-ignore
				(_, error) => {
					reject(error);
				}
			);
		});
	});

	return promise;
};

export const fetchPlaceDetails = (id: string) => {
	const promise = new Promise<Place>((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`SELECT * FROM places WHERE id = ?`,
				[id],
				(_, result) => {
					const place: Place = result.rows._array[0];
					resolve(place);
				},
				// @ts-ignore
				(_, error) => {
					reject(error);
				}
			);
		});
	});

	return promise;
};

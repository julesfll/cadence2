import axios from 'axios';
import { browser } from '$app/env';

const accessToken = browser && window.sessionStorage.getItem('accessToken');
const instance = axios.create({
	baseURL: 'https://api.spotify.com/v1/',
	headers: {
		Authorization: 'Bearer ' + accessToken
	}
});

export async function getUserProfile(): Promise<SpotifyApi.CurrentUsersProfileResponse> {
	const res = await instance.get('/me');
	return res.data;
}

export async function searchForItem(query: string): Promise<SpotifyApi.SearchResponse> {
	const res = await instance.get('/search', {
		params: {
			q: query,
			type: 'track'
		}
	});
	return res.data;
}

export async function getAudioFeatures(
	tracks: SpotifyApi.TrackObjectFull[]
): Promise<SpotifyApi.AudioFeaturesObject[]> {
	const ids = tracks.map((track) => track.id);
	const features: SpotifyApi.AudioFeaturesObject[] = [];

	for (let i = 0; i < ids.length; i += 100) {
		const res = await instance.get('/audio-features', {
			params: { ids: ids.slice(i, i + 100).join() }
		});
		features.push(...res.data.audio_features);
	}
	return features;
}

export async function createPlaylist(
	userId: string,
	tracks: SpotifyApi.TrackObjectFull[],
	name: string
): Promise<SpotifyApi.CreatePlaylistResponse> {
	const createPlaylistRes = await instance.post(`/users/${userId}/playlists`, {
		name,
		public: false
	});
	for (let i = 0; i < tracks.length; i += 100) {
		const addItemsRes = await instance.post(`/playlists/${createPlaylistRes.data.id}/tracks`, {
			uris: tracks.slice(i, i + 100).map((track) => track.uri)
		});
	}
	return createPlaylistRes.data;
}

export async function getUserTopItems(limit: number): Promise<SpotifyApi.UsersTopTracksResponse> {
	const res = await instance.get('/me/top/tracks', {
		params: {
			limit
		}
	});
	return res.data;
}

export async function getUserPlaylists(): Promise<SpotifyApi.PlaylistObjectFull[]> {
	const playlists: SpotifyApi.PlaylistObjectFull[] = [];
	let res = await instance.get('/me/playlists', { params: { limit: 50 } });
	while (res.data.next) {
		playlists.push(...res.data.items);
		res = await instance.get(res.data.next);
	}
	playlists.push(...res.data.items);

	return playlists;
}

export async function getPlaylistItems(id: string): Promise<SpotifyApi.TrackObjectFull[]> {
	const tracks: SpotifyApi.TrackObjectFull[] = [];
	let res: { data: SpotifyApi.PlaylistTrackResponse } = await instance.get(
		`/playlists/${id}/tracks`,
		{
			params: { limit: 100 }
		}
	);

	while (res.data.next) {
		tracks.push(
			...res.data.items.filter((track) => track.track.type === 'track').map((item) => item.track)
		);
		res = await instance.get(res.data.next);
	}
	tracks.push(
		...res.data.items.filter((track) => track.track.type === 'track').map((item) => item.track)
	);
	return tracks;
}

export async function getSavedTracks(): Promise<SpotifyApi.TrackObjectFull[]> {
	const tracks: SpotifyApi.TrackObjectFull[] = [];
	let res: { data: SpotifyApi.UsersSavedTracksResponse } = await instance.get('/me/tracks', {
		params: { limit: 50 }
	});
	while (res.data.next) {
		tracks.push(...res.data.items.map((item) => item.track));
		console.log(res.data.next);
		res = await instance.get(res.data.next);
	}
	tracks.push(...res.data.items.map((item) => item.track));
	return tracks;
}

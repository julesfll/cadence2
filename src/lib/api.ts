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
	ids: string[]
): Promise<SpotifyApi.MultipleAudioFeaturesResponse> {
	const res = await instance.get(`/audio-features`, {
		params: {
			ids: ids.join(',')
		}
	});
	return res.data;
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

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

export async function getAudioFeatures(ids: string[]): Promise<SpotifyApi.MultipleAudioFeaturesResponse> {
	const res = await instance.get(`/audio-features`, {
		params: {
			ids: ids.join(',')
		}
	});
	return res.data;
}

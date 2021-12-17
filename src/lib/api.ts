import axios from 'axios';
import { browser } from '$app/env';

const accessToken = browser && window.sessionStorage.getItem('accessToken');
const instance = axios.create({
	baseURL: 'https://api.spotify.com/',
	headers: {
		Authorization: 'Bearer ' + accessToken
	}
});

export async function getUserProfile(): Promise<SpotifyApi.CurrentUsersProfileResponse> {
	const res = await instance.get('/v1/me');
	return res.data;
}

export async function searchForItem(query: string): Promise<SpotifyApi.SearchResponse> {
	const res = await instance.get('/v1/search', {
		params: {
			q: query,
			type: 'track'
		}
	});
	return res.data;
}

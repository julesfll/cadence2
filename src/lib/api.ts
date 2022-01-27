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

export async function searchForItem(
	query: string,
	types = ['track']
): Promise<SpotifyApi.SearchResponse> {
	const res = await instance.get('/search', {
		params: {
			q: query,
			type: types.join(',')
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

export async function addTracksToPlaylist(
	id: string,
	tracks: SpotifyApi.TrackObjectFull[],
	removeDuplicates = false
): Promise<SpotifyApi.AddTracksToPlaylistResponse> {
	if (removeDuplicates) {
		const existingTrackIds = (await getPlaylist(id)).tracks.items.map((item) => item.track.id);
		tracks = tracks.filter((track) => !existingTrackIds.includes(track.id));
	}

	let res: { data: SpotifyApi.AddTracksToPlaylistResponse };
	for (let i = 0; i < tracks.length; i += 100) {
		res = await instance.post(`/playlists/${id}/tracks`, {
			uris: tracks.slice(i, i + 100).map((track) => track.uri),
			position: 0
		});
	}

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
	addTracksToPlaylist(createPlaylistRes.data.id, tracks);

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

export async function getUserPlaylists(): Promise<SpotifyApi.PlaylistObjectSimplified[]> {
	const playlists: SpotifyApi.PlaylistObjectSimplified[] = [];
	let res = await instance.get('/me/playlists', { params: { limit: 50 } });
	while (res.data.next) {
		playlists.push(...res.data.items);
		res = await instance.get(res.data.next);
	}
	playlists.push(...res.data.items);
	return playlists;
}

export async function getPlaylist(id: string): Promise<SpotifyApi.SinglePlaylistResponse> {
	const res: { data: SpotifyApi.SinglePlaylistResponse } = await instance.get(`/playlists/${id}`);
	let nextUrl = res.data.tracks.next;
	while (nextUrl) {
		const nextTrackRes = await instance.get(nextUrl);
		res.data.tracks.items.push(...nextTrackRes.data.items);
		nextUrl = nextTrackRes.data.next;
	}
	console.log(res.data);
	return res.data;
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

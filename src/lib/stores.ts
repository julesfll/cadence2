import { writable, type Writable } from 'svelte/store';

export const user: Writable<SpotifyApi.CurrentUsersProfileResponse | null> = writable(null);

export const selectedTracks: Writable<SpotifyApi.TrackObjectFull[]> = writable([]);
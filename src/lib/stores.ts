import { writable, type Writable } from 'svelte/store';
import type { TrackWithTempo } from './types';

export const user: Writable<SpotifyApi.CurrentUsersProfileResponse | null> = writable(null);

export const selectedTracks: Writable<TrackWithTempo[]> = writable([]);

export const trackFilter: Writable<({ tempo }: TrackWithTempo) => boolean> = writable(null);
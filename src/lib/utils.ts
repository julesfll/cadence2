import { getAudioFeatures } from './api';
import type { TrackWithTempo } from './types';

//stackoverflow.com/questions/11731072/dividing-an-array-by-filter-function
export function partition<Type>(array: Type[], filter: (elem: Type) => boolean): [Type[], Type[]] {
	const pass = [],
		fail = [];
	array.forEach((elem) => (filter(elem) ? pass : fail).push(elem));
	return [pass, fail];
}

export async function getTracksWithTempos(
	tracks: SpotifyApi.TrackObjectFull[]
): Promise<TrackWithTempo[]> {
	const audioFeatures = await getAudioFeatures(tracks);
	const tempos = audioFeatures.map((features) => features.tempo || null);
	return tracks.map((track, i) => {
		return { ...track, tempo: tempos[i] };
	});
}

export function createTempoFilter(minBpm: number, maxBpm: number, allowHalftime: boolean) {
	return ({ tempo }: TrackWithTempo): boolean =>
		(tempo >= minBpm && tempo <= maxBpm) ||
		(allowHalftime && tempo >= minBpm / 2 && tempo <= maxBpm / 2);
}

export function filterTracks(
	tracks: TrackWithTempo[],
	filter: ({ tempo }: TrackWithTempo) => boolean
): [TrackWithTempo[], TrackWithTempo[]] {
	return partition(tracks, filter);
}

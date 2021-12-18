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

export function tempoFilter(minBpm: number, maxBpm: number, halftime: boolean) {
	return ({ tempo }: TrackWithTempo) =>
		(tempo >= minBpm && tempo <= maxBpm) ||
		(halftime && tempo >= minBpm / 2 && tempo <= maxBpm / 2);
}

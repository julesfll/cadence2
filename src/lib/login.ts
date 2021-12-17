// https://medium.com/swlh/modern-oauth-for-single-page-applications-using-pkce-e1cdd2f1b84
// https://www.valentinog.com/blog/oauth2/#1-user---client---authorization-server
import { encode as base64encode } from 'base64-arraybuffer';
import axios from 'axios';
import { goto } from '$app/navigation';

const spotifyBaseUrl = 'https://accounts.spotify.com';
const client_id = import.meta.env.VITE_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_BASE_URL + 'auth/';

function generateRandomString(length: number) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

// https://www.valentinog.com/blog/challenge/
async function generateCodeChallenge(codeVerifier: string) {
	const encoder = new TextEncoder();
	const data = encoder.encode(codeVerifier);
	const digest = await window.crypto.subtle.digest('SHA-256', data);
	const base64Digest = base64encode(digest);

	return base64Digest.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export async function initiateSpotifyLogin() {
	const state = generateRandomString(12);
	const codeVerifier = generateRandomString(128);

	if (window.location.search.includes('state')) return;
	const storage = window.sessionStorage;
	storage.clear();
	storage.setItem('state', state);
	storage.setItem('codeVerifier', codeVerifier);

	const codeChallenge = await generateCodeChallenge(codeVerifier);

	const loginUrl =
		spotifyBaseUrl +
		axios.getUri({
			url: '/authorize',
			params: {
				response_type: 'code',
				client_id,
				redirect_uri,
				code_challenge_method: 'S256',
				code_challenge: codeChallenge,
				state,
				scope: ['user-library-read', 'playlist-modify-private', 'user-top-read'].join(' ')
			}
		});

	goto(loginUrl);
}

export function checkState(stateInUrl: string) {
	if (window.sessionStorage.getItem('state') !== stateInUrl) {
		throw Error('Mismatched state');
	}
}

export async function requestAccessToken(code: string) {
	try {
		const body = {
			grant_type: 'authorization_code',
			code,
			redirect_uri,
			client_id,
			code_verifier: window.sessionStorage.getItem('codeVerifier')
		};
		const res = await axios.post(
			spotifyBaseUrl + '/api/token',
			new URLSearchParams(body).toString(),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		);
		// TODO: store access token in a secure place
		// TODO: store refresh token in cookie
		window.sessionStorage.setItem('accessToken', res.data.access_token);
	} catch (error) {
		console.log(error);
	}
}

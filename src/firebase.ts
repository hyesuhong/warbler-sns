import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBTphl90uv6a9tMAr3GF0oNTg6eYUExDDo',
	authDomain: 'warbler-sns.firebaseapp.com',
	projectId: 'warbler-sns',
	storageBucket: 'warbler-sns.appspot.com',
	messagingSenderId: '810095290444',
	appId: '1:810095290444:web:5882ae1e0f04d6ef2c2ce9',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

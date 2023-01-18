import { atom, useRecoilState } from 'recoil';

export const keyWordState = atom({
	key: 'keyWordState',
	default: ''
});

export const currPageState = atom({
	key: 'currPageState',
	default: 1
});

export const startPageState = atom({
	key: 'startPageState',
	default: 1
});

export const prevPathState = atom({
	key: 'prevPathState',
	default: '/'
});

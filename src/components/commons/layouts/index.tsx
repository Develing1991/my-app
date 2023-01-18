import React, { useEffect } from 'react';
import DefaultFooter from './footers/DefaultFooter';
import DefaultHeader from './headers/DefaultHeader';
import { useRouter } from 'next/router';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { keyWordState, currPageState, startPageState, prevPathState } from '../../../commons/store';
interface IProps {
	children: JSX.Element;
}
export default function IndexPage({ children }: IProps) {
	const { asPath } = useRouter();
	const [prevPath, setPrevPath] = useRecoilState(prevPathState);

	const initKeywordState = useResetRecoilState(keyWordState);
	const initCurrPageState = useResetRecoilState(currPageState);
	const initStartPageState = useResetRecoilState(startPageState);

	// parent 경로가 변경되면 초기화 할 글로벌 state
	useEffect(() => {
		const nextPath = !asPath.split('/')[1] ? '/' : asPath.split('/')[1];
		if (prevPath !== nextPath) {
			initKeywordState();
			initCurrPageState();
			initStartPageState();
		}
		setPrevPath(() => nextPath);
	});

	return (
		<>
			<DefaultHeader />
			{children}
			<DefaultFooter />
		</>
	);
}

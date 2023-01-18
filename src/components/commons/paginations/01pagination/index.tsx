import React, { memo } from 'react';
import { useRecoilState } from 'recoil';
import { currPageState, startPageState } from '../../../../commons/store/index';
interface IProps {
	pageSize: number;
	lastPage: number;
	onClickRefetch: (value: { page: number }) => void;
}
const Pagination01 = ({ pageSize = 10, lastPage, onClickRefetch }: IProps) => {
	const [currPage, setCurrPage] = useRecoilState(currPageState);
	const [startPage, setStartPage] = useRecoilState(startPageState);

	console.log('페이지네이션 내 상태가 변할 때만 리렌더링');

	const onClickPrevPage = () => {
		if (startPage === 1) return;
		setStartPage((prev) => prev - pageSize);
		setCurrPage(() => startPage - pageSize);
		onClickRefetch({ page: startPage - pageSize });
	};
	const onClickCurrPage = (page: number) => () => {
		setCurrPage(() => page);
		onClickRefetch({ page });
	};
	const onClickNextPage = () => {
		setStartPage((prev: number) => prev + pageSize);
		setCurrPage(() => startPage + pageSize);
		onClickRefetch({ page: startPage + pageSize });
	};
	const onClickFirstPage = () => {
		setStartPage(() => 1);
		setCurrPage(() => 1);
		onClickRefetch({ page: 1 });
	};
	const onClickLastPage = () => {
		setStartPage(() => Math.floor(lastPage / pageSize) * 10 + 1);
		setCurrPage(() => Math.floor(lastPage / pageSize) * 10 + 1);
		onClickRefetch({ page: Math.floor(lastPage / pageSize) * 10 + 1 });
	};
	return (
		<>
			<div onClick={onClickFirstPage}>첫 페이지</div>
			<div onClick={onClickPrevPage}>이전페이지</div>
			{new Array(10).fill(1).map((_, index) => {
				return (
					lastPage >= startPage + index && (
						<span key={index} onClick={onClickCurrPage(index + startPage)} style={{ color: currPage === startPage + index ? 'red' : 'black' }}>
							{index + startPage}
						</span>
					)
				);
			})}
			<div onClick={onClickNextPage}>다음페이지</div>
			<div onClick={onClickLastPage}>마지막 페이지</div>
		</>
	);
};

export default memo(Pagination01);

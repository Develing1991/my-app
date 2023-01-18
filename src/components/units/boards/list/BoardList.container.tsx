import { useQuery, useApolloClient } from '@apollo/client';

import { useRouter } from 'next/dist/client/router';
import { useCallback } from 'react';

import Input01 from '../../../commons/inputs/01Input';
import Pagination01 from '../../../commons/paginations/01pagination';
import BoardListPresenter from './BoardList.presenter';
import { FETCH_BOARD } from '../detail/BoardDetail.queries';
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from './BoardList.queries';
import { TypeBoards, TypeBoardsArgs, TypeBoardsCount, TypeBoardsCountArgs } from './BoardList.types';
import { preDebounce } from './BoardList.utils';
import { keyWordState, currPageState } from '../../../../commons/store';
import { useRecoilState } from 'recoil';

export default function BoardListContainer() {
	const [currPage] = useRecoilState(currPageState);
	const [keyword, setKeyword] = useRecoilState(keyWordState);
	const { data, refetch } = useQuery<TypeBoards, TypeBoardsArgs>(FETCH_BOARDS, {
		variables: {
			page: currPage,
			search: keyword
		}
	});
	const { data: dataCount, refetch: refetchCount } = useQuery<TypeBoardsCount, TypeBoardsCountArgs>(FETCH_BOARDS_COUNT, {
		variables: {
			search: keyword
		}
	});

	const client = useApolloClient();

	const router = useRouter();
	const lastPage = Math.ceil(Number(dataCount?.fetchBoardsCount) / 10);

	const onClickRefetch = useCallback((value: { page: number }) => {
		refetch(value);
	}, []);
	console.log('보드ㅜ컨테이너리렌더');

	const onChangeRefetch = useCallback((keyword: string) => {
		setKeyword(() => keyword);
		refetch({ page: 1, search: keyword });
		refetchCount({ search: keyword });
	}, []);

	const onClickBoardDetail = useCallback(
		(boardId: string) => () => {
			router.push(`/boards/${boardId}`); // 게시판 -admin이라 생각하고 만들어서 검색 노출x next/Link사용 안함
		},
		[]
	);
	const onPrefetchBoard = useCallback(
		(boardId: string) => () => {
			preDebounce(client, FETCH_BOARD, boardId);
		},
		[]
	);

	return (
		<div>
			총 페이지 : {!!lastPage && lastPage}
			{keyword}
			<Input01 keyword={keyword} onChangeRefetch={onChangeRefetch} seconds={500} />
			<BoardListPresenter list={data?.fetchBoards} keyword={keyword} onClickBoardDetail={onClickBoardDetail} onPrefetchBoard={onPrefetchBoard} />
			<Pagination01 pageSize={10} lastPage={lastPage} onClickRefetch={onClickRefetch} />
		</div>
	);
}

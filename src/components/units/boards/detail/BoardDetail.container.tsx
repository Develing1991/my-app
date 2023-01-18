import { Router, useRouter } from 'next/dist/client/router';
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { IQuery, IQueryFetchBoardArgs } from '../../../../../src/commons/types/generated/types';
// import { IBoard, IQuery, IQueryFetchBoardsArgs, IQueryFetchBoardsCountArgs } from '../../../../commons/types/generated/types';
const FETCH_BOARD = gql`
	query fetchBoard($boardId: ID!) {
		fetchBoard(boardId: $boardId) {
			_id
			writer
			title
			contents
			likeCount
			dislikeCount
			images
			createdAt
			updatedAt
		}
	}
`;
type TypeBoard = Pick<IQuery, 'fetchBoard'>;
type TypeBoardArgs = IQueryFetchBoardArgs;

interface IProps {
	isEdit: boolean;
}
export default function BoardDetailContainer({ isEdit }: IProps) {
	const { query, push, asPath, back } = useRouter();
	const { data } = useQuery<TypeBoard, TypeBoardArgs>(FETCH_BOARD, {
		variables: {
			boardId: String(query?.boardId)
		}
	});

	const onClickModify = () => {
		if (!isEdit) {
			push(`${asPath}/edit`);
			return;
		}
		// save update
		back();
	};
	return (
		<div>
			{isEdit ? (
				<>
					<button onClick={onClickModify}>저장하기</button>
					{/* <div>{data?.fetchBoard.writer}</div>
			<div>{data?.fetchBoard.title}</div>
			<div>{data?.fetchBoard.contents}</div>
			<div>{data?.fetchBoard.likeCount}</div> */}
					<img src={`https://storage.googleapis.com/${data?.fetchBoard.images?.[0]}`} alt="" />
					<input type="text" defaultValue={data?.fetchBoard.writer} />
					<input type="text" defaultValue={data?.fetchBoard.title} />
					<input type="text" defaultValue={data?.fetchBoard.contents} />
				</>
			) : (
				<>
					<button onClick={onClickModify}>수정하기</button>
					<img src={`https://storage.googleapis.com/${data?.fetchBoard.images?.[0]}`} alt="" />
					<div>{data?.fetchBoard.writer}</div>
					<div>{data?.fetchBoard.title}</div>
					<div>{data?.fetchBoard.contents}</div>
					<div>{data?.fetchBoard.likeCount}</div>
				</>
			)}
		</div>
	);
}

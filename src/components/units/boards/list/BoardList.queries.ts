import { gql } from '@apollo/client';

export const FETCH_BOARDS = gql`
	query fetchBoards($page: Int, $search: String) {
		fetchBoards(page: $page, search: $search) {
			_id
			writer
			title
			contents
			likeCount
			dislikeCount
			createdAt
			updatedAt
		}
	}
`;

export const FETCH_BOARDS_COUNT = gql`
	query fetchBoardsCount($endDate: DateTime, $startDate: DateTime, $search: String) {
		fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)
	}
`;

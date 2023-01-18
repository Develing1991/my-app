/**
 * CONTAINER
 */
import { IBoard, IQuery, IQueryFetchBoardsArgs, IQueryFetchBoardsCountArgs } from '../../../../commons/types/generated/types';
export type TypeBoards = Pick<IQuery, 'fetchBoards'>;
export type TypeBoardsArgs = IQueryFetchBoardsArgs;
export type TypeBoardsCount = Pick<IQuery, 'fetchBoardsCount'>;
export type TypeBoardsCountArgs = IQueryFetchBoardsCountArgs;

/**
 * PRESENTER
 */
export interface BoardListPresenterProps {
	list: IBoard[] | undefined;
	keyword: string;
	onClickBoardDetail: (boardId: string) => () => void;
	onPrefetchBoard: (boardId: string) => () => void;
}

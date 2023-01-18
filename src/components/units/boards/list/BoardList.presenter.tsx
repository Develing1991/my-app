import { IBoard } from '../../../../commons/types/generated/types';
import TextHighLight from '../../../commons/highLights';
import { BoardListPresenterProps } from './BoardList.types';

export default function BoardListPresenter({ list, keyword, onClickBoardDetail, onPrefetchBoard }: BoardListPresenterProps) {
	return (
		<>
			{list?.map((el: IBoard) => {
				return (
					<div key={el._id} onClick={onClickBoardDetail(el._id)} onMouseOver={onPrefetchBoard(el._id)}>
						<span>{el.writer}</span>
						{/* <span>{el.title}</span> */}

						{/* {el.title
							.replaceAll(keyword, `#$#$#$!${keyword}#$#$#$!`)
							.split('#$#$#$!')
							.map((word, index) => (
								<span key={index} style={{ color: word === keyword ? 'red' : 'black' }}>
									{word}
								</span>
							))} */}
						<TextHighLight title={el.title} keyword={keyword} />
						<span>{el.contents}</span>
					</div>
				);
			})}
		</>
	);
}

import { ChangeEvent, memo, useState } from 'react';
import _ from 'lodash';
import { useRecoilState } from 'recoil';
import { currPageState, startPageState } from '../../../../commons/store';
interface IProps {
	onChangeRefetch: (keyword: string) => void;
	seconds: number;
	keyword: string;
}
const Input01 = ({ onChangeRefetch, keyword, seconds = 500 }: IProps) => {
	const [, setCurrPage] = useRecoilState(currPageState);
	const [, setStartPage] = useRecoilState(startPageState);
	const [prevKeyword, setPrevKeyword] = useState('');
	const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
		getDebounce(event.currentTarget.value);
	};
	console.log('인풋렌더');

	const getDebounce = _.debounce((keyword: string) => {
		if (prevKeyword && prevKeyword === keyword) return;
		onChangeRefetch(keyword);
		setPrevKeyword(keyword);
		setCurrPage(1);
		setStartPage(1);
	}, seconds);
	return <input type="text" onChange={onChangeKeyword} defaultValue={keyword} />;
};
export default memo(Input01);

import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IWriteBoardParams } from './BoardWrite.types';
import { schema } from './BoardWrite.utils';
import { useMutation } from '@apollo/client';
import { CREATE_BOARD } from './BoardWrite.queries';
import { useRouter } from 'next/router';
import { IMutation, IMutationCreateBoardArgs } from '../../../../commons/types/generated/types';
import { FETCH_BOARDS } from '../list/BoardList.queries';
const ReactQuill = dynamic(async () => await import('react-quill'), { ssr: false });

export default function BoardWriteContainer() {
	const writer = '철수'; // 나중에 로그인한 사람으로 변경
	const [createBoard] = useMutation<Pick<IMutation, 'createBoard'>, IMutationCreateBoardArgs>(CREATE_BOARD);
	const { register, handleSubmit, formState, trigger, setValue } = useForm({
		resolver: yupResolver(schema)
	});
	const router = useRouter();
	// 이미지 업로드도 회원가입 프로필로 거기서 업로드 ㄱㄱ
	// 트리거는 필수입력창 ->회원가입하는 페이지에서 개별로 비제어컴포넌트 적용
	const onSubmitWriteBoard: SubmitHandler<Partial<IWriteBoardParams>> = async ({ title = '', contents = '' }) => {
		// console.log(params);
		// console.log(JSON.stringify(params.contents));
		// 이미지 처리 고민
		try {
			const result = await createBoard({
				variables: {
					createBoardInput: {
						title,
						contents,
						writer,
						password: writer
					}
				},
				refetchQueries: [{ query: FETCH_BOARDS, variables: { page: 1 } }]

				// update(cache, { data }) {
				// 	cache.modify({
				// 		fields: {
				// 			fetchBoards(prev) {
				// 				return [data?.createBoard, ...prev];
				// 			}
				// 		}
				// 	});
				// }
			});
			if (result) {
				router.push('/boards');
			}
		} catch (error) {
			if (error instanceof Error) console.log(error.message);
		}
	};
	const onChangeContents = (value: string) => {
		setValue('contents', value);
		// trigger('contents')
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmitWriteBoard)}>
				제목 : <input type="text" {...register('title')} />
				{formState.errors.title?.message}
				{/* 에러 메시지 말풍선으로 대체하기 */}
				<br />
				<ReactQuill onChange={onChangeContents} />
				<button>등록</button>
			</form>
		</>
	);
}

import * as yup from 'yup';
export const schema = yup.object({
	title: yup.string().required('제목을 입력해주세요.')
});
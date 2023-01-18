import _ from 'lodash';
export const preDebounce = _.debounce((client, query, boardId: string) => {
	client.query({ query, variables: { boardId } });
}, 500);

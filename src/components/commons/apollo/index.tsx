import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import React from 'react';

interface IProps {
	children: JSX.Element;
}
const globalApolloState = new InMemoryCache();
export default function ApolloSettings(props: IProps) {
	const client = new ApolloClient({
		uri: 'https://backendonline.codebootcamp.co.kr/graphql',
		cache: globalApolloState,
		connectToDevTools: true
	});
	return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

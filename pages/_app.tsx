import { AppProps } from 'next/dist/shared/lib/router/router';
import ApolloSettings from '../src/components/commons/apollo';
import LayoutIndex from '../src/components/commons/layouts';
import { RecoilRoot } from 'recoil';
// import '../styles/globals.css'
export default function App({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<LayoutIndex>
				<ApolloSettings>
					<Component {...pageProps} />
				</ApolloSettings>
			</LayoutIndex>
		</RecoilRoot>
	);
}

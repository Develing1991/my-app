import Link from 'next/link';
import styled from '@emotion/styled';

const AnchorTag = styled.a`
	color: #000;
	margin: 10px;
`;
export default function DefaultHeader() {
	return (
		<header style={{ border: '1px solid red', marginBottom: '10px' }}>
			<div className="inner">
				<div>
					<Link href="/">
						<AnchorTag>홈 로고</AnchorTag>
					</Link>
					<Link href="/coummunities">
						<AnchorTag>커뮤니티</AnchorTag>
					</Link>
					<Link href="/products">
						<AnchorTag>상품구매</AnchorTag>
					</Link>
					<Link href="/boards">
						<AnchorTag>게시판</AnchorTag>
					</Link>
				</div>
				<div>
					<input type="text" />
				</div>
				<div>
					<Link href="/">
						<AnchorTag>로그인</AnchorTag>
					</Link>
					<Link href="/">
						<AnchorTag>회원가입</AnchorTag>
					</Link>
					<Link href="/boards/new">
						<AnchorTag>글쓰기</AnchorTag>
					</Link>
				</div>
			</div>
		</header>
	);
}

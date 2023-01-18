interface ITextHighLight {
	title: string;
	keyword: string;
}
export default function TextHighLight({ title, keyword }: ITextHighLight) {
	return (
		<>
			{title
				.replaceAll(keyword, `#$#$#$!${keyword}#$#$#$!`)
				.split('#$#$#$!')
				.map((word, index) => (
					<span key={index} style={{ color: word === keyword ? 'red' : 'black' }}>
						{word}
					</span>
				))}
		</>
	);
}

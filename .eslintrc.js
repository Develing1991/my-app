module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['plugin:react/recommended', 'standard-with-typescript', 'prettier'], // prettier 충돌방지
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json'
	},

	plugins: ['react'],
	rules: {
		'react/self-closing-comp': [
			'error',
			{
				component: true,
				html: true
			}
		],
		'react/react-in-jsx-scope': 'off', // 추가 jsx파일 내 React 선언 제외
		'@typescript-eslint/explicit-function-return-type': 'off', // 추가 리턴타입 jsx 제외
		'@typescript-eslint/strict-boolean-expressions': 'off', // truthy, falsy한 값을 엄격하게 체크 제외
		'@typescript-eslint/no-misused-promises': 'off', // 추가 Promise return 타입에 void가 예상되는 에러 규칙 제외
		'@typescript-eslint/triple-slash-reference': 'off', // 추가 ///<reference /> 삼중 슬래시 지시자  규칙 제외
		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/no-floating-promises': 'off',
		'react/display-name': 'off' // 이름없는 함수 eslint체크 제외 (hoc 사용해서)
	}
};

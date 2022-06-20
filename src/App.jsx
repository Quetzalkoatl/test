import {useState} from 'react';

let content = [
	{
		type: 'panel',
		props: {
			width: 500,
			height: 200,
			visible: true,
		},
	},
	{
		type: 'label',
		props: {
			caption: 'test',
			visible: true,
		},
	},
	{
		type: 'button',
		props: {
			width: 100,
			height: 30,
			visible: true,
		},
	},
];

const App = () => {
	const [state, setState] = useState(content);
	const [path, setPath] = useState('');
	const [value, setValue] = useState('');

	const applyValue = (path, value) => {
		const copy = [...state];
		copy.push({
			type: 'label',
			props: {
				caption: value,
				visible: true,
			},
		});
		setState(copy);
	};

	return (
		<div className='App'>
			<input
				className='inputSource'
				placeholder='Путь'
				value={path}
				onChange={e => setPath(e.target.value)}
			/>
			<input
				className='inputSource'
				placeholder='Новое значение'
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			<button className='btn' onClick={() => applyValue(path, value)}>
				Применить
			</button>
			<br />
			<br />
			<div className='content'>
				{state.map(elem => {
					if (elem.type === 'panel') {
						return (
							<div
								className='panel'
								style={{
									display: elem.props.visible ? 'block' : 'none',
									height: elem.props.height,
									width: elem.props.width,
									border: '2px solid red',
									marginTop: '20px',
								}}
							></div>
						);
					} else if (elem.type === 'label') {
						return (
							<span
								className='label'
								style={{
									display: elem.props.visible ? 'block' : 'none',
									marginTop: '20px',
								}}
							>
								{elem.props.caption}
							</span>
						);
					}
					return (
						<button
							className='button'
							style={{
								width: elem.props.width,
								height: elem.props.height,
								display: elem.props.visible ? 'block' : 'none',
								marginTop: '20px',
							}}
						>
							Надпись
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default App;

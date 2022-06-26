import {useSelector, useDispatch} from 'react-redux';
import {applyValue} from '../store/store-actions';

const Main = () => {
	const dispatch = useDispatch();
	const elements = useSelector(state => state);

	let path = '';
	let value = '';

	return (
		<div className='App'>
			<input
				className='inputSource'
				placeholder='Путь'
				// value={path}
				onChange={e => {
					path = e.target.value;
				}}
			/>
			<input
				className='inputSource'
				placeholder='Новое значение'
				// value={value}
				onChange={e => {
					value = e.target.value;
				}}
			/>
			<button className='btn' onClick={() => dispatch(applyValue(path, value))}>
				Применить
			</button>
			<div className='content'>
				{elements.map(elem => {
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
							Кнопка
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default Main;

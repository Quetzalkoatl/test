import {useSelector, useDispatch} from 'react-redux';
import {applyValue} from '../store/store-actions';

const Main = () => {
	const dispatch = useDispatch();
	const elements = useSelector(state => state);

	const handleSubmit = event => {
		event.preventDefault();
		dispatch(applyValue(event.target.path.value, event.target.newValue.value));
		event.target.reset();
	};

	return (
		<div className='App'>
			<form onSubmit={handleSubmit}>
				<input
					className='inputSource'
					type='text'
					name='path'
					placeholder='Путь'
				/>
				<input
					className='inputSource'
					type='text'
					name='newValue'
					placeholder='Новое значение'
				/>
				<input className='btn' type='submit' value='Применить' />
			</form>
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

import {content} from './content';

export const changeContent = (state = content, action) => {
	switch (action.type) {
		case 'APPLY_VALUE': {
			if (!action.path && !action.value) {
				return state;
			} else if (!action.path && action.value) {
				return [...state, JSON.parse(action.value)];
			} else {
				const [first, ...remaining] = action.path.split('.');
				const currentIndex = first.replace(/[^\d]/g, '');
				const remainingString = remaining.join('.');
				const currentState = state[currentIndex];

				// Функция глубокого обхода объекта
				const deepPick = (fields, object) => {
					const [first, ...remaining] = fields.split('.');

					return remaining.length
						? deepPick(remaining.join('.'), object[first])
						: object[first];
				};

				if (
					typeof deepPick(remainingString, currentState) === 'number' &&
					remainingString.split('.').slice(-1).join() === 'width'
				) {
					return state.map((elem, index) =>
						index === +currentIndex
							? {
									...elem,
									props: {
										width: +action.value,
										height: state[index].props.height || null,
										caption: state[index].props.caption || null,
										visible: state[index].props.visible,
									},
							  }
							: elem
					);
				} else if (
					typeof deepPick(remainingString, currentState) === 'number' &&
					remainingString.split('.').slice(-1).join() === 'height'
				) {
					return state.map((elem, index) =>
						index === +currentIndex
							? {
									...elem,
									props: {
										width: state[index].props.width || null,
										height: +action.value,
										caption: state[index].props.caption || null,
										visible: state[index].props.visible,
									},
							  }
							: elem
					);
				} else if (
					typeof deepPick(remainingString, currentState) === 'boolean'
				) {
					return state.map((elem, index) =>
						index === +currentIndex
							? {
									...elem,
									props: {
										width: state[index].props.width || null,
										height: state[index].props.height || null,
										caption: state[index].props.caption || null,
										visible: JSON.parse(action.value),
									},
							  }
							: elem
					);
				} else if (
					typeof deepPick(remainingString, currentState) === 'string'
				) {
					return state.map((elem, index) =>
						index === +currentIndex
							? {
									...elem,
									props: {
										caption: action.value,
										visible: state[index].props.visible,
									},
							  }
							: elem
					);
				}
				return state;
			}
		}
		default: {
			return state;
		}
	}
};

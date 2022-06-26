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
				const [one, ...two] = remaining;

				if (two.join('') === 'width') {
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
				} else if (two.join('') === 'height') {
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
				} else if (two.join('') === 'visible') {
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
				} else if (two.join('') === 'caption') {
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

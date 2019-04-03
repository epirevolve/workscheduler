import { newPseudoUuid } from 'id-util';
import moment from 'moment';

const yearlySetting = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_VACATION_TITLE':
            return {...state,
                vacations: state.vacations.map(x => {
                    if (x.id != action.id) return x;
                    return {...x,
                        title: action.text
                    }
                })
            }
        case 'CHANGE_VACATION_DATE':
            return {...state,
                vacations: state.vacations.map(x => {
                    if (x.id != action.id) return x;
                    return {...x,
                        onFrom: action.date[0],
                        onTo: action.date[1]
                    }
                })
            }
        case 'CHANGE_VACATION_NUMBER_OF_DAYS':
            return {...state,
                vacations: state.vacations.map(x => {
                    if (x.id != action.id) return x;
                    return {...x,
                        days: action.text
                    }
                })
            }
        case 'ADD_VACATION':
            return {...state,
                vacations: state.vacations.concat({
                    id: newPseudoUuid(),
                    title: '',
                    onFrom: moment(),
                    onTo: moment(),
                    days: 0
                })
            }
        case 'REMOVE_VACATION':
            return {...state,
                vacations: state.vacations.filter(x => x.id != action.id)
            }
        default:
            return state
    }
}

export default yearlySetting;
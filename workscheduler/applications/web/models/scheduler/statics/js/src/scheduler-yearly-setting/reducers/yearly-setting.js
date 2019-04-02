import { newPseudoUuid } from 'id-util';

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
                        date: action.date
                    }
                })
            }
        case 'CHANGE_VACATION_DAYS':
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
                    date: [moment(), moment()],
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
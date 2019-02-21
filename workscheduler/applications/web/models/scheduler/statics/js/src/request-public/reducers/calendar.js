const calendar = (state = [], action) => {
    switch (action.type) {
        case 'APPEND_REQUEST':
            return state.map(week =>
                week.map(day => (day && day.day === action.day)
                    ? {...day, requests: day.requests.concat(action.request)}
                    : day)
            )
        case 'REMOVE_REQUEST':
            return state.map(week =>
                week.map(day => (day)
                    ? {...day, requests: day.requests.filter(x => x.id != action.id)}
                    : day)
            )
        default:
            return state
    }
}

export default calendar;
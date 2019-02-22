const calendar = (state = [], action) => {
    switch (action.type) {
        case 'APPEND_REQUEST':
            const atFromDate = new Date(action.request.atFrom).setEarliestTime();
            const atToDate = new Date(action.request.atTo).setLatestTime();
            return state.map(week => week.map(day => {
                    if (!day)
                        return day;
                    const date = new Date(`${action.scheduleOf}-${day.day}`);
                    if (!(atFromDate <= date && date <= atToDate))
                        return day;
                    return {...day, requests: day.requests.concat(action.request)};
                })
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
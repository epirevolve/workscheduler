const calendar = (state = [], action) => {
    switch (action.type) {
        case 'APPEND_REQUEST':
            const atFromDate = new Date(action.request.atFrom).setEarliestTime();
            const atToDate = new Date(action.request.atTo).setLatestTime();
            return state.map(x => x.map(y => {
                    if (!y)
                        return y;
                    const date = new Date(`${action.scheduleOf}-${y.day}`);
                    if (!(atFromDate <= date && date <= atToDate))
                        return y;
                    return {...y, requests: y.requests.concat(action.request)};
                })
            )
        case 'REMOVE_REQUEST':
            return state.map(x => x.map(y => (y)
                ? {...y, requests: y.requests.filter(z => z.id != action.id)}
                : y)
            )
        default:
            return state
    }
}

export default calendar;
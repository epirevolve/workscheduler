export const scheduleRequest = (monthlySetting, request) => {
    const atFromDate = request.atFrom.date();
    const atToDate = request.atTo.date();
    request = { ...request,
        atFrom: request.atFrom.toDate().toDateTimeFormatString(),
        atTo: request.atTo.toDate().toDateTimeFormatString()
    };
    return {
        ...monthlySetting,
        days: monthlySetting.days.map((x) => {
            let requests = x.requests.filter((y) => y.id != request.id);
            if (atFromDate <= x.day && x.day <= atToDate) requests = requests.concat(request);
            return { ...x,
                requests
            };
        })
    }
};
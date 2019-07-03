import requestAgent from 'superagent';

export const fetchSchedules = (payload) => {
    const { team, scheduleOf } = payload;
    return requestAgent
        .get('/schedule/api/schedules')
        .query({ 'team-id': team.id, 'schedule-of': scheduleOf })
        .set('X-CSRFToken', csrfToken)
        .then((res) => JSON.parse(res.text))
        .then((schedules) =>
            requestAgent
                .get('/scheduler/api/work-categories')
                .query({ 'team-id': team.id })
                .set('X-CSRFToken', csrfToken)
                .then((res) => JSON.parse(res.text))
                .then((workCategories) =>
                    requestAgent
                        .get('/scheduler/api/available-signs')
                        .set('X-CSRFToken', csrfToken)
                        .then((res) => JSON.parse(res.text))
                        .then((availableSigns) =>
                            ({ res: { schedules, workCategories, availableSigns }}))))
        .catch((error) => ({ error }));
};
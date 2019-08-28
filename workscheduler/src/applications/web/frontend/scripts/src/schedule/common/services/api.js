import requestAgent from 'superagent';

export const fetchSchedules = async (payload) => {
    const { team, scheduleOf } = payload;
    try {
        const res = await requestAgent
            .get('/schedule/api/schedules')
            .query({ 'team-id': team.id, 'schedule-of': scheduleOf })
            .set('X-CSRFToken', csrfToken);
        const schedules = JSON.parse(res.text);
        const res_1 = await requestAgent
            .get('/scheduler/api/work-categories')
            .query({ 'team-id': team.id })
            .set('X-CSRFToken', csrfToken);
        const workCategories = JSON.parse(res_1.text);
        const res_2 = await requestAgent
            .get('/scheduler/api/available-signs')
            .set('X-CSRFToken', csrfToken);
        const availableSigns = JSON.parse(res_2.text);
        return ({ res: { schedules, workCategories, availableSigns } });
    }
    catch (error) {
        return ({ error });
    }
};
import requestAgent from 'superagent';

import { team } from "../embeddedData";

export const fetchScheduler = async () => {
    try {
        const res = await requestAgent
            .get('/scheduler/api/scheduler')
            .query({
                'team-id': team.id
            })
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};

export const updateScheduler = async (payload) => {
    const { scheduler } = payload;
    try {
        const res = await requestAgent
            .put('/scheduler/api/scheduler')
            .send(scheduler)
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};

export const removeVacation = async (payload) => {
    const { id } = payload;
    try {
        await requestAgent
            .delete(`/scheduler/api/vacations/${id}`)
            .set('X-CSRFToken', csrfToken);
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};
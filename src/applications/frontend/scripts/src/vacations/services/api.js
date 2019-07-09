import requestAgent from 'superagent';

export const appendVacation = async (payload) => {
    const { vacation } = payload;
    try {
        const res = await requestAgent
            .post('/scheduler/api/vacations')
            .send(vacation)
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};

export const updateVacation = async (payload) => {
    const { vacation } = payload;
    try {
        const res = await requestAgent
            .put(`/scheduler/api/vacations/${vacation.id}`)
            .send(vacation)
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
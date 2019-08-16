import requestAgent from 'superagent';

export const appendTeam = async (payload) => {
    const { team } = payload;
    try {
        const res = await requestAgent
            .post('/user/api/teams')
            .send(team)
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};

export const updateTeam = async (payload) => {
    const { team } = payload;
    try {
        const res = await requestAgent
            .put(`/user/api/teams/${team.id}`)
            .send(team)
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};

export const removeTeam = async (payload) => {
    const { id } = payload;
    try {
        await requestAgent
            .delete(`/user/api/teams/${id}`)
            .set('X-CSRFToken', csrfToken);
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};
import requestAgent from 'superagent';

export const updateMyself = async (payload) => {
    const { myself } = payload;
    try {
        const res = await requestAgent
            .put(`/user/api/users/myself/${myself.id}`)
            .send(myself)
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};
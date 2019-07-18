import requestAgent from 'superagent';

export const activateUser = async (payload) => {
    const { id } = payload;
    try {
        await requestAgent
            .put(`/user/api/users/${id}/activate`)
            .set('X-CSRFToken', csrfToken);
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};

export const inactivateUser = async (payload) => {
    const { id } = payload;
    try {
        await requestAgent
            .put(`/user/api/users/${id}/inactivate`)
            .set('X-CSRFToken', csrfToken);
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};

export const resetPassword = async (payload) => {
    const { id } = payload;
    try {
        await requestAgent
            .put(`/user/api/users/${id}/reset-password`)
            .set('X-CSRFToken', csrfToken);
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};

export const appendUser = async (payload) => {
    const { user } = payload;
    try {
        const res = await requestAgent
            .post('/user/api/users')
            .send(user)
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};

export const udpateUser = async (payload) => {
    const { user } = payload;
    try {
        await requestAgent
            .put(`/user/api/users/${user.id}`)
            .send(user)
            .set('X-CSRFToken', csrfToken);
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};
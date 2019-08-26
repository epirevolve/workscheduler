import requestAgent from 'superagent';

export const tryToAuth = async (payload) => {
    const { logInId, password } = payload;
    try {
        const res = await requestAgent
            .post('/user/api/auth/login')
            .send({ 
                logInId, password
            })
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};
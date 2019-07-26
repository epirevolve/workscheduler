import requestAgent from 'superagent';

export const getUuid = async () => {
    try {
        const res = await requestAgent
            .get('/util/api/uuid')
            .set('X-CSRFToken', csrfToken);
        return JSON.parse(res.text);
    }
    catch (error) {
        return ({ error });
    }
};
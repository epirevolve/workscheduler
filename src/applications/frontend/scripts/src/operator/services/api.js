import requestAgent from 'superagent';

export const updateOperator = async (payload) => {
    const { operator } = payload;
    try {
        const res = await requestAgent
            .put(`/operator/api/operators/myself/${operator.id}`)
            .send(operator)
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};
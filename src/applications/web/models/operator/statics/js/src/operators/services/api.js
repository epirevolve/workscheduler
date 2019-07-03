import requestAgent from 'superagent';

export const saveOperator = async (payload) => {
    const { operator } = payload;
    try {
        await requestAgent
            .put(`/operator/api/operators/${operator.id}`)
            .send(operator)
            .set('X-CSRFToken', csrfToken);
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};
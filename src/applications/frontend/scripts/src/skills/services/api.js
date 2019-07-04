import requestAgent from 'superagent';

export const appendSkill = async (payload) => {
    const { skill } = payload;
    try {
        const res = await requestAgent
            .post('/operator/api/skills')
            .send(skill)
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};

export const updateSkill = async (payload) => {
    const { skill } = payload;
    try {
        const res = await requestAgent
            .put(`/operator/api/skills/${skill.id}`)
            .send(skill)
            .set('X-CSRFToken', csrfToken);
        return ({ res });
    }
    catch (error) {
        return ({ error });
    }
};

export const removeSkill = async (payload) => {
    const { id } = payload;
    try {
        await requestAgent
            .delete(`/operator/api/skills/${id}`)
            .set('X-CSRFToken', csrfToken);
        return ({});
    }
    catch (error) {
        return ({ error });
    }
};
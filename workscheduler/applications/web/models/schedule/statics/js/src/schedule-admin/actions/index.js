import { fetchSchedules } from '../../schedule/actions';

export const changeAffiliation = (affiliation, scheduleOf) => {
    return fetchSchedules(affiliation, scheduleOf)
        .then(action => ({...action,
            type: 'CHANGE_AFFILIATION',
            affiliation,
        }))
}
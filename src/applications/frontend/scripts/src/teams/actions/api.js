export const START_APPEND_TEAM = Symbol();
export const SUCCESS_APPEND_TEAM = Symbol();
export const FAILURE_APPEND_TEAM = Symbol();
export const START_UPDATE_TEAM = Symbol();
export const SUCCESS_UPDATE_TEAM = Symbol();
export const FAILURE_UPDATE_TEAM = Symbol();
export const START_REMOVE_TEAM = Symbol();
export const SUCCESS_REMOVE_TEAM = Symbol();
export const FAILURE_REMOVE_TEAM = Symbol();

export const startAppendTeam = (team) => ({
    type: START_APPEND_TEAM,
    payload: { team }
});

export const successAppendTeam = (team) => ({
    type: SUCCESS_APPEND_TEAM,
    payload: { team }
});

export const failureAppendTeam = () => ({
    type: FAILURE_APPEND_TEAM,
});

export const startUpdateTeam = (team) => ({
    type: START_UPDATE_TEAM,
    payload: { team }
});

export const successUpdateTeam = (team) => ({
    type: SUCCESS_UPDATE_TEAM,
    payload: { team }
});

export const failureUpdateTeam = () => ({
    type: FAILURE_UPDATE_TEAM,
});

export const startRemoveTeam = (id) => ({
    type: START_REMOVE_TEAM,
    payload: { id }
});

export const successRemoveTeam = (id) => ({
    type: SUCCESS_REMOVE_TEAM,
    payload: { id }
});

export const failureRemoveTeam = () => ({
    type: FAILURE_REMOVE_TEAM
});
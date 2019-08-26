export const START_TRY_AUTH = Symbol();
export const SUCCESS_TRY_AUTH = Symbol();
export const FAILURE_TRY_AUTH = Symbol();

export const startTryAuth = (logInId, password) => ({
    type: START_TRY_AUTH,
    payload: { logInId, password }
});

export const successTryAuth = () => ({
    type: SUCCESS_TRY_AUTH
});

export const failureTryAuth = () => ({
    type: FAILURE_TRY_AUTH,
});

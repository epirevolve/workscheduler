export const CHANGE_LOGIN_ID = Symbol();
export const CHANGE_PASSWORD = Symbol();

export const changeLogInId = (text) => ({
    type: CHANGE_LOGIN_ID,
    payload: { text }
});

export const changePassword = (text) => ({
    type: CHANGE_PASSWORD,
    payload: { text }
});
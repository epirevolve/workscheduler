export const START_FETCH_MONTHLY_SETTING = Symbol();
export const SUCCESS_FETCH_MONTHLY_SETTING = Symbol();
export const FAILURE_FETCH_MONTHLY_SETTING = Symbol();
export const START_UPDATE_MONTHLY_SETTING = Symbol();
export const SUCCESS_UPDATE_MONTHLY_SETTING = Symbol();
export const FAILURE_UPDATE_MONTHLY_SETTING = Symbol();
export const START_PUBLIC_MONTHLY_SETTING = Symbol();
export const SUCCESS_PUBLIC_MONTHLY_SETTING = Symbol();
export const FAILURE_PUBLIC_MONTHLY_SETTING = Symbol();

export const startFetchMonthlySetting = (team, scheduleOf) => ({
    type: START_FETCH_MONTHLY_SETTING,
    payload: { team, scheduleOf }
});

export const successFetchMonthlySetting = (monthlySetting) => ({
    type: SUCCESS_FETCH_MONTHLY_SETTING,
    payload: { monthlySetting }
});

export const failureFetchMonthlySetting = () => ({
    type: FAILURE_FETCH_MONTHLY_SETTING,
    payload: { message: '' }
});

export const startUpdateMonthlySetting = (monthlySetting) => ({
    type: START_UPDATE_MONTHLY_SETTING,
    payload: { monthlySetting }
});

export const successUpdateMonthlySetting = () => ({
    type: SUCCESS_UPDATE_MONTHLY_SETTING,
    payload: { message: '' }
});

export const failureUpdateMonthlySetting = () => ({
    type: FAILURE_UPDATE_MONTHLY_SETTING,
    payload: { message: '' }
});

export const startPublicMonthlySetting = (monthlySetting) => ({
    type: START_PUBLIC_MONTHLY_SETTING,
    payload: { monthlySetting }
});

export const successPublicMonthlySetting = () => ({
    type: SUCCESS_PUBLIC_MONTHLY_SETTING,
    payload: { message: '' }
});

export const failurePublicMonthlySetting = () => ({
    type: FAILURE_PUBLIC_MONTHLY_SETTING,
    payload: { message: '' }
});
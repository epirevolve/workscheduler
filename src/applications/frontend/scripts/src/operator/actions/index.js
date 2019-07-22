import * as actionTypes from "../actionTypes";

export const changeSkill = (skill) => ({
    type: actionTypes.CHANGE_SKILL,
    payload: { skill }
});

export const changeRemainPaidHolidays = (count) => ({
    type: actionTypes.CHANGE_REMAIN_PAID_HOLIDAY,
    payload: { count }
});

export const startUpdateOperator = (operator) => ({
    type: actionTypes.START_UPDATE_OPERATOR,
    payload: { operator }
});

export const successUpdateOperator = () => ({
    type: actionTypes.SUCCESS_UPDATE_OPERATOR
});

export const failureUpdateOperator = () => ({
    type: actionTypes.FAILURE_UPDATE_OPERATOR
});
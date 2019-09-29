import moment from "moment";

Object.assign(String.prototype, {
    toDate (format = 'YYYY-MM-DD') {
        return moment(this, format).toDate();
    },
    toMoment (format = 'YYYY-MM-DD') {
        return moment(this, format);
    }
});
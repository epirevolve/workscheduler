Date.isLeapYear = function (year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};

Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () {
    return Date.isLeapYear(this.getFullYear());
};

Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
}

Date.prototype.setEarliestTime = function () {
    this.setUTCHours(0);
    this.setUTCMinutes(0);
    this.setUTCSeconds(0);
    this.setUTCMilliseconds(0);
    return this;
}

Date.prototype.setLatestTime = function () {
    this.setUTCHours(23);
    this.setUTCMinutes(59);
    this.setUTCSeconds(59);
    this.setUTCMilliseconds(999);
    return this;
}
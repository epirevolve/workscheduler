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
Date.prototype.addDays = function (value) {
    this.setDate(this.getDate() + value);
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

Date.prototype.toYearMonthFormatString = function () {
    const month = (this.getMonth()+1).toString().padStart(2, '0');
    return `${this.getFullYear()}-${month}`
}

Date.prototype.toHourMinuteFormatString = function () {
    const hour = (this.getHours()).toString().padStart(2, '0');
    const minute = (this.getMinutes()).toString().padStart(2, '0');
    return `${hour}:${minute}`;
}

Date.prototype.toDateFormatString = function () {
    const month = (this.getMonth()+1).toString().padStart(2, '0');
    const day = (this.getDate()).toString().padStart(2, '0')
    return `${this.getFullYear()}-${month}-${day}`
}

Date.prototype.toDateTimeFormatString = function () {
    const month = (this.getMonth()+1).toString().padStart(2, '0');
    const day = (this.getDate()).toString().padStart(2, '0');
    const hour = (this.getHours()).toString().padStart(2, '0');
    const minute = (this.getMinutes()).toString().padStart(2, '0');
    return `${this.getFullYear()}-${month}-${day} ${hour}:${minute}`
}
Object.assign(Date, {
    isLeapYear (year) {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    },
    getDaysInMonth (year, month) {
        return [ 31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][month];
    }
});

Object.assign(Date.prototype, {
    isLeapYear () {
        return Date.isLeapYear(this.getFullYear());
    },
    getDaysInMonth () {
        return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
    },
    addMonths (value) {
        const n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() + value);
        this.setDate(Math.min(n, this.getDaysInMonth()));
        return this;
    },
    addDays (value) {
        this.setDate(this.getDate() + value);
        return this;
    },
    setEarliestDateTime () {
        this.setDate(1);
        this.setEarliestTime();
        return this;
    },
    setEarliestTime () {
        this.setUTCHours(0);
        this.setUTCMinutes(0);
        this.setUTCSeconds(0);
        this.setUTCMilliseconds(0);
        return this;
    },
    setLatestDateTime () {
        this.setDate(this.getDaysInMonth());
        this.setLatestTime();
        return this;
    },
    setLatestTime () {
        this.setUTCHours(23);
        this.setUTCMinutes(59);
        this.setUTCSeconds(59);
        this.setUTCMilliseconds(999);
        return this;
    },
    toYearMonthFormatString () {
        const month = (this.getMonth()+1).toString().padStart(2, '0');
        return `${this.getFullYear()}-${month}`;
    },
    toHourMinuteFormatString () {
        const hour = (this.getHours()).toString().padStart(2, '0');
        const minute = (this.getMinutes()).toString().padStart(2, '0');
        return `${hour}:${minute}`;
    },
    toDateFormatString () {
        const month = (this.getMonth()+1).toString().padStart(2, '0');
        const day = (this.getDate()).toString().padStart(2, '0');
        return `${this.getFullYear()}-${month}-${day}`;
    },
    toDateTimeFormatString () {
        const month = (this.getMonth()+1).toString().padStart(2, '0');
        const day = (this.getDate()).toString().padStart(2, '0');
        const hour = (this.getHours()).toString().padStart(2, '0');
        const minute = (this.getMinutes()).toString().padStart(2, '0');
        return `${this.getFullYear()}-${month}-${day} ${hour}:${minute}`;
    }
});
export const formatVacationOnScheduler = (scheduler, vacation, isAppend) => {
    if (isAppend)
        return { ...scheduler,
            vacations: scheduler.vacations.concat([vacation])
        };
    return { ...scheduler,
        vacations: scheduler.vacations.map((x) => {
            if (x.id != vacation.id) return x;
            return vacation;
        })
    };
};
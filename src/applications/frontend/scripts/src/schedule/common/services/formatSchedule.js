import { zip, transpose } from 'arrayUtil';

const formatSchedule = (daySettings, schedules, workCategories, availableSigns) => {
    const getAllWorkCategoriesName = () => workCategories.map((x) => x.title).concat(availableSigns);
    const getAllWorkCategoriesId = () => workCategories.map((x) => x.id).concat(availableSigns);

    const categories = daySettings.map((x) => getAllWorkCategoriesName().concat(x.fixedSchedules.map((y) => y.title)));
    const headerRow = {
        headers: [''].concat(getAllWorkCategoriesName()),
        cells: daySettings.map((x) => ({ name: x.dayName, day: x.day, isHoliday: x.isHoliday }))
    };
    const operatorRows = schedules.components.map((x) => {
        const totals = getAllWorkCategoriesId().map((y) => x.dayWorkCategories.filter((z) => z.workCategoryId == y).length);
        return {
            headers: [x.operator.user.name].concat(totals),
            cells: zip(x.dayWorkCategories, categories, daySettings),
            operator: x.operator
        };});
    const tSchedules = transpose(schedules.components.map((x) => x.dayWorkCategories));
    const totals = workCategories.map((x) => ({ workCategory: x, totals: tSchedules.map((y) => y.filter((z) => z.workCategoryId == x.id).length) }));
    const totalRows = totals.map((x) => ({
            headers: [x.workCategory.title].concat(getAllWorkCategoriesName().map(() => '')),
            cells: zip(x.totals, daySettings).map(([ a, b ]) => ({ category: x.workCategory, daySetting: b, count: a }))
        }));

    return [ headerRow, operatorRows, totalRows ];
};

export default formatSchedule;
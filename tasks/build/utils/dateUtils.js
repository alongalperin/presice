"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDateForDB = void 0;
const parseDateForDB = (date) => {
    const localeDate = date.toLocaleDateString("en-gb", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
    const [day, month, year] = localeDate.split('/');
    console.log(`${day}-${month}-${year}`);
    return `${year}-${month}-${day}`;
};
exports.parseDateForDB = parseDateForDB;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcPagination = void 0;
const funcPagination = (totalItem, page, limit) => {
    const totalPages = Math.ceil(totalItem / limit);
    let skip = 0;
    if (page > 1 && page <= totalPages) {
        skip = (page - 1) * limit;
    }
    ;
    return {
        totalPages: totalPages,
        skip: skip
    };
};
exports.funcPagination = funcPagination;

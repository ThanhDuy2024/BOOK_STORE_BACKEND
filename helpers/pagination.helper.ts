export const funcPagination = (totalItem: any, page: any, limit: any) => {
    const totalPages = Math.ceil(totalItem / limit); 
    let skip = 0;
    if(page > 1 && page <= totalPages) {
        skip = (page - 1) * limit
    };

    return {
        totalPages: totalPages,
        skip: skip
    }
}
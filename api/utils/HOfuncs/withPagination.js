module.exports = (_Schema) => async ({ limit, page, search }) => {
    var filters = { };
    if(search){
        filters = {...filters, name: new RegExp(search, 'i') }
    }
    return await _Schema.paginate(filters, {
        lean: true,
        page: page || 1,
        limit: limit || 10,
    });
}
var withDelete = (_Schema) => async (req, res) => {
    await _Schema.findByIdAndDelete(req.params.id);
    res.send({ message: "Deleted sucessfully" });
}

var witgFetchByID = (_Schema) => async (req, res) => {
    res.send(await _Schema.findById(req.params.id););
}
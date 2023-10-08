module.exports = (req, res) => {
  console.log(req.path)
  res.status(404).json({
    error: 'Not Found'
  })
}

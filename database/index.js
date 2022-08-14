module.exports.init=function()
{
  const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tic-tac-toe')
.then(function()            
{
  console.log("mongo is connected ")
})
.catch(function(err)
{
  console.log(err+"error ocuured")
})
}


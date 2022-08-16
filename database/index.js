module.exports.init=function()
{
  const mongoose = require('mongoose');
  mongoose.connect('mongodb+srv://root:root123@cluster0.rib2c.mongodb.net/tic-tac-toe?retryWrites=true&w=majority')

.then(function()            
{
  console.log("mongo is connected ")
})
.catch(function(err)
{
  console.log(err+"error ocuured")
})
}


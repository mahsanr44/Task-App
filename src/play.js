const Task = require('./models/Task')

require('../src/db/mongoose')

const delTask= async( status)=>{
    // const task = await Task.findByIdAndDelete(id,{status});
    const count = await Task.countDocuments({status:true});
    return count

}

delTask().then((count)=>{
    console.log(count)
}).catch((err)=>{
    console.log(err)
})

const mongoose = require('mongoose');

mongoose.connect(process.env.DB, 
    { useNewUrlParser: true,
     useUnifiedTopology: true })
    .then((data) => {
        console.log(`Database connected to ${data.connection.host}`)
})
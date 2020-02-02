const express = require('express');
require('./db/mongoose');
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require('./routers/user');


app.use(express.json());


//Enter the app routes
//app.use(route);

app.use(userRouter);

app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});
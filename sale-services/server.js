const express = require('express');
const userRouter = require('./routes/routes');
const syncDatabase = require('./configs/dbSync');
const MainRouter = require('./routes/main.routes');

const app = express();

app.use(express.json());

(async () => {
    await syncDatabase();
    app.use('/api', MainRouter);

    const port = process.env.NODE_SERVER_PORT || 4003;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})();

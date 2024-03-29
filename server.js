const express = require('express');
const path = require('path');
const app = express();

// if(process.env.NODE_ENV === 'production')
// {
    app.use(express.static(path.join(__dirname,'/build')));
    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname,'/build/index.php'));
    });
// }

const port = process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log('port', port);
});

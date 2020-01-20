const express = require('express');
const path = require('path');

const router = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production"){
    router.use(express.static(path.resolve(__dirname, "../prod-frontend")));
  
    router.get('*',(req,res) => {
      res.sendFile(path.resolve(__dirname,"index.html"))
    });
}

router.listen(port, () => console.log(`Listening on port ${port}`));
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
let counter = 0;

app.use(express.urlencoded());

app.get('/', (req, res) => 
{
    console.log(`aaya hay ${++counter}`);
  if(!req.query.year)
  {
    res.send(`<form> <br><h1>login</h1><br><label> email </label> <input type="text" name= "email" placeholder="abc@gmail.com"><br><br>
    <label> password </label> <input type="password" name= "password" ><br>
    <button type="submit">Sumbit</button> </form> 
    `);
  }    
  else 
  {
    const dataFile = path.join(__dirname, 'views/usercredentials.json');
    const email = req.query.email;
    const password=req.query.password;
 
  
    if(fs.existsSync(dataFile))
    {
        let data = JSON.parse(fs.readFileSync(dataFile));
        const myYearData = data.filter(function (item)  
        { 
            
            if (item.email === email && item.password === password)
            {
                return true;
            }
            else
            {
                return false; 
            }

        } )
        if(myYearData.length>0)
        {
          res.send(`You are logged in! ${req.query.email}`);
        }
        else
        {
          res.send("Login failed! ");
        }
        
      
      
      
      }
  }
 
}) ;
   
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
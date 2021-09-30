const express = require('express');
const path = require('path');
const fs = require('fs');
const { homedir } = require('os');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));



//crud create
app.get('/user', function(req, res) {
    res.render('user', {
        user: {
            id: 0,
            name: '',
            email: '',
            Address: '',
            number: '',
            work: '',
            experience:''

            
        }
    });
});
app.post('/user', function(req, res) {

    const Mydatafile = JSON.parse(fs.readFileSync('data/users.json'));
    const userData = {
        id: Mydatafile.length + 1,
        name: req.body.name,
        date: req.body.date,
        email: req.body.email,
        Address: req.body.Address,
        number:  req.body.number,
        work:  req.body.work,
        experience:  req.body.experience


    }

    if (req.body.id == 0) {
        Mydatafile.push(userData);
        fs.writeFileSync('data/users.json', JSON.stringify(Mydatafile));
        res.redirect("/");
    } else {
        let update = Mydatafile.map(function(item) {
            console.log(item.id, req.body.id);
            if (item.id == req.body.id) {
                let newItem = item;
                item.name = req.body.name;
                item.email = req.body.email;
                return newItem;
            } else {
                return item;
            }
        })
        fs.writeFileSync('data/users.json', JSON.stringify(update));
        res.redirect("/");
    }


})

//crud update


// app.get('/update/:id', function(req, res) {
//     const Mydatafile = JSON.parse(fs.readFileSync('data/users.json'));
//     const updateID = req.params.id;
//     const Newdata = Mydatafile.filter(function(items) {
//         if (items.id == updateID) {
//             return true;
//         } else {
//             return false;
//         }
//     })

//     res.render("addUser.ejs", { user: Newdata[0] });

// })

// app.get('/Add', function (req, res) {
//   let q = url.parse(req.url, true).query;
//   let dataURL = JSON.stringify(q, null, 4);
// fs.readFile('./data/users.json', (err, data)=>{
//     if (err) throw err;
//     const dataFile = JSON.parse(data.toString());
//     dataFile.push(dataURL);
//     console.log(dataFile);
//     fs.writeFile('./data/users.json', dataFile, (err) => {
//         if (err) {
//             console.error(err)
//         }
//     });
// });
//res.send(`added`);
//});

app.get('/update/:id', function(req, res) {
    const Mydatafile = JSON.parse(fs.readFileSync('data/users.json'));
    const updateID = req.params.id;
    const Newdata = Mydatafile.filter(function(items) {
        if (items.id == updateID) {
            return true;
        } else {
            return false;
        }
    })

    res.render("user.ejs", { user: Newdata[0] });

})

//crud read
app.get('/', function(req, res) {
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json').toString()));
    res.render('dashboard', { users });
});




//delete crud d for delete




app.get('/delete/:id', function(req, res) {
    const myId = req.params.id;
    const Mydata = JSON.parse(fs.readFileSync('data/users.json'));
    const newData = Mydata.filter(function(items) {
        if (items.id == req.params.id) {
            return false;
        } else {
            return true;
        }
    })
    fs.writeFileSync('data/users.json', JSON.stringify(newData));
    res.redirect("/");

});


//error page
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});



app.listen(4400);
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/');

const db = mongoose.connection;
// Upon connection failure
db.on('error', console.error.bind(console, 'Connection error:'));

// Upon opening the database successfully
db.once('open', function () {
    console.log("Connection is open...");
})

const corsOptions = {
    origin: "http://127.0.0.1:3001"
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));

const OwnerSchema = mongoose.Schema({
    ownerId: { type: Number },
    name: { type: String },
    email: { type: String }
})

const Owner = mongoose.model('Owner', OwnerSchema);

const CarSchema = mongoose.Schema({
    carId: {
        type: Number, required: true,
        unique: true
    },
    year: {
        type: String, required: true
    },
    make: {
        type: String, required: true
    },
    model: {
        type: String, required: true
    },
    rankingTotalScore: {
        type: Number, required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
    },
});

const Car = mongoose.model('Car', CarSchema);

// set res header
app.all('*', (req, res, next) => {
    res.setHeader('content-type', 'application/json');
    next();
});

// for test create car data
// app.get('/testcar', (req, res) => {
//     const owner1 = new Owner({
//         ownerId: 1,
//         name: 'Tom',
//         email: 'tom@gmail.com'
//     })
//     owner1.save((err => {
//         if (err) console.log('err:', err);
//         const car = new Car({
//             carId: 124,
//             year: '2015',
//             make: 'Jeep',
//             model: 'Wrangler',
//             rankingTotalScore: 100,
//             owner: owner1._id,
//         });
//         car.save()
//             .then(car => {
//                 res.send(car);
//             })
//             .catch(err => {
//                 res.status(500).send({
//                     message:
//                         err.message || "Some error occurred while creating the Car."
//                 });
//             })
//     }))
// });

app.get('/car', (req, res) => {
    Car.find(null, 'carId year make model rankingTotalScore').populate('owner', 'ownerId name email')
        .exec((err, data) => {
            if (err) console.log(err);
            if (data.length === 0) {
                res.status(404).send('car not found');
                return
            }
            let cars = []
            data.forEach(item => {
                const ownerData = {
                    ownerId: item.owner.ownerId,
                    name: item.owner.name,
                    email: item.owner.email
                }
                const carData = {
                    carId: item.carId,
                    year: item.year,
                    make: item.make,
                    model: item.model,
                    rankingTotalScore: item.rankingTotalScore,
                    owner: ownerData,
                }
                cars.push(carData)
            })
            res.json(cars);
        })
})


app.get('/car/:carId', (req, res) => {
    Car.findOne({ carId: req.params['carId'] }, 'carId year make model rankingTotalScore').populate('owner', 'ownerId name email')
        .exec((err, data) => {
            if (err) console.log(err);
            if (!data) {
                res.status(404).send('carId not found');
                return
            }
            const ownerData = {
                ownerId: data.owner.ownerId,
                name: data.owner.name,
                email: data.owner.email,
            }
            const carData = {
                carId: data.carId,
                year: data.year,
                make: data.make,
                model: data.model,
                rankingTotalScore: data.rankingTotalScore,
                owner: ownerData,
            }
            res.json(carData)
        })
});

app.post('/car', (req, res) => {
    let ownerIdParam = req.body['ownerId'];
    let ownerObjectId = null;
    Owner.findOne({ ownerId: ownerIdParam }).exec((err, owner) => {
        if (err) console.log(err);
        if (!owner) {
            req.status(404).send('ownerId not found');
            return
        }
        ownerObjectId = owner._id
        let carId = 0
        Car.find({ carId: { $gt: 0 } }).sort({ carId: -1 }).then(([first, ...others]) => {
            if (first) {
                carId = first.carId + 1;
                console.log('carId:', carId)
            }
            const car = new Car({
                carId: carId,
                year: req.body['year'],
                make: req.body['make'],
                model: req.body['model'],
                rankingTotalScore: req.body['rankingTotalScore'],
                owner: ownerObjectId,
            })
            car.save().then(car => {
                res.status(201).send('create success');
            }).catch(err => {
                res.status(500).send(err);
            })
        })
    })
});

app.delete('/car/:carId', (req, res) => {
    Car.findOneAndDelete({ carId: req.params['carId'] }, (err, data) => {
        if (err) console.log(err);
        if (!data) {
            res.status(404).send('carId not found');
            return
        }
        res.status(204).send(data);
    })
})

app.get('/owner/:ownerId', (req, res) => {
    Owner.findOne({ ownerId: req.params['ownerId'] }, 'ownerId name email')
        .exec((err, data) => {
            if (err) console.log(err);
            if (!data) {
                res.status(404).send('owner not found');
                return
            }
            const ownerData = {
                ownerId: data.ownerId,
                name: data.name,
                email: data.email
            }
            res.json(ownerData);
        })
})

app.get('/owner', (req, res) => {
    Owner.find(null, 'ownerId name email')
        .exec((err, data) => {
            if (err) console.log(err);
            let owners = []
            data.forEach(item => {
                const ownerData = {
                    ownerId: item.ownerId,
                    name: item.name,
                    email: item.email,
                }
                owners.push(ownerData)
            })
            res.json(owners);
        })
})

app.put('/car/:carId', (req, res) => {
    const carId = req.params['carId']
    const year = req.body['year']
    const make = req.body['make']
    const model = req.body['model']
    const rankingTotalScore = req.body['rankingTotalScore']
    const ownerName = req.body['ownerName']
    Owner.findOne({ name: ownerName }).exec((err, data) => {
        if (err) console.log(err);
        if (!data) {
            res.status(404).send('owner not found');
            return
        }
        const ownerObjectId = data._id
        Car.findOneAndUpdate(
            { carId: carId },
            { $set: { year: year, make: make, model: model, owner: ownerObjectId, rankingTotalScore: rankingTotalScore } },
            {
                returnNewDocument: true
            }
        ).exec((err, data) => {
            if (err) console.log(err);
            res.send(data);
        })
    })
})

const server = app.listen(3000);
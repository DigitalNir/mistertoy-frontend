
const STORAGE_KEY = 'carDB'

import Axios from 'axios'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'

// for cookies
const axios = Axios.create({
    withCredentials: true
})

// const BASE_URL = 'http://localhost:3030/api/car/'
const BASE_URL = 'car/'

export const carService = {
    query,
    getById,
    save,
    remove,
    getEmptyCar,
    getDefaultFilter
}



//fake frontend to "backend" using async storage service
function query(filterBy = {}) {

    if (!filterBy.txt) filterBy.txt = ''
    if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    const regExp = new RegExp(filterBy.txt, 'i')
    return storageService.query(STORAGE_KEY)
        .then(cars => {
            return cars.filter(car =>
                regExp.test(car.vendor) &&
                car.price <= filterBy.maxPrice
            )
        })
}

function getById(carId) {
    return storageService.get(STORAGE_KEY, carId)
}
function remove(carId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, carId)
}
function save(car) {
    if (car._id) {
        return storageService.put(STORAGE_KEY, car)
    } else {
        // when switching to backend - remove the next line
        car.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, car)
    }
}


function getEmptyCar() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}



function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}




// real frontend to backend connection

// function query(filterBy = {}) {
//     // return Promise.resolve([
//     //     {
//     //         "vendor": "Puki Car",
//     //         "speed": 220,
//     //         "_id": "WepLV",
//     //         "price": 3466,
//     //         "owner": {
//     //             "_id": "u101",
//     //             "fullname": "Puki Ja",
//     //             "score": 10000,
//     //             "isAdmin": true
//     //         }
//     //     },
//     //     {
//     //         "vendor": "Muki Car",
//     //         "speed": 123,
//     //         "_id": "wYrey",
//     //         "price": 4982,
//     //         "owner": {
//     //             "_id": "u102",
//     //             "score": 10000,
//     //             "fullname": "Muki Ba"
//     //         }
//     //     },
//     //     {
//     //         "vendor": "Kiki Car",
//     //         "speed": 676,
//     //         "_id": "em8lL",
//     //         "price": 8837,
//     //         "owner": {
//     //             "_id": "6iykr",
//     //             "score": 10000,
//     //             "fullname": "Kiki Ki"
//     //         }
//     //     },
//     //     {
//     //         "vendor": "Susita-908",
//     //         "price": 1527,
//     //         "speed": 115,
//     //         "_id": "Dezc2",
//     //         "owner": {
//     //             "fullname": "Puki Ja",
//     //             "score": 10000,
//     //             "_id": "u101",
//     //             "isAdmin": true
//     //         }
//     //     },
//     //     {
//     //         "vendor": "Susita-722",
//     //         "price": 4764,
//     //         "speed": 123,
//     //         "_id": "5Ctic",
//     //         "owner": {
//     //             "fullname": "Bobo Mcpopo",
//     //             "score": 10000,
//     //             "_id": "YtbOz"
//     //         }
//     //     },
//     //     {
//     //         "vendor": "Susita-828",
//     //         "price": 2359,
//     //         "speed": 116,
//     //         "_id": "1sXFk",
//     //         "owner": {
//     //             "fullname": "Bobo McPopo",
//     //             "score": 10000,
//     //             "_id": "YtbOz"
//     //         }
//     //     }
//     // ])
//     return httpService.get(BASE_URL, filterBy)
// }

// function getById(carId) {
//     return httpService.get(BASE_URL + carId)
// }

// function remove(carId) {
//     return httpService.delete(BASE_URL + carId)
// }

// function save(car) {
//     if (car._id) {
//         return httpService.put(BASE_URL, car)
//     } else {
//         return httpService.post(BASE_URL, car)
//     }
// }


// function getEmptyCar() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//         speed: utilService.getRandomIntInclusive(75, 200),
//     }
// }


// function getDefaultFilter() {
//     return { txt: '', maxPrice: '' }
// }



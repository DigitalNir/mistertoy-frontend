
const STORAGE_KEY = 'toyDB'

import Axios from 'axios'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'

// for cookies
const axios = Axios.create({
    withCredentials: true
})

// const BASE_URL = 'http://localhost:3030/api/toy/'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}



// _createToys()

//fake frontend to "backend" using async storage service
// function query(filterBy = {}) {

//     if (!filterBy.txt) filterBy.txt = ''
//     if (!filterBy.maxPrice) filterBy.maxPrice = 10000
//     const regExp = new RegExp(filterBy.txt, 'i')
//     return storageService.query(STORAGE_KEY)
//         .then(toys => {
//             return toys.filter(toy => {
//                 const matchesName = regExp.test(toy.name)
//                 const matchesPrice = toy.price <= filterBy.maxPrice
//                 const matchesStockStatus = filterBy.stockStatus === undefined || toy.inStock === filterBy.stockStatus;

//                 return matchesName && matchesPrice && matchesStockStatus
//             })
//         })
// }

// function getById(toyId) {
//     return storageService.get(STORAGE_KEY, toyId)
// }
// function remove(toyId) {
//     // return Promise.reject('Not now!')
//     return storageService.remove(STORAGE_KEY, toyId)
// }
// function save(toy) {
//     if (toy._id) {
//         return storageService.put(STORAGE_KEY, toy)
//     } else {
//         // when switching to backend - remove the next line
//         toy.owner = userService.getLoggedinUser()
//         return storageService.post(STORAGE_KEY, toy)
//     }
// }


// function getEmptyToy() {
//     return {
//         name: 'New Toy-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(10, 100),
//         labels: [],
//         createdAt: Date.now(),
//         inStock: true
//     }
// }



// function getDefaultFilter() {
//     return { txt: '', maxPrice: '', stockStatus: undefined }
// }



// function _createToys() {

//     const toysDemoData = [
//         {
//             _id: 't101',
//             name: 'Toy-1',
//             price: 177,
//             labels: ['Puzzle', 'Art', 'Baby'],
//             createdAt: 1703469545,
//             inStock: false
//         },
//         {
//             _id: 't102',
//             name: 'Toy-2',
//             price: 25,
//             labels: ['Outdoor', 'Doll'],
//             createdAt: 1703449394,
//             inStock: true
//         },
//         {
//             _id: 't103',
//             name: 'Toy-3',
//             price: 361,
//             labels: ['Battery Powered', 'Outdoor', 'On wheels'],
//             createdAt: 1703501311,
//             inStock: false
//         },
//         {
//             _id: 't104',
//             name: 'Toy-4',
//             price: 281,
//             labels: ['Puzzle', 'Box game', 'Doll'],
//             createdAt: 1703453696,
//             inStock: true
//         },
//         {
//             _id: 't105',
//             name: 'Toy-5',
//             price: 104,
//             labels: ['Puzzle', 'Baby', 'Outdoor'],
//             createdAt: 1703461140,
//             inStock: true
//         },
//         {
//             _id: 't106',
//             name: 'Toy-6',
//             price: 314,
//             labels: ['Baby'],
//             createdAt: 1703534395,
//             inStock: false
//         },
//         {
//             _id: 't107',
//             name: 'Toy-7',
//             price: 12,
//             labels: ['Box game', 'Art', 'Doll'],
//             createdAt: 1703492572,
//             inStock: true
//         },
//         {
//             _id: 't108',
//             name: 'Toy-8',
//             price: 433,
//             labels: ['Box game', 'Battery Powered', 'Puzzle'],
//             createdAt: 1703456276,
//             inStock: false
//         },
//         {
//             _id: 't109',
//             name: 'Toy-9',
//             price: 441,
//             labels: ['Doll', 'On wheels', 'Puzzle'],
//             createdAt: 1703542777,
//             inStock: false
//         },
//         {
//             _id: 't1010',
//             name: 'Toy-10',
//             price: 174,
//             labels: ['Doll', 'Baby'],
//             createdAt: 1703469814,
//             inStock: false
//         }
//     ]

//     localStorage.setItem(STORAGE_KEY, JSON.stringify(toysDemoData))

// }

// real frontend to backend connection

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}


function getEmptyToy() {
    return {
        name: '',
        price: 0,
        inStock: true,
        labels: [],
        owner: {},
    }
}


function getDefaultFilter() {
    return { txt: '', maxPrice: '', stockStatus: undefined }
}




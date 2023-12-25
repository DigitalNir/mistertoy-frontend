// const { useEffect, useState } = React
// const { useParams, useNavigate, Link } = ReactRouterDOM

import { useState } from "react"
import { carService } from "../services/car.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { useNavigate, useParams } from "react-router-dom"

export function CarDetails() {
    const [car, setCar] = useState(null)
    const { carId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadCar()
    }, [carId])

    function loadCar() {
        carService.getById(carId)
            .then((car) => setCar(car))
            .catch((err) => {
                console.log('Had issues in car details', err)
                showErrorMsg('Cannot load car')
                navigate('/car')
            })
    }

    if (!car) return <div>Loading...</div>
    return (
        <section className="car-details">
            <h1>Car vendor : {car.vendor}</h1>
            <h5>Price: ${car.price}</h5>
            <h5>Speed: {car.speed} km/h</h5>
            <p>⛐</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
        </section>
    )
}
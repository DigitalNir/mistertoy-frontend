import { Link } from "react-router-dom"

// const { Link } = ReactRouterDOM
export function CarPreview({ car, onRemoveCar, onEditCar, addToCart }) {

    return (
        <li className="car-preview" key={car._id}>
            <Link to={`/car/${car._id}`} >
                <h4>{car.vendor}</h4>
                <h1>⛐</h1>
            </Link>
            <p>Price: <span>${car.price.toLocaleString()}</span></p>
            <p>Owner: <span>{car.owner && car.owner.fullname}</span></p>
            <div>
                <button onClick={() => {
                    onRemoveCar(car._id)
                }}>x</button>
                <button onClick={() => {
                    onEditCar(car)
                }}>Edit</button>
            </div>
            <button className="buy" onClick={() => {
                addToCart(car)
            }}>Add to Cart</button>

        </li>
    )
}

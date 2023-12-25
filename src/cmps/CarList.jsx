import { CarPreview } from "./CarPreview.jsx";
import PropTypes from 'prop-types'

export function CarList({ cars, onRemoveCar, onEditCar, addToCart, baba }) {

    return (
        <ul className="car-list">
            {cars.map(car =>
                <CarPreview
                    key={car._id}
                    car={car}
                    onRemoveCar={onRemoveCar}
                    onEditCar={onEditCar}
                    addToCart={addToCart}
                />
            )}
        </ul>
    )
}

CarList.defaultProps = {
    baba: "BABABABAB"
}

CarList.propTypes = {
    txt(props, propName, cmpName) {
        // console.log('props:', props)
        // console.log('propName:', propName)
        // console.log('cmpName:', cmpName)
        if (typeof props[propName] !== 'string') {
            return new Error('Not a string!')
        }
    },
    nums: PropTypes.arrayOf(PropTypes.number),
    baba: PropTypes.string.isRequired
}
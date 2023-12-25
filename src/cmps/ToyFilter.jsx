// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "./customHooks/useEffectUpdate.js"


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name, type } = target
        value = type === 'number' ? +value : value
        // Handle boolean values for stock status
        if (name === 'stockStatus') {
            if (value === 'undefined') value = undefined;
            else value = value === 'true';
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [name]: value }))
    }
    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />

                <label htmlFor="stockStatus">Stock status:</label>
                <select name="stockStatus" id="stockStatus" value={filterByToEdit.stockStatus} onChange={handleChange}>
                    {/* <option value="" disabled >Select status</option> */}
                    <option value="undefined">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                </select>

            </form>

        </section>
    )
}
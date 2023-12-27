import MapComponent from '../cmps/MapCmp'

export function AboutUs() {
    const branches = [
        { lat: 32.0853, lng: 34.781769, name: 'Tel Aviv' },
        { lat: 32.8191218, lng: 34.9983856, name: 'Haifa' },
        { lat: 29.5569348, lng: 34.9497949, name: 'Eilat' },
        // ... more branches
    ]
    const { lat, lng } = branches[0] // set the initial center to tel aviv

    return (
        <section>
            <h2>About Us</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                aperiam quo veniam velit dolor reprehenderit, laudantium
                consequatur neque numquam labore quae. Accusamus libero
                perferendis ducimus? Alias unde hic quisquam doloremque.
            </p>
            <MapComponent center={{ lat, lng }} branches={branches} />
        </section>
    )
}

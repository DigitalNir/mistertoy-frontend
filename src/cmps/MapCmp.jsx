import GoogleMapReact from 'google-map-react'
import React from 'react'

const AnyReactComponent = ({ text }) => (
    <div style={{ color: 'red', background: 'transparent', fontSize: '2rem' }}>
        {text}
    </div>
)

const MapComponent = ({ center, zoom, branches }) => {
    return (
        <div style={{ height: '400px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: import.meta.env.VITE_API_GOOGLE_MAPS_API_KEY,
                }} // Replace with your Google Maps API key
                defaultCenter={center}
                defaultZoom={zoom}
            >
                {branches.map((branch, index) => (
                    <AnyReactComponent
                        key={index}
                        lat={branch.lat}
                        lng={branch.lng}
                        text={'🍕'}
                    />
                ))}
            </GoogleMapReact>
        </div>
    )
}

MapComponent.defaultProps = {
    center: {
        lat: 59.95,
        lng: 30.33,
    },
    zoom: 11,
}

export default MapComponent

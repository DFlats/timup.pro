export default function defaultLocation() {
    return {
        lat: Number.parseFloat(import.meta.env.VITE_DEFAULT_LOCATION_LAT),
        lng: Number.parseFloat(import.meta.env.VITE_DEFAULT_LOCATION_LNG)
    } as google.maps.LatLngLiteral;
}
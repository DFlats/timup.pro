export default function defaultLocation() {
    return {
        lat: Number.parseFloat(import.meta.env.VITE_DEFAULT_LOCATION_LAT) + Math.random() * 0.01,
        lng: Number.parseFloat(import.meta.env.VITE_DEFAULT_LOCATION_LNG) + Math.random() * 0.01
    } as google.maps.LatLngLiteral;
}
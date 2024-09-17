export default function defaultLocation() {
    return { lat: import.meta.env.VITE_DEFAULT_LOCATION_LAT, lng: import.meta.env.VITE_DEFAULT_LOCATION_LNG } as google.maps.LatLngLiteral;
}
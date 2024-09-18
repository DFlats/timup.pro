// import { MapProps, Map, APIProvider } from '@vis.gl/react-google-maps';

// import { useClientUser } from '../../hooks';

// import ClientUserMarker from './ClientUserMarker';
// import { defaultLocation } from '../../utilities/defaultLocation';

// /* eslint-disable react/react-in-jsx-scope */

// export default function ClientMap() {
//     const { clientUser } = useClientUser();

//     if (!clientUser) {
//         return <p>Map: Getting client user</p>
//     }

//     const mapProps: MapProps = {
//         defaultCenter: defaultLocation(),
//         defaultZoom: 14,
//         gestureHandling: 'greedy',
//         disableDefaultUI: true,
//         mapId: import.meta.env.VITE_GOOGLE_MAPS_ID,
//     }

//     return (
//         <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//             <Map {...mapProps} className="w-full flex-auto">
//                 <ClientUserMarker />
//             </Map>
//         </APIProvider>
//     );
// }
// import { AdvancedMarker, AdvancedMarkerProps, Pin, PinProps } from "@vis.gl/react-google-maps";
// import { useClientUser } from "../../hooks";
// import { User } from "../../api/types";
// import RemoteUserMarker from "./RemoteUserMarker";
// import { defaultLocation } from "../../utilities/defaultLocation";

// /* eslint-disable react/react-in-jsx-scope */

// export default function ClientUserMarker() {
//     const { clientUser, setLocation } = useClientUser();

//     if (!clientUser)
//         return <></>

//     const advancedMarkerProps: AdvancedMarkerProps = {
//         position: clientUser.location,
//         onDragEnd: (e: google.maps.MapMouseEvent) => {
//             if (!e.latLng) return;
//             setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
//         },
//         zIndex: 1
//     }

//     const glyph = document.createElement("img");
//     if (clientUser.imageUrl) {
//         glyph.src = clientUser.imageUrl;
//         glyph.style.width = '35px';
//         glyph.style.height = '35px';
//         glyph.classList.add("rounded-full")
//     }


//     const pinProps: PinProps = {
//         background: '#44AA44',
//         glyphColor: '#AAA',
//         borderColor: '#444444',
//         scale: 1.5,
//         glyph: glyph
//     }

//     const remoteUsers: User[] = [
//         {
//             id: "id",
//             name: 'John Doe',
//             email: 'john$@doe.com',
//             projectIds: [],
//             tags: [{ id: 0, tagValue: 'Painting' }, { id: 1, tagValue: 'JavaScript' }],
//             location: defaultLocation()
//         },
//         {
//             clerkId: "id2",
//             name: 'Jane Doe',
//             email: 'jane$@doe.com',
//             projects: [],
//             tags: [{ id: 0, tagValue: 'Debates' }, { id: 1, tagValue: 'Politics' }],
//             location: defaultLocation()
//         }
//     ]

//     return (
//         <AdvancedMarker {...advancedMarkerProps}>
//             <Pin {...pinProps} />
//             {remoteUsers.map(user => <RemoteUserMarker key={user.clerkId} user={user} />)}
//         </AdvancedMarker>
//     );
// }
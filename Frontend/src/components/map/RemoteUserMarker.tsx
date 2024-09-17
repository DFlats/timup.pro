/* eslint-disable react/react-in-jsx-scope */
import { AdvancedMarker, AdvancedMarkerProps, InfoWindow, InfoWindowProps, Pin, PinProps, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { User } from "../../api/types";

export interface RemoteUserMarkerProps {
    user: User
}

export default function RemoteUserMarker({ user }: RemoteUserMarkerProps) {
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [infoWindowShown, setInfoWindowShown] = useState(false);

    if (!user.location) return <></>

    const infoWindowHeaderContent = (
        <h2 className="leading-3 font-bold text-lg">{user.name}</h2>
    );

    const infoWindowMainContent = (
        <div className="flex flex-col items-start justify-center gap-4">
            <p className='m-4'>{user.email}</p>
        </div>);

    const markerProps: AdvancedMarkerProps = {
        position: user.location,
        onClick: () => setInfoWindowShown(isShown => !isShown),
        className: "overscroll-contain"
    }

    const pinProps: PinProps = {
        background: '#F0B004',
        glyphColor: '#000',
        borderColor: '#000'
    }

    const infoWindowProps: InfoWindowProps = {
        anchor: marker,
        onClose: () => setInfoWindowShown(false),
        headerContent: infoWindowHeaderContent
    }

    return (
        <>
            <AdvancedMarker ref={markerRef} {...markerProps}>
                <Pin {...pinProps} />
            </ AdvancedMarker>

            {infoWindowShown && (
                <InfoWindow {...infoWindowProps}>
                    {infoWindowMainContent}
                </InfoWindow >)
            }
        </>
    );
}
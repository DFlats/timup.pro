import { useQuery } from "@tanstack/react-query";

export function useGoogleMaps() {
    const queryKey = ["placesLibrary"];

    useQuery({
        queryKey: queryKey,
        queryFn: async (): Promise<google.maps.PlacesLibrary> => {
            return await google.maps.importLibrary("places") as google.maps.PlacesLibrary;;
        },
    });
}
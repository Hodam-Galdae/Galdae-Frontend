
export interface SubPlace {
    subPlaceId: number;
    subPlace: string;
    image: string;
  }

  export interface MajorPlace {
    majorPlaceId: number;
    majorPlace: string;
    subPlaceList: SubPlace[];
  }

  export type PlacesResponse = MajorPlace[];

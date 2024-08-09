// types.ts
import { Dispatch, SetStateAction } from "react";

export interface Property {
    id: string;
    ImagePath?: string;
    Rent?: number;
    ProjectType?: string;
    Location?: string;
    Electricity?: number;
    Bedroom?: number;
    About?: string;
    images?: string[];
    imageFiles?: File[];
    Water?: boolean
}

export type SetProperties = Dispatch<SetStateAction<Property[]>>;

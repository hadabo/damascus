import { Governorate, District, Municipality, Neighborhood } from '../index.js';

export function useGovernorates(): Pick<Governorate, 'id' | 'name' | 'pcode' | 'coordinates'>[];
export function useDistricts(governorateId?: string): District[];
export function useMunicipalities(governorateId?: string): Pick<Municipality, 'id' | 'name' | 'pcode' | 'coordinates'>[];
export function useNeighborhoods(municipalityId: string): Neighborhood[];
export function useSyriaSearch(query: string): Array<{
    type: 'governorate' | 'district' | 'municipality' | 'neighborhood';
    item: any;
    municipalityId?: string;
}>;

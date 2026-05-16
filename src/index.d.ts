export interface LocalizedName {
  en: string;
  ar: string;
}

export interface Neighborhood {
  id: string;
  name: LocalizedName;
}

export interface Municipality {
  id: string;
  name: LocalizedName;
  neighborhoods?: Neighborhood[];
}

export interface District {
  id: string;
  name: LocalizedName;
}

export interface Governorate {
  id: string;
  name: LocalizedName;
  municipalities?: Municipality[];
  districts?: District[];
}

export interface SearchResult {
  type: 'governorate' | 'district' | 'municipality' | 'neighborhood';
  item: Governorate | District | Municipality | Neighborhood;
  municipalityId?: string;
}

export function getAll(): Governorate[];
export function getGovernorates(): Array<{ id: string; name: LocalizedName }>;
export function getDistricts(governorateId?: string): District[];
export function getMunicipalities(governorateId?: string): Array<{ id: string; name: LocalizedName }>;
export function getNeighborhoods(municipalityId: string): Neighborhood[];
export function search(query: string): SearchResult[];

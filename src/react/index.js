import { useMemo } from 'react';
import * as syria from '../index.js';

/**
 * Returns all 14 Syrian governorates.
 */
export function useGovernorates() {
  return useMemo(() => syria.getGovernorates(), []);
}

/**
 * Returns districts for a given governorate ID.
 * @param {string} governorateId 
 */
export function useDistricts(governorateId) {
  return useMemo(() => syria.getDistricts(governorateId), [governorateId]);
}

/**
 * Returns all municipalities for a given governorate ID.
 * @param {string} governorateId 
 */
export function useMunicipalities(governorateId) {
  return useMemo(() => syria.getMunicipalities(governorateId), [governorateId]);
}

/**
 * Returns all neighborhoods for a given municipality ID.
 * @param {string} municipalityId 
 */
export function useNeighborhoods(municipalityId) {
  return useMemo(() => syria.getNeighborhoods(municipalityId), [municipalityId]);
}

/**
 * Real-time search across the entire hierarchical dataset.
 * @param {string} query Search text (Arabic or English)
 */
export function useSyriaSearch(query) {
  return useMemo(() => syria.search(query), [query]);
}

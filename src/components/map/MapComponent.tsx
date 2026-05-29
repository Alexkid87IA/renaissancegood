import { useEffect, useRef, useState } from 'react';
import { Store } from '../../types/store';

interface MapComponentProps {
  stores: Store[];
  selectedStore: Store | null;
  onSelectStore: (store: Store | null) => void;
  userLocation?: { lat: number; lng: number } | null;
  initialCenter?: [number, number];
  initialZoom?: number;
  disableAutoBounds?: boolean;
}

function markerIcon(isSelected: boolean): string {
  const fill = isSelected ? '#8b7355' : '#f7f3eb';
  const stroke = isSelected ? '#f7f3eb' : '#8b7355';
  return `
    <svg viewBox="0 0 24 24" style="width: 100%; height: 100%; filter: drop-shadow(0 2px 7px rgba(0,0,0,0.18));">
      <circle cx="12" cy="12" r="7" fill="${fill}" stroke="${stroke}" stroke-width="1.4" />
      <circle cx="12" cy="12" r="2.2" fill="${stroke}" />
    </svg>
  `;
}

function setMarkerSelected(element: HTMLElement, isSelected: boolean) {
  const nextValue = String(isSelected);
  if (element.dataset.selected === nextValue) return;
  element.dataset.selected = nextValue;
  element.innerHTML = markerIcon(isSelected);
}

export default function MapComponent({ stores, selectedStore, onSelectStore, userLocation, initialCenter, initialZoom, disableAutoBounds = false }: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapboxModule = useRef<typeof import('mapbox-gl') | null>(null);
  const map = useRef<import('mapbox-gl').Map | null>(null);
  const storeMarkers = useRef<Map<string, import('mapbox-gl').Marker>>(new Map());
  const markerElements = useRef<Map<string, HTMLElement>>(new Map());
  const selectedStoreId = useRef<string | null>(null);
  const userLocationMarker = useRef<import('mapbox-gl').Marker | null>(null);
  const initialView = useRef({
    center: initialCenter,
    zoom: initialZoom,
  });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    let cancelled = false;

    async function initializeMap() {
      const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
      if (!token) {
        setMapError(true);
        return;
      }

      try {
        await import('mapbox-gl/dist/mapbox-gl.css');
        const loadedMapbox = await import('mapbox-gl');
        const mapboxgl = loadedMapbox.default;

        if (cancelled || !mapContainer.current) return;

        mapboxgl.accessToken = token;
        mapboxModule.current = loadedMapbox;

        // Créer la carte centrée sur la France
        const isMobile = window.innerWidth < 768;

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: initialView.current.center || [2.3522, 46.6],
          zoom: initialView.current.zoom || (isMobile ? 4.5 : 5.8),
          attributionControl: false,
          logoPosition: 'bottom-left',
          scrollZoom: false,
          projection: 'mercator'
        });

        // Ajouter les contrôles de navigation (zoom +/-)
        map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

        // Ajouter le contrôle de géolocalisation
        map.current.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
          }),
          'bottom-right'
        );

        map.current.on('load', () => {
          if (!cancelled) setMapLoaded(true);
        });
      } catch {
        if (!cancelled) setMapError(true);
      }
    }

    void initializeMap();

    const markersById = storeMarkers.current;
    const elementsById = markerElements.current;

    return () => {
      cancelled = true;
      if (map.current) {
        map.current.remove();
        map.current = null;
        markersById.clear();
        elementsById.clear();
      }
    };
  }, []);

  // Add markers for stores
  useEffect(() => {
    const mapboxgl = mapboxModule.current?.default;
    if (!map.current || !mapLoaded || !mapboxgl) return;

    const visibleStoreIds = new Set(stores.filter((store) => store.latitude && store.longitude).map((store) => store.id));

    storeMarkers.current.forEach((marker, storeId) => {
      if (!visibleStoreIds.has(storeId)) {
        marker.remove();
        storeMarkers.current.delete(storeId);
        markerElements.current.delete(storeId);
      }
    });

    // Ajouter uniquement les nouveaux marqueurs pour garder le filtrage fluide.
    stores.forEach((store) => {
      if (!store.latitude || !store.longitude) return;
      if (storeMarkers.current.has(store.id)) return;

      // Créer un élément HTML custom pour le marqueur
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.width = '22px';
      el.style.height = '22px';
      el.style.cursor = 'pointer';
      setMarkerSelected(el, false);
      markerElements.current.set(store.id, el);

      // Créer le popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        className: 'renaissance-popup'
      }).setHTML(`
        <div style="padding: 12px; font-family: 'DM Sans', sans-serif;">
          <h3 style="font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 600; color: #1a1a1a; margin-bottom: 8px;">
            ${store.name}
          </h3>
          <p style="font-size: 13px; color: #666; margin-bottom: 4px;">
            ${store.address}
          </p>
          <p style="font-size: 13px; color: #666; margin-bottom: 12px;">
            ${store.postalCode} ${store.city}
          </p>
          ${store.phone ? `<p style="font-size: 13px; color: #8b7355; margin-bottom: 8px;">📞 ${store.phone}</p>` : ''}
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.fullAddress)}" 
            target="_blank"
            style="display: inline-block; padding: 8px 16px; background: #1a1a1a; color: white; text-decoration: none; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 8px;"
          >
            Y ALLER
          </a>
        </div>
      `);

      // Créer le marqueur
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([store.longitude, store.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      // Événement clic sur le marqueur
      el.addEventListener('click', () => {
        onSelectStore(store);
      });

      storeMarkers.current.set(store.id, marker);
    });

    const currentSelectedId = selectedStoreId.current;
    if (currentSelectedId) {
      const selectedElement = markerElements.current.get(currentSelectedId);
      if (selectedElement) setMarkerSelected(selectedElement, true);
    }

    // Ajuster la vue pour montrer tous les marqueurs
    if (!disableAutoBounds && stores.length > 0 && stores.some(s => s.latitude && s.longitude)) {
      const bounds = new mapboxgl.LngLatBounds();

      stores.forEach(store => {
        if (store.latitude && store.longitude) {
          bounds.extend([store.longitude, store.latitude]);
        }
      });

      map.current.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        maxZoom: 12
      });
    }
  }, [stores, mapLoaded, onSelectStore, disableAutoBounds]);

  // Mettre à jour l'état visuel du marqueur sélectionné sans reconstruire
  // toute la couche de marqueurs Mapbox.
  useEffect(() => {
    selectedStoreId.current = selectedStore?.id || null;
    markerElements.current.forEach((element, storeId) => {
      setMarkerSelected(element, storeId === selectedStoreId.current);
    });
  }, [selectedStore]);

  // Zoom on selected store
  useEffect(() => {
    if (!map.current || !selectedStore) return;

    if (selectedStore.latitude && selectedStore.longitude) {
      map.current.flyTo({
        center: [selectedStore.longitude, selectedStore.latitude],
        zoom: 14,
        duration: 1500
      });
    }
  }, [selectedStore]);

  // Show user location
  useEffect(() => {
    const mapboxgl = mapboxModule.current?.default;
    if (!map.current || !mapboxgl) return;

    if (!userLocation) {
      if (userLocationMarker.current) {
        userLocationMarker.current.remove();
        userLocationMarker.current = null;
      }
      return;
    }

    if (!userLocationMarker.current) {
      // Ajouter un marqueur pour la position de l'utilisateur
      const el = document.createElement('div');
      el.className = 'user-location-marker';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.background = '#4A90E2';
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';

      userLocationMarker.current = new mapboxgl.Marker({ element: el })
        .setLngLat([userLocation.lng, userLocation.lat])
        .addTo(map.current);
    } else {
      userLocationMarker.current.setLngLat([userLocation.lng, userLocation.lat]);
    }

    // Centrer sur la position de l'utilisateur
    map.current.flyTo({
      center: [userLocation.lng, userLocation.lat],
      zoom: 12,
      duration: 2000
    });
  }, [userLocation]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-beige px-6">
          <div className="max-w-sm text-center">
            <p className="font-sans text-[9px] tracking-[0.32em] uppercase font-bold text-bronze mb-3">
              Carte indisponible
            </p>
            <p className="font-sans text-sm text-dark-text/[0.55] leading-[1.7]">
              La liste des opticiens reste disponible ci-contre.
            </p>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-beige">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-dark-text mb-4"></div>
            <p className="font-sans text-sm text-dark-text/60 tracking-wider uppercase">
              Chargement de la carte...
            </p>
          </div>
        </div>
      )}

      {/* Style pour les popups */}
      <style>{`
        .renaissance-popup .mapboxgl-popup-content {
          padding: 0;
          border-radius: 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .renaissance-popup .mapboxgl-popup-tip {
          border-top-color: white;
        }
        .custom-marker {
          transition: transform 0.2s ease;
        }
        .custom-marker[data-selected="true"] {
          transform: scale(1.3);
        }
        .custom-marker:hover {
          transform: scale(1.2);
        }
        .custom-marker[data-selected="true"]:hover {
          transform: scale(1.35);
        }
        .mapboxgl-canvas {
          outline: none;
          filter: grayscale(1) contrast(0.94) brightness(1.04);
        }
        .mapboxgl-ctrl-logo {
          display: none !important;
        }
        .mapboxgl-ctrl-attrib {
          display: none !important;
        }
      `}</style>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Clé API Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHF1aWwiLCJhIjoiY21pYXA0MTMxMGc3bzJrcXB1bm12em1seiJ9.yjpl8WFjeQAS6wCBpa-4wg';

interface MapComponentProps {
  stores: any[];
  selectedStore: any | null;
  onSelectStore: (store: any | null) => void;
  userLocation?: { lat: number; lng: number } | null;
  initialCenter?: [number, number];
  initialZoom?: number;
  disableAutoBounds?: boolean;
}

export default function MapComponent({ stores, selectedStore, onSelectStore, userLocation, initialCenter, initialZoom, disableAutoBounds = false }: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Créer la carte centrée sur la France
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11', // Style clair et épuré
      center: initialCenter || [2.3522, 48.8566], // Paris par défaut
      zoom: initialZoom || 5.5, // Vue d'ensemble de la France
      attributionControl: false
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
      setMapLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Add markers for stores
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Supprimer les anciens marqueurs
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Ajouter les nouveaux marqueurs
    stores.forEach((store) => {
      if (!store.latitude || !store.longitude) return;

      // Créer un élément HTML custom pour le marqueur
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.cursor = 'pointer';
      
      // Icône lunettes SVG en bronze
      el.innerHTML = `
        <svg viewBox="0 0 100 50" style="width: 100%; height: 100%;">
          <ellipse cx="20" cy="25" rx="18" ry="22" fill="none" stroke="#8b7355" stroke-width="3" />
          <ellipse cx="80" cy="25" rx="18" ry="22" fill="none" stroke="#8b7355" stroke-width="3" />
          <line x1="38" y1="25" x2="62" y2="25" stroke="#8b7355" stroke-width="3" />
        </svg>
      `;

      // Si c'est le magasin sélectionné, changer la couleur
      if (selectedStore && selectedStore.id === store.id) {
        el.style.transform = 'scale(1.3)';
        el.innerHTML = `
          <svg viewBox="0 0 100 50" style="width: 100%; height: 100%;">
            <ellipse cx="20" cy="25" rx="18" ry="22" fill="#8b7355" stroke="#8b7355" stroke-width="3" />
            <ellipse cx="80" cy="25" rx="18" ry="22" fill="#8b7355" stroke="#8b7355" stroke-width="3" />
            <line x1="38" y1="25" x2="62" y2="25" stroke="#8b7355" stroke-width="3" />
          </svg>
        `;
      }

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

      markers.current.push(marker);
    });

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
  }, [stores, selectedStore, mapLoaded, onSelectStore]);

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
    if (!map.current || !userLocation) return;

    // Ajouter un marqueur pour la position de l'utilisateur
    const el = document.createElement('div');
    el.className = 'user-location-marker';
    el.style.width = '20px';
    el.style.height = '20px';
    el.style.borderRadius = '50%';
    el.style.background = '#4A90E2';
    el.style.border = '3px solid white';
    el.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';

    new mapboxgl.Marker({ element: el })
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(map.current);

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
      
      {/* Loading overlay */}
      {!mapLoaded && (
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
        .custom-marker:hover {
          transform: scale(1.2);
        }
        .mapboxgl-canvas {
          outline: none;
        }
      `}</style>
    </div>
  );
}
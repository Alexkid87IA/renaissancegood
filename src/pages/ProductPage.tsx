import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductSidebar from '../components/product/ProductSidebar';
import ProductImageSection from '../components/product/ProductImageSection';
import ProductCraftSection from '../components/product/ProductCraftSection';
import ProductBottomBar from '../components/product/ProductBottomBar';

export default function ProductPage() {
  const { id } = useParams();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const product = {
    id: '10103H-I',
    name: '10103H-I',
    collection: 'OPTICAL | HERITAGE',
    badge: 'NEW RELEASE',
    price: '€755,00',
    frame: 'Palladium White - Matte Black',
    lens: 'Clear Lens',
    colors: [
      { name: 'Palladium White - Matte Black' },
      { name: 'Black Gold' },
      { name: 'Silver' },
      { name: 'Titanium' },
      { name: 'Bronze' },
    ],
    dimensions: {
      lens: '51mm',
      bridge: '20mm',
      temple: '145mm'
    },
    description: 'Fabriquée à la main dans notre atelier du Jura, chaque monture Héritage incarne le savoir-faire français transmis de génération en génération. Les lignes épurées et le trident gravé symbolisent la force et l\'équilibre, créant une pièce intemporelle qui traverse les époques.'
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="relative flex pb-64">
        {/* Fixed Sidebar */}
        <ProductSidebar
          product={product}
          selectedColorIndex={selectedColorIndex}
          onColorChange={setSelectedColorIndex}
        />

        {/* Scrolling Content */}
        <div className="flex-1">
          <ProductImageSection
            imageUrl="https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Hero view"
            backgroundColor="bg-neutral-50"
            zIndex={10}
          />

          <ProductImageSection
            imageUrl="https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Front view"
            backgroundColor="bg-white"
            zIndex={20}
          />

          <ProductImageSection
            imageUrl="https://images.pexels.com/photos/1382559/pexels-photo-1382559.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Side view detail"
            backgroundColor="bg-neutral-100"
            zIndex={30}
          />

          <ProductCraftSection />
        </div>
      </div>

      <ProductBottomBar product={product} selectedColorIndex={selectedColorIndex} />
    </div>
  );
}

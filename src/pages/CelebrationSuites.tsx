import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter, Download, ShoppingBag } from 'lucide-react';

const collections = [
  {
    id: 1,
    name: 'The Classic Collection',
    description: 'Timeless elegance with soft lavender and blush accents',
    style: 'Classic',
    price: 48,
    image: '/images/plan_bright.jpg',
    items: ['Invitations', 'Menus', 'Place Cards', 'Favor Tags'],
    featured: true,
  },
  {
    id: 2,
    name: 'The Garden Suite',
    description: 'Botanical beauty with soft florals',
    style: 'Floral',
    price: 52,
    image: '/images/celebrate_bright.jpg',
    items: ['Invitations', 'Programs', 'Table Numbers', 'Thank You Cards'],
    featured: false,
  },
  {
    id: 3,
    name: 'The Modern Minimal',
    description: 'Clean lines and contemporary sophistication',
    style: 'Modern',
    price: 42,
    image: '/images/kit_grid_03.jpg',
    items: ['Invitations', 'RSVP Cards', 'Menus', 'Place Cards'],
    featured: false,
  },
  {
    id: 4,
    name: 'The Lavender Brunch',
    description: 'Soft purples and elegant typography',
    style: 'Floral',
    price: 46,
    image: '/images/kit_grid_04.jpg',
    items: ['Invitations', 'Menus', 'Place Cards', 'Garland'],
    featured: false,
  },
  {
    id: 5,
    name: 'The Midnight Floral',
    description: 'Dramatic blooms with soft details',
    style: 'Floral',
    price: 58,
    image: '/images/kit_grid_05.jpg',
    items: ['Statement Invite', 'Envelope Liner', 'Programs', 'Menus'],
    featured: true,
  },
  {
    id: 6,
    name: 'The Balloon Guide',
    description: 'DIY balloon garland with step-by-step instructions',
    style: 'Modern',
    price: 0,
    image: '/images/kit_grid_06.jpg',
    items: ['Shopping List', 'Step-by-Step Guide', 'Design Templates'],
    featured: false,
    free: true,
  },
];

const styles = ['All', 'Classic', 'Floral', 'Modern'];

export default function CelebrationSuites() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredCollections = activeFilter === 'All' 
    ? collections 
    : collections.filter(c => c.style === activeFilter);

  const featuredCollection = collections.find(c => c.featured && c.id === 1);

  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <section className="w-full py-16 lg:py-24 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Celebration Suites</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-spa-charcoal leading-tight mt-4">
              Exquisite collections for your <span className="text-spa-purple">perfect celebration.</span>
            </h1>
            <p className="mt-6 text-lg text-spa-gray leading-relaxed">
              Printable stationery suites designed with the same elegance and attention to detail that defines the Spa-Pregio experience.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      {featuredCollection && (
        <section className="w-full py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="elegant-card overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px]">
                  <img
                    src={featuredCollection.image}
                    alt={featuredCollection.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <span className="text-sm uppercase tracking-[0.15em] text-spa-purple">Featured Collection</span>
                  <h2 className="font-serif text-3xl lg:text-4xl text-spa-charcoal mt-4">
                    {featuredCollection.name}
                  </h2>
                  <p className="mt-4 text-spa-gray leading-relaxed">
                    {featuredCollection.description}
                  </p>
                  <div className="mt-6">
                    <p className="text-sm text-spa-gray mb-2">Includes:</p>
                    <div className="flex flex-wrap gap-2">
                      {featuredCollection.items.map((item, i) => (
                        <span key={i} className="px-3 py-1 bg-spa-lavender rounded-full text-sm text-spa-charcoal">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-8">
                    <span className="font-serif text-3xl text-spa-charcoal">
                      ${featuredCollection.price}
                    </span>
                    <button className="btn-primary">
                      <ShoppingBag size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Collections */}
      <section className="w-full py-16 lg:py-20 bg-spa-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <h2 className="font-serif text-2xl lg:text-3xl text-spa-charcoal">
              All Collections
            </h2>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-spa-gray" />
              <div className="flex gap-2">
                {styles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setActiveFilter(style)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeFilter === style
                        ? 'bg-spa-purple text-white'
                        : 'bg-white text-spa-charcoal hover:bg-spa-lavender'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollections.map((collection) => (
              <div key={collection.id} className="elegant-card group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {collection.free && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-spa-purple text-white text-xs font-medium uppercase tracking-wider">
                      Free
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-spa-purple">
                      {collection.style}
                    </span>
                    <span className="font-serif text-xl text-spa-charcoal">
                      {collection.free ? 'Free' : `$${collection.price}`}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-spa-charcoal group-hover:text-spa-purple transition-colors">
                    {collection.name}
                  </h3>
                  <p className="mt-2 text-sm text-spa-gray">
                    {collection.description}
                  </p>
                  <button className={`flex items-center gap-2 mt-4 text-sm font-medium ${
                    collection.free ? 'text-spa-purple' : 'text-spa-charcoal hover:text-spa-purple'
                  } transition-colors`}>
                    {collection.free ? (
                      <>
                        <Download size={16} />
                        Download Free
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-spa-charcoal">
            Need something <span className="text-spa-purple">custom?</span>
          </h2>
          <p className="mt-4 text-spa-gray leading-relaxed max-w-2xl mx-auto">
            Our design team can create a bespoke Celebration Suite tailored to your unique vision. From monograms to custom illustrations, we bring your dream to life.
          </p>
          <Link to="/about" className="btn-outline mt-8 inline-flex">
            Contact Our Design Team
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

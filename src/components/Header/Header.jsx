import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiChevronDown, FiShoppingBag, FiHeart } from "react-icons/fi";
import { GiDress, GiClothes, GiHandBag, GiDiamondRing, GiSkirt, GiShirt } from "react-icons/gi";
import CartBottomSheet from "../cart/CartBottomSheet";

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const shopRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // TEMP mock hooks (remove later)
  const useCart = () => ({
    items: [],
    hideBadge: () => {},
    showBadge: true,
  });

  const useWishlist = () => ({
    wish: [],
    hideBadge: () => {},
    showBadge: true,
  });

  const { items, hideBadge: hideCartBadge, showBadge: showCartBadge } =
    useCart();
  const { wish, hideBadge: hideWishBadge, showBadge: showWishBadge } =
    useWishlist();

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" },
  ];

  const shopLinks = [
    { to: "/shop?category=Dresses", label: "Dresses", icon: <GiDress /> },
    { to: "/shop?category=Tops", label: "Tops", icon: <GiClothes /> },
    { to: "/shop?category=Bags", label: "Bags", icon: <GiHandBag /> },
    { to: "/shop?category=Accessories", label: "Accessories", icon: <GiDiamondRing /> },
    { to: "/shop?category=Skirts", label: "Skirts", icon: <GiSkirt /> },
    { to: "/shop?category=Shirts", label: "Shirts", icon: <GiShirt /> },
    { to: "/shop?category=All", label: "All Fashion", icon: <FiShoppingBag /> },
  ];

  useEffect(() => {
    if (!shopOpen) return;
    const handler = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [shopOpen]);

  const handleCartOpen = () => {
    setCartOpen(true);
    hideCartBadge();
  };

  const handleWishlistClick = () => {
    hideWishBadge();
    navigate("/wishlist");
  };

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 relative">
        <Link to="/" className="text-3xl font-bold tracking-widest text-black">
          MW
        </Link>

        <nav className="hidden sm:flex gap-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <span className="relative group" key={item.to}>
                <Link
                  to={item.to}
                  className={`px-2 py-1 transition ${isActive ? 'font-semibold' : 'hover:text-black/70'}`}
                >
                  {item.label}
                </Link>
                {/* Animated underline */}
                <span className={`absolute left-0 -bottom-0.5 w-full h-0.5 bg-black transition-transform duration-300 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`} style={{display:'block'}}></span>
              </span>
            );
          })}
          <div
            ref={shopRef}
            className="relative"
            onMouseEnter={() => {
              clearTimeout(window._shopDropdownTimeout);
              setShopOpen(true);
            }}
            onMouseLeave={() => {
              window._shopDropdownTimeout = setTimeout(() => setShopOpen(false), 120);
            }}
          >
            <button className="flex items-center gap-1 px-2 py-1 relative group">
              <span>Shop</span>
              <FiChevronDown className={`transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`} />
              {/* Underline animation for Shop navlink */}
              <span className="absolute left-0 -bottom-0.5 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{display:'block'}}></span>
            </button>

            {shopOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 bg-white border rounded-xl shadow-lg py-2 px-1 flex flex-col gap-1 animate-fadeIn z-30"
                onMouseEnter={() => { clearTimeout(window._shopDropdownTimeout); setShopOpen(true); }}
                onMouseLeave={() => { setShopOpen(false); }}
              >
                {shopLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-base"
                    onClick={() => setShopOpen(false)}
                  >
                    <span className="text-gray-500">{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-4 items-center">
          <button onClick={handleWishlistClick} className="cursor-pointer">
            <FiHeart size={22} />
          </button>

          <button onClick={handleCartOpen} className="cursor-pointer">
            <HiOutlineShoppingBag size={24} />
          </button>

          {/* Fluid Hamburger Button */}
          <button
            className="sm:hidden p-0.5 rounded focus:outline-none relative z-10 flex items-center"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((v) => !v)}
            style={{ WebkitTapHighlightColor: 'transparent', alignSelf: 'center' }}
          >
            <span className="block w-5 h-5 relative">
              <span className="absolute left-0 top-0.5 w-5 h-0.5 bg-black rounded" style={{height: '1.5px'}} />
              <span className="absolute left-0 top-2 w-5 h-0.5 bg-black rounded" style={{height: '1.5px'}} />
              <span className="absolute left-0 top-3.5 w-5 h-0.5 bg-black rounded" style={{height: '1.5px'}} />
            </span>
          </button>
        </div>

        {/* Mobile Sidebar */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 flex">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={() => setMobileNavOpen(false)}></div>
            {/* Sidebar */}
            <div className="relative bg-white w-72 max-w-full h-full shadow-xl z-50 animate-slideInLeft">
              <button
                className="absolute top-3 right-3 text-xl p-1 rounded hover:bg-gray-100 transition"
                onClick={() => { setMobileNavOpen(false); setShopOpen(false); }}
                aria-label="Close sidebar"
              >
                &times;
              </button>
              <nav className="flex flex-col gap-4 p-6">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileNavOpen(false)}
                    className="text-lg"
                  >
                    {item.label}
                  </Link>
                ))}
                {/* Shop dropdown in mobile nav */}
                <div className="pt-4 border-t">
                  <button
                    className="flex items-center gap-2 py-2 text-lg font-semibold w-full text-left transition-all duration-300"
                    onClick={() => setShopOpen(shopOpen ? false : true)}
                    aria-expanded={shopOpen}
                    aria-label="Shop categories"
                    type="button"
                  >
                    <FiChevronDown className={`transition-transform duration-300 ${shopOpen ? 'rotate-180' : ''}`} />
                    Shop
                  </button>
                  <div
                    className={`flex flex-col gap-1 mt-2 transition-all duration-300 overflow-hidden ${shopOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                    style={{ willChange: 'max-height, opacity' }}
                  >
                    {shopLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-100 transition"
                        onClick={() => {
                          setMobileNavOpen(false);
                          setShopOpen(false);
                        }}
                      >
                        <span className="text-gray-500">{link.icon}</span>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Cart Sidebar/Drawer */}
        {cartOpen && (
          <CartBottomSheet open={cartOpen} onClose={() => setCartOpen(false)} />
        )}
      </div>
    </header>
  );
}


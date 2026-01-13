export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentCategory = searchParams.get("category");
  const { items, hideBadge: hideCartBadge, showBadge: showCartBadge } = useCart();
  const { wish, hideBadge: hideWishBadge, showBadge: showWishBadge } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const currentPath = window.location.pathname;
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" },
  ];
  const handleCartOpen = () => { setCartOpen(true); hideCartBadge(); };
  const handleWishlistClick = () => { hideWishBadge(); };
  const handleLogout = () => { logout(); setAccountOpen(false); navigate('/'); };
      const [mobileOpen, setMobileOpen] = useState(false);
      const [accountOpen, setAccountOpen] = useState(false);
      const [hoveredNav, setHoveredNav] = useState(null);
      const [searchParams] = useSearchParams();
      const navigate = useNavigate();
      const currentCategory = searchParams.get("category");
      const { items, hideBadge: hideCartBadge, showBadge: showCartBadge } = useCart();
      const { wish, hideBadge: hideWishBadge, showBadge: showWishBadge } = useWishlist();
      const { user, isAuthenticated, logout } = useAuth();
      const currentPath = window.location.pathname;
      const navItems = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/blog", label: "Blog" },
        { to: "/contact", label: "Contact" },
        { to: "/faq", label: "FAQ" },
      ];
      const handleCartOpen = () => { setCartOpen(true); hideCartBadge(); };
      const handleWishlistClick = () => { hideWishBadge(); };
      const handleLogout = () => { logout(); setAccountOpen(false); navigate('/'); };
      return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            {/* LEFT */}
            <div className="hidden lg:flex items-center gap-3 text-gray-600 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">Follow</span>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition" aria-label="Instagram">
                  <FiInstagram size={16} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition" aria-label="Twitter">
                  <FiTwitter size={16} />
                </a>
              </div>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-gray-900 transition text-xs">Support</a>
            </div>
            {/* CENTER LOGO */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link to="/shop" className="text-xl sm:text-2xl font-serif tracking-tight text-gray-900 hover:opacity-90 transition">
                MW <span className="font-light italic text-gray-700 text-sm sm:text-base">Store</span>
              </Link>
            </div>
            {/* RIGHT NAV */}
            <div className="flex items-center gap-4">
              {/* Account Dropdown */}
              <div className="relative">
                <button onClick={() => setAccountOpen(!accountOpen)} className="relative hover:text-gray-900 transition" aria-label="Account">
                  <FiUser size={18} />
                </button>
                {accountOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setAccountOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                      {isAuthenticated ? (
                        <>
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                          </div>
                          <Link to="/orders" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">Order History</Link>
                          {user?.role === 'admin' && (
                            <Link to="/admin" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">Admin Dashboard</Link>
                          )}
                          <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition flex items-center gap-2">
                            <FiLogOut size={14} /> Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link to="/login" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">Login</Link>
                          <Link to="/register" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">Sign Up</Link>
                          <div className="border-t border-gray-100 mt-2 pt-2">
                            <Link to="/admin" onClick={() => setAccountOpen(false)} className="block px-4 py-2 text-sm text-slate-600 hover:bg-gray-50 transition">Admin Login</Link>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
              <Link to="/wishlist" onClick={handleWishlistClick} className="relative hover:text-gray-900 transition" aria-label={`Wishlist (${wish.length} items)`}>
                <FiHeart size={18} />
                {showWishBadge && wish.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 rounded-full w-3 h-3" aria-hidden="true" />
                )}
              </Link>
              <button onClick={handleCartOpen} className="relative hover:text-gray-900 transition" aria-label="Checkout">
                <HiOutlineShoppingBag size={20} />
                {showCartBadge && items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">{items.length}</span>
                )}
              </button>
            </div>
            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={() => { handleWishlistClick(); window.location.href = '/wishlist'; }} className="p-2 hover:text-gray-900">
                <FiHeart size={18} />
                {showWishBadge && wish.length > 0 && <span className="absolute -top-1 -right-1 bg-pink-500 rounded-full w-2 h-2" />}
              </button>
              <button onClick={handleCartOpen} className="p-2 relative hover:text-gray-900">
                <HiOutlineShoppingBag size={18} />
                {showCartBadge && items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">{items.length}</span>
                )}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-md border border-gray-200">
                <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            {/* Category indicator - positioned outside flex to prevent overlap */}
            {currentCategory && (
              <div className="md:hidden absolute right-2 top-3 text-xs bg-black text-white px-2.5 py-1 rounded whitespace-nowrap z-40">{currentCategory}</div>
            )}
          </div>
          {/* Navlinks below main header row */}
          <div className="w-full flex flex-col items-center">
            <nav className="hidden md:flex items-center gap-3 lg:gap-6 text-xs lg:text-sm text-gray-700 relative mt-6">
              {navItems.map((item) => (
                <div key={item.to} className="relative hidden lg:inline-block">
                  <Link
                    to={item.to}
                    className="hover:text-gray-900 transition px-1"
                    onMouseEnter={() => setHoveredNav(item.to)}
                    onFocus={() => setHoveredNav(item.to)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    {item.label}
                    <span className={`nav-underline ${(hoveredNav === item.to || currentPath === item.to) ? 'active' : ''}`} />
                  </Link>
                </div>
              ))}
              <MegaDropdown />
            </nav>
          </div>
          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
              <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3 text-sm">
                <Link to="/" onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-gray-900 py-2">Home</Link>
                <div className="border-b border-gray-200 pb-3">
                  <ShopDropdown onClose={() => setMobileOpen(false)} />
                </div>
                <Link to="/about" onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-gray-900 py-2">About</Link>
                <Link to="/blog" onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-gray-900 py-2">Blog</Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-gray-900 py-2">Contact</Link>
                <Link to="/faq" onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-gray-900 py-2">FAQ</Link>
                {/* Account section */}
                <hr className="my-2 border-gray-200" />
                {isAuthenticated ? (
                  <>
                    <div className="py-2 px-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link to="/orders" onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-gray-900 py-2">Order History</Link>
                    {user?.role === 'admin' && (
                      <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-gray-900 py-2">Admin Dashboard</Link>
                    )}
                    <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-left text-red-600 hover:text-red-700 py-2 flex items-center gap-2">
                      <FiLogOut size={14} /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-gray-900 py-2">Login</Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="text-gray-700 hover:text-gray-900 py-2">Sign Up</Link>
                    <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-slate-600 hover:text-slate-900 py-2">Admin Login</Link>
                  </>
                )}
                <hr className="my-2 border-gray-200" />
                <div className="flex gap-3 py-2">
                  <span className="text-xs text-gray-500">Follow</span>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900" aria-label="Instagram">
                    <FiInstagram size={16} />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900" aria-label="Twitter">
                    <FiTwitter size={16} />
                  </a>
                </div>
              </div>
            </div>
          )}
          <CartBottomSheet open={cartOpen} onClose={() => setCartOpen(false)} />
        </header>
      );
    }
      <CartBottomSheet open={cartOpen} onClose={() => setCartOpen(false)} />

    </header>

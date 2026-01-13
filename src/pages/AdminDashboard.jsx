import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { productsApi, ordersApi } from "../services/api";
import { useToast } from "../context/ToastContext";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [stockUpdate, setStockUpdate] = useState({ productId: null, quantity: 0, action: 'add' });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/');
      return;
    }

    loadData();
  }, [isAuthenticated, user, activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === "products") {
        const data = await productsApi.getAll({ limit: 100 });
        setProducts(data.products);
      } else if (activeTab === "orders") {
        const data = await ordersApi.getAll();
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
      showToast("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStock = async (productId) => {
    try {
      await productsApi.updateStock(
        productId,
        Number(stockUpdate.quantity),
        stockUpdate.action,
        'Admin update'
      );
      showToast("Stock updated successfully");
      setStockUpdate({ productId: null, quantity: 0, action: 'add' });
      loadData();
    } catch (error) {
      showToast(error.message || "Failed to update stock");
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await ordersApi.updateStatus(orderId, status, `Updated to ${status}`);
      showToast("Order status updated");
      loadData();
    } catch (error) {
      showToast(error.message || "Failed to update order");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-emerald-100 text-emerald-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--color-mw-beige)] py-10 md:py-16">
      <div className="container">
        <motion.h1 
          className="text-4xl md:text-5xl font-serif mb-8 md:mb-12" 
          style={{ fontFamily: 'var(--font-serif)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Admin Dashboard
        </motion.h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === "products"
                ? "border-b-2 border-slate-900 text-slate-900"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Products & Inventory
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 font-medium transition-all ${
              activeTab === "orders"
                ? "border-b-2 border-slate-900 text-slate-900"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Orders
          </button>
        </div>

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <>
          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Inventory Management</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left">Product</th>
                      <th className="p-3 text-left">Category</th>
                      <th className="p-3 text-left">Price</th>
                      <th className="p-3 text-center">Stock</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-xs text-gray-500">ID: {product._id.slice(-6)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">{product.category}</td>
                        <td className="p-3">${product.price.toFixed(2)}</td>
                        <td className="p-3 text-center">
                          <span
                            className={`px-2 py-1 rounded text-sm font-medium ${
                              product.stock === 0
                                ? "bg-red-100 text-red-800"
                                : product.stock < 20
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-3">
                          {stockUpdate.productId === product._id ? (
                            <div className="flex items-center gap-2 justify-center">
                              <select
                                value={stockUpdate.action}
                                onChange={(e) =>
                                  setStockUpdate({ ...stockUpdate, action: e.target.value })
                                }
                                className="px-2 py-1 border rounded text-sm"
                              >
                                <option value="add">Add</option>
                                <option value="set">Set</option>
                              </select>
                              <input
                                type="number"
                                value={stockUpdate.quantity}
                                onChange={(e) =>
                                  setStockUpdate({ ...stockUpdate, quantity: e.target.value })
                                }
                                className="w-20 px-2 py-1 border rounded text-sm"
                                min="0"
                              />
                              <button
                                onClick={() => handleUpdateStock(product._id)}
                                className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setStockUpdate({ productId: null, quantity: 0, action: 'add' })}
                                className="px-3 py-1 bg-gray-300 rounded text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                setStockUpdate({
                                  productId: product._id,
                                  quantity: product.stock,
                                  action: 'set'
                                })
                              }
                              className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                            >
                              Update Stock
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Order Management</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-20 text-gray-500">No orders yet</div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="glass-card p-6 rounded-xl">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
                          <p className="text-sm text-gray-500">
                            Customer: {order.user?.name || 'N/A'} ({order.user?.email || 'N/A'})
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status.toUpperCase()}
                          </span>
                          <div className="text-xl font-bold mt-2">${order.total.toFixed(2)}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <div className="font-medium">Shipping Address:</div>
                          <div className="text-gray-600">
                            {order.shippingAddress.street}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Items:</div>
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-gray-600">
                              {item.name} × {item.quantity}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                          className="px-3 py-2 border rounded-md text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="paid">Paid</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
      </div>
    </div>
  );
}

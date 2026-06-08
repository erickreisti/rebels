"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

export function CartSidebar() {
  const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-110 cursor-pointer"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-900 border-l-4 border-black z-120 shadow-[-12px_0px_0px_#000] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b-4 border-black bg-accent-500">
              <h2 className="text-3xl font-sans font-black text-black uppercase tracking-tighter">Your Passes</h2>
              <button
                onClick={() => toggleCart(false)}
                className="p-2 border-2 border-black bg-white text-black shadow-[4px_4px_0px_#000] hover:shadow-[0px_0px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-2xl font-black text-white/50 uppercase">No Passes Yet</p>
                  <p className="text-sm font-bold text-white/30 mt-2">Secure your spot at the next event.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000] relative group"
                  >
                    <div>
                      <h3 className="font-black text-black text-2xl uppercase leading-none">{item.eventName}</h3>
                      <p className="text-sm font-bold text-pink-500 uppercase mt-2">{item.date}</p>
                      <p className="text-xs font-bold text-gray-500 uppercase mt-1">{item.location}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6 border-t-2 border-black/10 pt-4">
                      <span className="font-black text-black text-2xl">${item.price.toFixed(2)}</span>
                      
                      <div className="flex items-center space-x-2 border-2 border-black bg-surface-100">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-black hover:text-white transition-colors"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-black w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-black hover:text-white transition-colors"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="absolute -top-3 -right-3 p-2 bg-red-500 border-2 border-black text-white shadow-[2px_2px_0px_#000] hover:shadow-[0px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all opacity-0 group-hover:opacity-100"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t-4 border-black bg-surface-800">
              <div className="flex justify-between items-end mb-6">
                <span className="text-white/50 font-bold uppercase tracking-widest text-sm">Total</span>
                <span className="text-4xl font-black text-white" style={{ textShadow: '4px 4px 0px #ec4899' }}>
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <button 
                disabled={cartItems.length === 0}
                className="w-full py-4 bg-pink-500 border-4 border-black text-black font-black uppercase tracking-widest text-xl shadow-[8px_8px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[6px] hover:translate-y-[6px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Checkout Passes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

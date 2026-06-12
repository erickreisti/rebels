"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { FaTicketAlt } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

export function CartSidebar() {
  const {
    isCartOpen,
    toggleCart,
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
  } = useCart();

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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-110 cursor-pointer"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-900 border-l-4 border-black z-120 shadow-[-16px_0px_0px_#000] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Your Passes cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b-4 border-black bg-accent-500">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-sans font-black text-black uppercase tracking-tighter">
                  Your Passes
                </h2>
                <AnimatePresence mode="wait">
                  {cartItems.length > 0 && (
                    <motion.span
                      key={cartItems.length}
                      initial={{ scale: 0, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", bounce: 0.6 }}
                      className="w-8 h-8 bg-black text-accent-500 text-sm font-black flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#fff]"
                    >
                      {cartItems.reduce((s, i) => s + i.quantity, 0)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={() => toggleCart(false)}
                aria-label="Close cart"
                className="p-2 border-2 border-black bg-white text-black shadow-[4px_4px_0px_#000] hover:shadow-[0px_0px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence>
                {cartItems.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center justify-center h-full text-center py-20 gap-6"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="text-white/20"
                    >
                      <FaTicketAlt className="w-20 h-20" />
                    </motion.div>
                    <div>
                      <p className="text-2xl font-black text-white/50 uppercase">No Passes Yet</p>
                      <p className="text-sm font-bold text-white/30 mt-2">
                        Secure your spot at the next event.
                      </p>
                    </div>
                    <button
                      onClick={() => toggleCart(false)}
                      className="mt-4 px-6 py-2 border-2 border-white/20 text-white/40 font-black uppercase tracking-widest text-xs hover:border-accent-500 hover:text-accent-500 transition-colors"
                    >
                      Browse Events ↓
                    </button>
                  </motion.div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      className="flex flex-col bg-white border-4 border-black p-4 shadow-[6px_6px_0px_#000] relative group"
                    >
                      {/* Info */}
                      <div>
                        <h3 className="font-black text-black text-2xl uppercase leading-none">
                          {item.eventName}
                        </h3>
                        <p className="text-sm font-bold text-pink-500 uppercase mt-2">{item.date}</p>
                        <p className="text-xs font-bold text-gray-500 uppercase mt-1">{item.location}</p>
                      </div>

                      {/* Price + Quantity Controls */}
                      <div className="flex items-center justify-between mt-6 border-t-2 border-black/10 pt-4">
                        <span className="font-black text-black text-2xl">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>

                        <div
                          className="flex items-center border-2 border-black bg-gray-100"
                          role="group"
                          aria-label={`Quantity for ${item.eventName}`}
                        >
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label={`Decrease quantity of ${item.eventName}`}
                            className="p-2 hover:bg-black hover:text-white transition-colors"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span
                            className="font-bold text-black w-8 text-center tabular-nums"
                            aria-live="polite"
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label={`Increase quantity of ${item.eventName}`}
                            className="p-2 hover:bg-black hover:text-white transition-colors"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Remove button */}
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.eventName} from cart`}
                        className="absolute -top-3 -right-3 p-2 bg-red-500 border-2 border-black text-white shadow-[2px_2px_0px_#000] hover:shadow-[0px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-6 border-t-4 border-black bg-surface-800">
              {/* Total row */}
              <div className="flex justify-between items-end mb-4">
                <span className="text-white/50 font-bold uppercase tracking-widest text-sm">Total</span>
                <motion.span
                  key={cartTotal}
                  initial={{ scale: 1.2, color: "#f5a818" }}
                  animate={{ scale: 1, color: "#ffffff" }}
                  transition={{ duration: 0.4 }}
                  className="text-4xl font-black text-white"
                  style={{ textShadow: "4px 4px 0px #ec4899" }}
                >
                  ${cartTotal.toFixed(2)}
                </motion.span>
              </div>

              {/* Checkout */}
              <button
                disabled={cartItems.length === 0}
                onClick={() => {
                  // Placeholder: replace with real payment flow
                  alert("Checkout coming soon! 🎟️");
                }}
                className="w-full py-4 bg-pink-500 border-4 border-black text-black font-black uppercase tracking-widest text-xl shadow-[8px_8px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[6px] hover:translate-y-[6px] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-[8px_8px_0px_#000] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                Checkout Passes
              </button>

              {/* Clear cart */}
              <AnimatePresence>
                {cartItems.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onClick={clearCart}
                    className="w-full mt-3 py-2 text-white/30 font-bold uppercase tracking-widest text-xs hover:text-red-400 transition-colors"
                  >
                    Clear All
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

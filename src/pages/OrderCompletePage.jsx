import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Calendar, Home, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const OrderCompletePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-600 mb-4">No order found.</p>
          <Button onClick={() => navigate("/")} className="gap-2">
            <Home className="w-4 h-4" />
            Go Home
          </Button>
        </motion.div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 px-4 py-8">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto"
          >
            {/* Header Section */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-8"
            >
              <motion.div
                animate={floatingAnimation}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg shadow-green-500/20"
              >
                <CheckCircle className="w-10 h-10 text-white" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="w-6 h-6 text-yellow-400 fill-current" />
                </motion.div>
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-4"
              >
                Order Complete!
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl text-slate-600 mb-2"
              >
                Thank you for your purchase
              </motion.p>
              
              <motion.div
                variants={itemVariants}
              >
                <Badge variant="secondary" className="text-sm font-normal px-3 py-1">
                  Order ID: {order.id}
                </Badge>
              </motion.div>
            </motion.div>

            {/* Order Summary Card */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200/80 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-200/30 transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <Package className="w-5 h-5 text-blue-600" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + idx * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 border border-slate-100"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{item.name}</p>
                          <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-slate-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2 }}
                    className="border-t border-slate-200"
                  />

                  {/* Total and Delivery */}
                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                      className="flex justify-between items-center text-lg font-semibold text-slate-900"
                    >
                      <span>Total Amount</span>
                      <span className="text-xl text-green-600">
                        ₹{order.total.toLocaleString()}
                      </span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="flex items-center gap-2 text-sm text-slate-600 bg-blue-50/50 p-3 rounded-lg border border-blue-100"
                    >
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>Estimated Delivery: </span>
                      <span className="font-medium text-slate-800">{order.deliveryDate}</span>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Action Button */}
            <motion.div
              variants={itemVariants}
              className="text-center mt-8"
            >
              <Button
                onClick={() => navigate("/")}
                size="lg"
                className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-base font-semibold group"
              >
                <Home className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                Continue Shopping
              </Button>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="text-sm text-slate-500 mt-4"
              >
                You will receive an order confirmation email shortly
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderCompletePage;
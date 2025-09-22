import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";

const CheckoutPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { state } = useLocation();
  const orderItem = state?.orderItem;

  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  // Load checkout items
  const cartItems = orderItem
    ? [orderItem]
    : JSON.parse(localStorage.getItem("cartItems")) || [];

  // Calculate total
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  //  Load saved addressy
  const savedAddress = JSON.parse(localStorage.getItem("checkoutInfo")) || {};

  const form = useForm({
    defaultValues: {
      phone: savedAddress.phone || "",
      address: savedAddress.address || "",
      landmark: savedAddress.landmark || "",
      city: savedAddress.city || "",
      state: savedAddress.state || "",
      pincode: savedAddress.pincode || "",
      paymentMethod: savedAddress.paymentMethod || "card",
      saveInfo: savedAddress.saveInfo || false,
    },
  });

  const onSubmit = async (values) => {

      if (!user) {
    navigate(`/user-auth?redirect=/checkout`);
    return;
  }

    if (cartItems.length === 0) {
      toast.error("No items to checkout ❌");
      return;
    }

    let itemsText = "";
    cartItems.forEach((item, index) => {
      const lineTotal = item.price * item.quantity;
      itemsText += `${index + 1}. ${item.name} - ₹${item.price} (x${item.quantity}) = ₹${lineTotal}\n   Image: ${item.imageUrl}\n`;
    });

    const customerInfo = `
📦 *New Order Received!*

👤 *Customer Details*
📞 Phone: ${values.phone}
🏠 Address: ${values.address}, ${values.landmark || ""}, 
${values.city}, ${values.state} - ${values.pincode}

🛒 *Items*
${itemsText}

💰 *Total: ₹${total}*
    `;

    const clientNumber = "918714404750";

    const url = `https://wa.me/${clientNumber}?text=${encodeURIComponent(customerInfo)}`;

    if (values.saveInfo) {
      localStorage.setItem("checkoutInfo", JSON.stringify(values));
    } else {
      localStorage.removeItem("checkoutInfo");
    }

    window.open(url, "_blank");
    toast.success("Redirecting to WhatsApp ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Complete Your Order</h1>
          <p className="text-slate-500 mt-2">Final step to get your products delivered</p>
        </div>

        {/* 🔥 Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT → Shipping Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg border-0 rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-black to-gray-900 text-white">
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription className="text-gray-300">
                  Enter your delivery details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Full address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pincode</FormLabel>
                          <FormControl>
                            <Input placeholder="Pincode" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="saveInfo"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <FormLabel className="text-sm font-normal">
                            Save my details for next time
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-black to-gray-900 py-6 text-lg font-medium"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT → Product Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-md border border-slate-200 rounded-xl sticky top-6">
              <CardHeader className="bg-slate-100">
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your items before placing order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item, idx) => (
                      <div
                        key={`${item.id}-${idx}`}
                        className="flex items-center gap-4 border-b pb-3 last:border-0"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-800">{item.name}</h3>
                          <p className="text-sm text-slate-500">
                            {item.color && <>Color: {item.color} • </>}
                            {item.size && <>Size: {item.size}</>}
                          </p>
                          <p className="text-sm text-slate-600">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="font-semibold text-slate-900">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between pt-3 text-lg font-semibold text-slate-900">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-slate-500 text-center">No items in your order</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

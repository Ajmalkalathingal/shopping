import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageCircle, Users, Sparkles 
} from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Message sent successfully! We'll get back to you within 24 hours.");

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    { icon: <Mail className="h-6 w-6" />, title: "Email Us", description: "We'll respond quickly", value: "hello@luxuryapp.com", badge: "Fast Response" },
    { icon: <Phone className="h-6 w-6" />, title: "Call Us", description: "Mon-Fri from 9am to 6pm", value: "+1 (555) 123-4567", badge: "24/7 Support" },
    { icon: <MapPin className="h-6 w-6" />, title: "Visit Us", description: "Come say hello at our office", value: "123 Luxury Street, NY 10001", badge: "Free Parking" },
    { icon: <Clock className="h-6 w-6" />, title: "Response Time", description: "We value your time", value: "Within 24 hours", badge: "Guaranteed" },
  ];

  const features = [
    { icon: <CheckCircle2 className="h-5 w-5" />, text: "24/7 Customer Support" },
    { icon: <CheckCircle2 className="h-5 w-5" />, text: "Secure & Encrypted" },
    { icon: <CheckCircle2 className="h-5 w-5" />, text: "Quick Response Time" },
    { icon: <CheckCircle2 className="h-5 w-5" />, text: "Expert Assistance" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm">
            <Sparkles className="w-4 h-4 mr-1" /> Premium Support
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1 space-y-6">
            {contactInfo.map((item, i) => (
              <Card key={i} className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <Badge variant="outline" className="text-xs">{item.badge}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <p className="text-gray-900 font-medium">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Features */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Why Choose Us</CardTitle>
                <CardDescription>We're committed to providing the best service</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-green-600">{f.icon}</div>
                    <span className="text-sm text-gray-700">{f.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <MessageCircle className="h-6 w-6 text-blue-600" /> Send us a Message
                </CardTitle>
                <CardDescription className="text-lg">
                  Fill out the form below and we'll get back to you shortly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required className="h-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is this regarding?" required className="h-12" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us how we can help you..." required rows={6} className="resize-none min-h-[150px]" />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-blue-600 text-white">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

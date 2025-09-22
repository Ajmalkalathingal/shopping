import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { 
  Card, 
  CardContent, 
  CardHeader 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Star, 
  Eye,
  Crown 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductCard({ product, className }) {
  return (
    <Link to={`/product/${product.id}`} className="block group">
      <Card className={cn(
        "overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50",
        "shadow-lg hover:shadow-xl transition-all duration-300",
        "group-hover:shadow-md group-hover:-translate-y-0.5",
        "ring-1 ring-gray-100/30 hover:ring-primary/10",
        "h-full flex flex-col",
        className
      )}>
        <CardHeader className="p-0 relative flex-shrink-0">
          <div className="relative overflow-hidden aspect-square"> 

            <LazyLoadImage
              src={product.imageUrl?.[0]}
              alt={product.name}
              effect="blur"
              className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105" // Changed to object-contain with padding
            />

            {/* Quick Actions Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                >
                  <Eye className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                >
                  <Heart className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-3 space-y-1.5 flex-1"> {/* Reduced padding */}
          {/* Category */}
          {product.category && (
            <Badge variant="outline" className="text-[10px] font-normal text-gray-500 px-1.5 py-0">
              {product.category}
            </Badge>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-xs line-clamp-2 group-hover:text-primary transition-colors mb-1">
            {product.name}
          </h3>

          

          {/* Price */}
          <div className="flex items-center gap-1.5 mt-auto"> {/* Added mt-auto for bottom alignment */}
            <span className="text-sm font-bold text-primary">
              ₹{product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
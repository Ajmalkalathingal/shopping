import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Eye,
  Zap,
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
        "h-full flex flex-col", // Added for proper height management
        className
      )}>
        <CardHeader className="p-0 relative flex-shrink-0">
          <div className="relative overflow-hidden aspect-square"> {/* Changed to aspect-square */}
            {/* Premium Crown Badge */}
            {product.isPremium && (
              <div className="absolute top-2 left-2 z-10">
                <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-white border-0 px-1.5 py-0.5 text-[10px]">
                  <Crown className="h-2.5 w-2.5 mr-0.5" />
                  Premium
                </Badge>
              </div>
            )}

            {/* Discount Badge */}
            {product.discount > 0 && (
              <Badge variant="destructive" className="absolute top-2 right-2 z-10 text-[10px] px-1.5 py-0.5">
                -{product.discount}%
              </Badge>
            )}

            <LazyLoadImage
              src={product.imageUrl}
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

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={cn(
                      "h-2.5 w-2.5",
                      i < Math.floor(product.rating) 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-[10px] text-gray-500">({product.reviewCount})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-1.5 mt-auto"> {/* Added mt-auto for bottom alignment */}
            <span className="text-sm font-bold text-primary">
              ${product.price.toFixed(2)}
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
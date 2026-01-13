import { Product } from "@/lib/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Pen, Trash, Plus, Minus } from "lucide-react";
import Rating from "../generic/Rating";
import { useCart } from "@/context/CartContext";

type ProductProps = {
  product: Product;
  handleDeleteProduct: (product: Product) => void;
  openDialog: (product: Product) => void;
};

export default function ProductCard({
  product,
  handleDeleteProduct,
  openDialog,
}: ProductProps) {
  const { cart, handleAddToCart, handleRemoveToCart } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);
  const rating = product.rating / 2;

  return (
    <Card key={product.id} className="w-max overflow-hidden">
      <CardHeader className="size-72 relative">
        <Image
          src="/images/gourde.jpg"
          alt="Picture of the product"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-1 p-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{product.name}</CardTitle>
          <div className="flex items-center gap-2">
            {cartItem && (
              <>
                <Button size="icon" onClick={() => handleRemoveToCart(product)}>
                  <Minus size={16} />
                </Button>
                <span className="w-4 text-center font-bold">
                  {cartItem.quantity}
                </span>
              </>
            )}
            <Button size="icon" onClick={() => handleAddToCart(product)}>
              <Plus />
            </Button>
          </div>
        </div>
        <CardDescription>{product.description}</CardDescription>
        <div className="flex items-center gap-1">
          <span>{rating}</span>
          <Rating rating={Math.round(rating)} />
        </div>
      </CardContent>
      <CardFooter className=" flex justify-between p-2 m-0">
        <span className="font-bold text-2xl">{product.price}€</span>
        <div className="flex gap-2">
          <Button
            className="bg-teal-600 hover:bg-teal-600/85"
            size="icon"
            onClick={() => openDialog(product)}
          >
            <Pen />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => handleDeleteProduct(product)}
          >
            <Trash />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

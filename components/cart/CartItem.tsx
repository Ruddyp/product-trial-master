"use client";

import { Item } from "@/lib/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import Rating from "../generic/Rating";
import { useCart } from "@/context/CartContext";

type CartItemProps = {
  item: Item;
};

export default function CartItem({ item }: CartItemProps) {
  const { handleAddToCart, handleRemoveToCart, handleDeleteToCart } = useCart();
  return (
    <Card key={item.id} className="w-full overflow-hidden flex shadow-md">
      <CardHeader className="size-48 relative">
        <Image
          src="/images/gourde.jpg"
          alt="Picture of the product"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-2">
        <CardTitle className="text-xl">
          {item.name} x{item.quantity}
        </CardTitle>
        <CardDescription>{item.description}</CardDescription>
        <div className="flex items-center gap-1">
          <span>{item.rating}</span>
          <Rating rating={Math.round(item.rating)} />
        </div>
        <span className="font-bold text-2xl">{item.price}€</span>
        <div className="flex gap-2">
          <Button size="icon" onClick={() => handleRemoveToCart(item)}>
            <Minus />
          </Button>
          <Button size="icon" onClick={() => handleAddToCart(item)}>
            <Plus />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end items-center flex-1 p-6">
        <Button
          variant="destructive"
          size="icon"
          onClick={() => handleDeleteToCart(item)}
        >
          <Trash />
        </Button>
      </CardFooter>
    </Card>
  );
}

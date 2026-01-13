"use client";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { useState } from "react";
import { CartDialog } from "../cart/CartDialog";

export default function NavBar() {
  const { totalItems } = useCart();
  const [cartDialogState, setCartDialogState] = useState(false);
  return (
    <header className="flex h-14 sm:h-20 md:h-24 lg:h-28 w-full items-center justify-between p-4 border-b-2">
      <Image src="/images/angular.png" alt="Angular" height={72} width={72} />
      <span className="text-2xl font-semibold">ALTEN SHOP</span>
      <div
        className="relative flex items-center justify-center p-2 cursor-pointer"
        onClick={() => setCartDialogState(true)}
      >
        <ShoppingCart size={28} />
        {totalItems > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center rounded-full px-1 tabular-nums">
            <span>{totalItems}</span>
          </Badge>
        )}
      </div>
      <CartDialog open={cartDialogState} setDialogState={setCartDialogState} />
    </header>
  );
}

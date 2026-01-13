"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/context/CartContext";
import { Dispatch, SetStateAction } from "react";
import { Item } from "@/lib/mockData";
import CartItem from "./CartItem";

type CartDialogProps = {
  open: boolean;
  setDialogState: Dispatch<SetStateAction<boolean>>;
};

export function CartDialog({ open, setDialogState }: CartDialogProps) {
  const { cart, totalItems, totalPrice } = useCart();
  return (
    <Dialog open={open} onOpenChange={setDialogState}>
      <DialogContent
        className="flex flex-col w-[80vw] max-w-[80vw] max-h-[85vh]"
        onInteractOutside={() => setDialogState(false)}
        aria-describedby={undefined}
      >
        <DialogHeader className="mb-4 space-y-4">
          <DialogTitle className="text-2xl font-semibold">
            Panier ({totalItems} articles)
          </DialogTitle>
          {totalItems === 0 && <span>Votre panier est vide.</span>}
        </DialogHeader>

        <div className="overflow-y-auto p-6 space-y-4">
          {cart.map((item: Item, index) => (
            <CartItem key={`${item.id}-${index}`} item={item} />
          ))}
        </div>

        {totalItems > 0 && (
          <span className="text-xl">
            Sous total: <span className="text-xl font-bold">{totalPrice}€</span>
          </span>
        )}

        <DialogFooter className="flex flex-row w-full justify-between sm:justify-between items-center mt-6">
          <Button variant="outline" onClick={() => setDialogState(false)}>
            Retour
          </Button>
          <Button disabled={totalItems === 0}>Continuer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

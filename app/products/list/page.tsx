"use client";
import ProductCard from "@/components/product/ProductCard";
import { FormFields, ProductDialog } from "@/components/product/ProductDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { mockProducts, Product } from "@/lib/mockData";
import { ArrowDown01, ArrowDown10, Euro, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type PriceSort = "no_sort" | "higher" | "lower";

export default function ProductsList() {
  const { handleDeleteToCart } = useCart();
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<undefined | Product>(
    undefined
  );
  const [dialogState, setDialogState] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [priceSort, setPriceSort] = useState<PriceSort>("no_sort");

  const openDialog = (product?: Product) => {
    setSelectedProduct(product);
    setDialogState(true);
  };

  const closeDialog = () => {
    setDialogState(false);
  };

  function handleDeleteProduct(product: Product) {
    // Suppression du produit dans le panier et la liste des produits
    handleDeleteToCart(product);
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item.id !== product.id)
    );
    toast.info(`Suppression du produit avec succès.`);
  }

  function handleSubmit(formValues: FormFields, id: number | undefined) {
    // Création d'un produit
    if (!id) {
      let newProduct = mockProducts[0];
      newProduct = { ...newProduct, ...formValues, id: Date.now() };
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      toast.success(`Création du produit ${formValues.name} avec succès.`);
      return;
    }

    // Modification d'un produit
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          return { ...product, ...formValues };
        }
        return product;
      })
    );
    toast.info(`Modification du produit ${formValues.name} avec succès.`);

    setDialogState(false);
  }

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => {
      if (priceSort === "no_sort") return 0;
      return priceSort === "lower" ? a.price - b.price : b.price - a.price;
    });

  return (
    <div className="flex flex-col size-full justify-start items-center gap-8 p-4">
      <h1 className="text-2xl font-bold">{`Liste des produits (${filteredProducts.length})`}</h1>
      <Button
        className="bg-sky-900 hover:bg-sky-900/85"
        onClick={() => openDialog()}
      >
        Créer produit
      </Button>
      <Card className="flex p-6 w-full max-w-md items-center justify-start rounded-xl shadow-sm gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="search" className="text-sm font-medium text-gray-700">
            Rechercher un produit
          </Label>
          <div className="relative">
            <Search className="absolute left-2 top-2" size={18} />
            <Input
              id="search"
              type="search"
              placeholder="Rechercher..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="pl-10 w-full focus-visible:ring-2"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium text-gray-700">
            Trier par prix
          </Label>
          <div className="cursor-pointer w-fit">
            {priceSort === "no_sort" && (
              <Euro size={32} onClick={() => setPriceSort("lower")} />
            )}
            {priceSort === "lower" && (
              <ArrowDown01 size={32} onClick={() => setPriceSort("higher")} />
            )}
            {priceSort === "higher" && (
              <ArrowDown10 size={32} onClick={() => setPriceSort("no_sort")} />
            )}
          </div>
        </div>
      </Card>
      <ProductDialog
        open={dialogState}
        closeDialog={closeDialog}
        product={selectedProduct}
        onSave={handleSubmit}
      />
      <div className="flex flex-wrap w-full gap-4 justify-center items-center">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleDeleteProduct={handleDeleteProduct}
            openDialog={openDialog}
          />
        ))}
      </div>
    </div>
  );
}

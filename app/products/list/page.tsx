"use client";
import ProductCard from "@/components/product/ProductCard";
import { FormFields, ProductDialog } from "@/components/product/ProductDialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { mockProducts, Product } from "@/lib/mockData";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductsList() {
  const { handleDeleteToCart } = useCart();
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<undefined | Product>(
    undefined
  );
  const [dialogState, setDialogState] = useState(false);

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

  return (
    <div className="flex flex-col size-full justify-start items-center gap-8 p-4">
      <h1 className="text-2xl font-bold">{`Liste des produits (${products.length})`}</h1>
      <Button
        className="bg-sky-900 hover:bg-sky-900/85"
        onClick={() => openDialog()}
      >
        Créer produit
      </Button>
      <ProductDialog
        open={dialogState}
        closeDialog={closeDialog}
        product={selectedProduct}
        onSave={handleSubmit}
      />
      <div className="flex flex-wrap w-full gap-4 justify-center items-center">
        {products.map((product) => (
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

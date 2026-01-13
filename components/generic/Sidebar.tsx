import { Home, Barcode, LucideProps, Contact } from "lucide-react";
import { Card } from "../ui/card";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import Link from "next/link";

type SideBarItems = {
  title: string;
  route: string;
  icon: null | ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export default function Sidebar() {
  const items: SideBarItems[] = [
    {
      title: "Accueil",
      route: "/",
      icon: Home,
    },
    {
      title: "Produits",
      route: "/products/list",
      icon: Barcode,
    },
    {
      title: "Contact",
      route: "/contact",
      icon: Contact,
    },
  ];
  return (
    <div className="flex flex-col w-1/5 border-r-2 overflow-y-auto ">
      {items.map((item, index) => {
        const { icon: IconComponent } = item;
        return (
          <Card
            key={`${item.title}-${index}`}
            className="rounded-none cursor-pointer hover:bg-gray-50"
          >
            <Link href={item.route} className="flex size-full p-4 gap-2">
              {IconComponent !== null && <IconComponent size={24} />}
              <p className="text-sm md:text-base">{item.title}</p>
            </Link>
          </Card>
        );
      })}
    </div>
  );
}

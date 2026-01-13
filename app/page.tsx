import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <Card className="flex flex-col gap-4 p-4 items-center justify-center rounded-md">
      <h1 className="text-2xl font-bold">Bienvenue</h1>
      <p className="text-md">Bienvenue sur ALTEN SHOP !</p>
    </Card>
  );
}

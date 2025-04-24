import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center gap-2">
      <Button asChild>
        <Link href="/dashboard/laudos/gerar-laudo">Gerar Laudo</Link>
      </Button>
      <Button asChild>
        <Link href="/dashboard/exames/anexar-imagens">Anexar imagens</Link>
      </Button>
    </main>
  );
};

export default DashboardPage;

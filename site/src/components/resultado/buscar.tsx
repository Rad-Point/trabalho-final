import {
  InputContainer,
  InputField,
  InputGroup,
  Label,
  Input,
} from "@/components/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
interface BuscarExameProps {
  getExame: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}
const BuscarExame = ({ getExame }: BuscarExameProps) => {
  return (
    <form
      className="w-full max-w-96 flex flex-col items-center gap-4 p-4 border border-accent rounded-2xl"
      onSubmit={getExame}
    >
      <InputContainer className="w-full rounded-2xl">
        <InputGroup className="w-full bg-accent border border-border rounded-2xl p-2">
          <InputField className="border border-muted rounded-t-2xl">
            <Label className="w-full h-6 text-center">Número do Exame</Label>
            <Input
              className="w-full h-8 text-center"
              name="exame"
              type="number"
            />
          </InputField>
          <InputField className="border border-t-0 border-muted rounded-b-2xl">
            <Label className="w-full h-6 text-center">Senha</Label>
            <Input
              className="w-full h-8 text-center"
              name="senha"
              type="text"
            />
          </InputField>
        </InputGroup>
      </InputContainer>
      <Button
        className="rounded-lg border border-border bg-accent text-foreground hover:bg-muted cursor-pointer"
        asChild
      >
        <button>Procurar</button>
      </Button>
    </form>
  );
};

export default BuscarExame;

import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatPrice, products } from "@/data/restaurant";

type OrderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialProductId?: string;
};

export function OrderDialog({ open, onOpenChange, initialProductId }: OrderDialogProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    initialProductId ? { [initialProductId]: 1 } : { classic: 1 },
  );
  const [finished, setFinished] = useState(false);
  const subtotal = useMemo(
    () => products.reduce((total, product) => total + product.price * (quantities[product.id] ?? 0), 0),
    [quantities],
  );

  const changeQuantity = (id: string, delta: number) => {
    setFinished(false);
    setQuantities((current) => ({ ...current, [id]: Math.max(0, (current[id] ?? 0) + delta) }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-foreground bg-background p-0 shadow-2xl sm:rounded-sm">
        <DialogHeader className="border-b border-border px-6 py-5 text-left">
          <p className="eyebrow">Pedido online</p>
          <DialogTitle className="font-display text-4xl uppercase">Monte seu pedido</DialogTitle>
          <DialogDescription>Escolha seus burgers favoritos. Nenhuma cobrança será realizada.</DialogDescription>
        </DialogHeader>
        <div className="divide-y divide-border px-6">
          {products.map((product) => (
            <div key={product.id} className="grid grid-cols-[72px_1fr_auto] items-center gap-4 py-4">
              <img src={product.image} alt={product.name} className="h-16 w-[72px] rounded-sm object-cover" width={1200} height={912} />
              <div className="min-w-0">
                <h3 className="font-display text-xl uppercase">{product.name}</h3>
                <p className="text-sm font-bold text-primary">{formatPrice(product.price)}</p>
              </div>
              <div className="flex h-9 items-center border border-border">
                <button className="grid size-9 place-items-center transition-colors hover:bg-muted" onClick={() => changeQuantity(product.id, -1)} aria-label={`Remover um ${product.name}`}><Minus className="size-3.5" /></button>
                <span className="w-8 text-center text-sm font-bold">{quantities[product.id] ?? 0}</span>
                <button className="grid size-9 place-items-center transition-colors hover:bg-primary" onClick={() => changeQuantity(product.id, 1)} aria-label={`Adicionar um ${product.name}`}><Plus className="size-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-foreground px-6 py-5 text-background">
          <div className="mb-4 flex items-end justify-between">
            <span className="text-xs font-bold uppercase">Subtotal</span>
            <strong className="font-display text-3xl text-primary">{formatPrice(subtotal)}</strong>
          </div>
          {finished ? (
            <div className="border border-primary bg-primary/10 p-4 text-sm"><strong className="block text-primary">Pedido demonstrativo recebido.</strong> Esta experiência não envia pedidos nem realiza cobranças.</div>
          ) : (
            <Button variant="brand" size="lg" className="w-full" disabled={subtotal === 0} onClick={() => setFinished(true)}><ShoppingBag /> Continuar pedido</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
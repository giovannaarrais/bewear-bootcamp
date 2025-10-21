"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";
import { da } from "zod/v4/locales";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shippingAddressTable } from "@/db/schema";
import { useCreateShippingAddress } from "@/hooks/mutations/use-create-shipping-address";
import { useRemoveAddress } from "@/hooks/mutations/use-remove-address";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/use-update-cart-shipping-address";
import {
  getUserAddressesQueryKey,
  useGetUserAddresses,
} from "@/hooks/queries/use-user-addresses";

import { formatAddress } from "../../helpers/address";

const formSchema = z.object({
  email: z.email("E-mail inválido"),
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  cpf: z.string().min(14, "CPF Inválido"),
  phone: z.string().min(1, "Celular obrigatório"),
  zipCode: z.string().min(8).regex(/^\d{5}-?\d{3}$/, "CEP Inválido"),
  address: z.string().min(1, "Endereço é obrigatório"),
  number: z.string().min(1, "Número obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatório"),
  state: z.string().min(1, "Estado é obrigatório"),
});

type FormValues = z.infer<typeof formSchema>;

// sig que vai ser o resultado do select
interface AddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
  defaultShippingAddressId: string | null; // logica para evitar carregamento demorado
}

const Addresses = ({
  shippingAddresses,
  defaultShippingAddressId,
}: AddressesProps) => {
  const router = useRouter();

  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    defaultShippingAddressId || null,
  );

  const removeAddressMutation = useRemoveAddress();
  const createShippingAddressMutation = useCreateShippingAddress();
  const updateCartShippingAddressMutation = useUpdateCartShippingAddress();

  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const { data: addresses, isLoading } = useGetUserAddresses({
    initialData: shippingAddresses,
  });

  const queryClient = useQueryClient();

  // remover endereço
  const handleDeleteAddressClick = () => {
    if (!addressToDelete) return;

    removeAddressMutation.mutate(addressToDelete, {
      onSuccess: () => {
        toast.success("Endereço removido com sucesso");
        setConfirmDialogOpen(false);
        setAddressToDelete(null);
        queryClient.invalidateQueries({ queryKey: getUserAddressesQueryKey() });
      },
      onError: (error) => {
        toast.error("Erro ao remover endereço");
        console.log("erro ao excluir endereço", error);
      },
    });
  };

  // use form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      cpf: "",
      phone: "",
      zipCode: "",
      address: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });



  const handleGoToPayment = async () => {
    if (!selectedAddress || selectedAddress == "add_new") return;

    try {
      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: selectedAddress,
      });
      toast.success("Endereço selecionado para entrega!", {
        position: "top-center",
      });

      router.push("/cart/confirmation");
    } catch (error) {
      toast.error("Erro ao selecionar endereço. Tente Novamente");
      console.log(error);
    }
  };

  
  // API CEP
  const [cep, setCep] = useState("")
  const [isReadOnly, setIsReadyOnly] = useState(false)
  
  const buscarCep = async (cep: string) => {
    try{
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()
  
      if (data.erro) {
        console.log('cep nao encontrado')
        setIsReadyOnly(false)
      }

      form.setValue("address", data.logradouro)
      form.setValue("city", data.localidade)
      form.setValue("neighborhood", data.bairro)
      form.setValue("state", data.estado)

      setIsReadyOnly(true)
    } catch {
      console.log('erro ao buscar cep')
    }
  }

  // submit do formulário
  async function onSubmit(values: FormValues) {
    try {
      const newAddress =
        await createShippingAddressMutation.mutateAsync(values);
      toast.success("Endereço criado com sucesso");

      form.reset();
      setCep('')
      setSelectedAddress(newAddress.id);

      await updateCartShippingAddressMutation.mutateAsync({
        shippingAddressId: newAddress.id,
      });
      
      toast.success("Endereço vinculado ao carrinho com sucesso", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Erro ao salvar endereço, Tente novamente!");
      console.log(error);
    }
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col space-y-2">
        {isLoading ? (
          <div className="py-4 text-center">
            <p>Carregando endereços</p>
          </div>
        ) : (
          <RadioGroup
            value={selectedAddress}
            onValueChange={setSelectedAddress}
          >
            {addresses?.length === 0 && (
              <div className="py-4 text-center">
                <p className="text-muted-foreground">
                  Você ainda não possui endereços cadastrados.
                </p>
              </div>
            )}

            {addresses?.map((address) => (
              <Card key={address.id} className="relative">
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={address.id} id={address.id} />
                    <div className="flex-1">
                      <Label htmlFor={address.id} className="cursor-pointer">
                        <div>{formatAddress(address)}</div>
                      </Label>
                    </div>
                  </div>
                </CardContent>

                <Button
                  onClick={() => {
                    setAddressToDelete(address.id);
                    setConfirmDialogOpen(true);
                  }}
                  className="absolute -top-2 -right-4 rounded-full"
                  size="sm"
                >
                  <Trash2 />
                </Button>
              </Card>
            ))}

            <Dialog
              open={confirmDialogOpen}
              onOpenChange={setConfirmDialogOpen}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Tem certeza que deseja excluir esse endereço
                  </DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    className="mt-3 w-full rounded-full"
                    size="lg"
                    onClick={handleDeleteAddressClick}
                  >
                    Excluir
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Card>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="add_new" id="add_new" />
                  <Label htmlFor="add_new">Adiconar novo endereço </Label>
                </div>
              </CardContent>
            </Card>
          </RadioGroup>
        )}

        {selectedAddress && selectedAddress !== "add_new" && (
          <div className="mt-4">
            <Button
              onClick={handleGoToPayment}
              className="w-full"
              disabled={updateCartShippingAddressMutation.isPending}
            >
              {updateCartShippingAddressMutation.isPending
                ? "Processando.."
                : "Confirmar Dados"}
            </Button>
          </div>
        )}

        {selectedAddress == "add_new" && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 border-t-2 border-t-gray-100 pt-6"
            >
              <h4 className="text-1xl mb-3 font-semibold">Adicionar Novo</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nome Completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PatternFormat
                            format="###.###.###-##"
                            placeholder="CPF"
                            customInput={Input}
                            {...field}
                          ></PatternFormat>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PatternFormat
                            format="(##) #####-####"
                            placeholder="Celular"
                            customInput={Input}
                            {...field}
                          ></PatternFormat>

                          {/* <Input placeholder="Celular" {...field} /> */}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PatternFormat
                          format="#####-###"
                          placeholder="CEP"
                          customInput={Input}
                          {...field}
                          value={cep}
                          onChange={(e) => {
                            const onlyNumbers = e.target.value.replaceAll(/\D/g, "")
                            setCep(onlyNumbers)
                            form.setValue("zipCode", onlyNumbers)
                          }}
                          onBlur={() => buscarCep(cep)}
                        ></PatternFormat>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Endereço" {...field} readOnly={isReadOnly}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3">
                  <div className="max-w-[110px]">
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Número" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Cidade" {...field} readOnly={isReadOnly}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Bairro" {...field} readOnly={isReadOnly}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Estado" {...field} readOnly={isReadOnly}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="complement"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Complemento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="mt-7 w-full rounded-full py-6 text-center"
                disabled={
                  createShippingAddressMutation.isPending ||
                  updateCartShippingAddressMutation.isPending
                }
              >
                {createShippingAddressMutation.isPending ||
                updateCartShippingAddressMutation.isPending
                  ? "Salvando..."
                  : "Salvar endereço"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;

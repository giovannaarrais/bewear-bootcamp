'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
    email: z.email("Email inválido."),
    password: z.string("Senha inválida.").min(8, "Senha inválida"),
});

type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    });

    const router = useRouter()


    // verificacoes se usuario para acesso 
    async function onSubmit(values: FormValues) {
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            fetchOptions: {
                // se logar com sucesso, leva para a home
                onSuccess: () => {
                    router.push("/")
                },
                onError: (error) => {
                    // se o usuario nao for encontrado
                    if(error.error.code == "USER_NOT_FOUND"){
                        toast.error("E-mail nao encontrado");

                        // error aparece no campo de email
                        return form.setError("email", {
                            message: "E-mail nao encontrado"
                        });
                    }
                    
                    // se o credencias forem inválidas
                    if(error.error.code == "INVALID_EMAIL_OR_PASSWORD"){
                        toast.error("E-mail ou senha inválidos");

                        form.setError("password", {
                            message: "Senha inválida"
                        });

                        return form.setError("email", {
                            message: "E-mail inválido"
                        });
                    }

                    toast.error(error.error.message)
                }
            }
        })

        console.log(values);
    }

    return (
        <>
        <Card>
            <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>Faça Login para continuar</CardDescription>
            </CardHeader>

            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CardContent className="grid gap-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder="Digite seu email" {...field} />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                        <Input
                            placeholder="Digite sua senha"
                            type="password"
                            {...field}
                        />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                    )}
                />
                </CardContent>

                <CardFooter>
                    <Button type="submit">Entrar</Button>
                </CardFooter>
            </form>
            </Form>
        </Card>
        </>
    );
};

export default SignInForm;

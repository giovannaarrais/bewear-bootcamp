import React from "react";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = async () => {
    return (
        <>
            <div className="flex lg:w-lg md:w-md m-auto flex-col gap-6 p-5">
                <Tabs defaultValue="sign-in">
                {" "}
                {/* qual vai ser a padrao */}
                <TabsList className="w-full">
                    <TabsTrigger value="sign-in">Entrar</TabsTrigger>
                    <TabsTrigger value="sign-up">Criar Conta</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sign-in">{/* conteudo sign-in */}
                    <SignInForm />
                </TabsContent>
                
                <TabsContent value="sign-up">{/* conteudo sign-up */}
                    <SignUpForm />
                </TabsContent>
                </Tabs>
            </div>

        </>
    );
};

export default Authentication;

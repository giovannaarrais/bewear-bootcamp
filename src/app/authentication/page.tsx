import React from "react";

import Header from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = async () => {
    return (
        <>
            <Header />
            
            <div className="flex w-full  flex-col gap-6 p-5">
                <Tabs defaultValue="sign-in">
                {" "}
                {/* qual vai ser a padrao */}
                <TabsList>
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

"use client"; // indica q o component vai ter interatividade

import { LogInIcon, LogOutIcon, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Header = () => {
  //pegar sessao do user q esta ativa
  const { data: session } = authClient.useSession();

  return (
    <header className="mb-5 flex items-center justify-between p-5 shadow">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo Bewear" width={100} height={6.14} />
      </Link>

      <div className="flex items-center">
        {/* ao clicar vai abri o offcanvas -> sheet(shadcn) */}
        <Sheet>
          {/* sheet trigger botao com acao */}
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>

          {/* offcanvas q vai ser aberto ao clicar no btn acima */}
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <Menu></Menu>
              </SheetTitle>
            </SheetHeader>

            {/* se possuir um sessao de user */}
            <div className="px-5">
              {session?.user ? (
                <>
                  <div className="flex justify-between space-y-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={
                            session?.user?.image &&
                            typeof session.user.image === "string"
                              ? session.user.image
                              : undefined
                          }
                        />

                        <AvatarFallback>
                          {/* Pega primeira letra do primeiro nome e segundo nome e add na img */}
                          {session?.user?.name?.split("")?.[0]?.[0]}
                          {session?.user?.name?.split("")?.[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">
                          <span className="text-muted-foreground block text-xs">
                            {session?.user?.email}
                          </span>
                        </h3>
                      </div>
                    </div>
                    <Button
                      // acao para sair da conta logada
                      size="icon"
                      variant="outline"
                      onClick={() => authClient.signOut()}
                    >
                      <LogOutIcon />
                    </Button>
                  </div>
                </>
              ) : (
                // se nao possuir
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Olá! Faça o seu login!</h2>
                    <Button size="icon" asChild variant="outline">
                      <Link href="/authentication">
                        <LogInIcon />
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

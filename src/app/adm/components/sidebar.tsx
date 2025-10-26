import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
    {
        title: 'Dashboard',
        icon: '',
        url: '#',
        acess: 1
    },
    {
        title: 'Produtos',
        icon: '',
        url: '/adm/pages/produtos',
        acess: 1
    },
    {
        title: 'Pedidos',
        icon: '',
        url: '#',
        acess: 1
    },
    {
        title: 'Usuários',
        icon: '',
        url: '#',
        acess: 1
    },
    {
        title: 'Estoque',
        icon: '',
        url: '#',
        acess: 1
    },
    {
        title: 'Financeiro',
        icon: '',
        url: '#',
        acess: 2
    },
    {
        title: 'Relatórios',
        icon: '',
        url: '#',
        acess: 2
    },
    {
        title: 'Admins',
        icon: '',
        url: '#',
        acess: 2
    }
]

const AppSidebar = () => {
    return (
        <Sidebar>
            
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroupLabel>
                    <Image src='/logo.svg' alt='Logo Bewear' width={100} height={30}/>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {menuItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.url}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>

            <SidebarFooter />
        </Sidebar>
    );
};

export default AppSidebar;

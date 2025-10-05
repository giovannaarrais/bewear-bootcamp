import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Parceiros = () => {
    const parceirosInfos = [
        {
            id: 1,
            nome: "Nike",
            logo: "/parceiros/nike.svg",
            website: 'https://www.nike.com.br/' 
        },
        {
            id: 2,
            nome: "Adidas",
            logo: "/parceiros/adidas.svg",
            website: 'https://www.adidas.com.br/',
        },
        {
            id: 3,
            nome: "Puma",
            logo: "/parceiros/puma.svg",
            website: 'https://br.puma.com/',
        },
        {
            id: 4,
            nome: "New Balance",
            logo: "/parceiros/nb.svg",
            website: 'https://www.newbalance.com.br/',
        },
        {
            id: 5,
            nome: "Converse",
            logo: "/parceiros/converse.svg",
            website: 'https://converse.com.br/',
        },
        {
            id: 6,
            nome: "Polo",
            logo: "/parceiros/ralph-lorem.svg",
            website: 'https://www.polowear.com.br/',
        },
        {
            id: 7,
            nome: "Zara",
            logo: "/parceiros/zara.svg",
            website: 'https://www.zara.com/br/',
        }
    ]
    return (
        <section>
            <h3 className='font-semibold px-5 mb-3'>Marcas Parceiras</h3>
            <div className="flex w-full gap-5 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
                {parceirosInfos.map((parceiro, index) => (
                    <Link
                        href={parceiro.website} 
                        target='_blanck'
                        key={parceiro.id}
                        className='w-full'>

                        <div className="border border-gray-200 rounded-xl min-w-[80px] w-full min-h-[80px] flex justify-center flex-col items-center">
                            <Image
                                src={parceiro.logo}
                                alt={parceiro.nome}
                                width={30}
                                height={30}
                                className=''
                            />
                        </div>

                        <h4 className='font-semibold text-center mt-2'>
                            {parceiro.nome}
                        </h4>
                    </Link>
                ))}
            </div> 
        </section>
    );
};

export default Parceiros;
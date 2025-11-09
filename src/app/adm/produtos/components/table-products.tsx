import { Eye, SquarePen, Trash } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { productTable, productVariantTable } from '@/db/schema';

interface ProductProps {
    products: (typeof productTable.$inferSelect & {
        variants: (typeof productVariantTable.$inferSelect)[]
    })[]
}

const TableProducts = ({ products }: ProductProps)  => {
    return (
        <>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead >N</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead  className="text-center">Estoque</TableHead>
                    <TableHead className="text-center">Variantes</TableHead>
                    <TableHead className='text-center'>Ações</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {products.map((product, index) => (
                    <TableRow key={`${product.name}-${product.id}`}>
                        <TableCell className="font-medium">{ index + 1}</TableCell>
                        <TableCell>
                            {product.name}
                        </TableCell>
                        <TableCell className='max-w-[150px] overflow-x-hidden text-ellipsis'>{product.description}</TableCell>
                        <TableCell className="text-center">0</TableCell>
                        <TableCell className="text-center">{product.variants.length}</TableCell>
                        <TableCell className="text-center space-x-2">
                            <Button variant='default' size="sm">
                                <SquarePen />
                            </Button>
                            <Button variant='secondary' size="sm">
                                <Trash />
                            </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default TableProducts;
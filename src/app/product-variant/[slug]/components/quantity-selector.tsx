'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';


// Biblioteca nuqs -> registra o dado na url localhost:8080/product?quantity=10
// vamos salvar a quantidade dentro da url
const QuantitySelector = () => {
    const [quantity, setQuantity] = useState(1)

    // funcao para diminuir quantidade, so funcionar se for mais que 1
    function subNumber(){
        setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
    }

    // funcao para aumentar quantidade
    function moreNumber(){
        setQuantity((prev) => prev + 1)
    }

    return (
        <div className='border-1 border-gray-100 w-max rounded-lg'>
            <Button onClick={subNumber} variant='outline'>
                -
            </Button>
                <span className='px-3'>{quantity}</span>
            <Button onClick={moreNumber} variant='outline'>
                +
            </Button>
        </div>
    );
};

export default QuantitySelector;
export const formatAddress = (address: {
    recipientName: string;
    street: string;
    number: string;
    complement: string | null;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
}) => {

    if (address.complement === null || address.complement == 'null'){
        address.complement = ''
    }

    return `${address.recipientName} • ${address.street}, ${address.number}
        ${address.complement}, ${address.neighborhood}
        , ${address.city} - ${address.state} • CEP: ${address.zipCode}`;
};
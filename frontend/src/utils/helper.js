export const formatCurrency = (amount, locale = 'es-MX', currency = 'MXN') => {
    return (
        Intl.NumberFormat(locale || navigator.language, {
            style: "currency",
            currency,
        }).format(amount) + " MXN"
    );
}
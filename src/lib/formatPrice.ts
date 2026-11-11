
// This web app uses Bengali numerals. We'll use Intl.NumberFormat to format all prices consistently.

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);
};

const USD_TO_PKR = Number(import.meta.env.VITE_USD_TO_PKR || 278);
const MARKET_FACTOR = Number(import.meta.env.VITE_PAK_MARKET_FACTOR || 0.9);
const ROUND_TO = Number(import.meta.env.VITE_PAK_ROUND_TO || 50);

export const toPakistanMarketPrice = (basePrice) => {
  const price = Number(basePrice || 0);
  if (Number.isNaN(price) || price <= 0) return 0;

  const adjusted = price * USD_TO_PKR * MARKET_FACTOR;
  return Math.round(adjusted / ROUND_TO) * ROUND_TO;
};

export const formatPricePKR = (basePrice) => {
  const finalPrice = toPakistanMarketPrice(basePrice);
  return `Rs ${new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(finalPrice)}`;
};

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const numberToUsd = (num: number) => USDollar.format(num);

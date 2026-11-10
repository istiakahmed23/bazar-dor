
/* ================================
   CATEGORY TYPES
================================ */

export interface ICategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

/* ================================
   PRODUCT PRICE CHANGE
================================ */

export interface IProductChange {
  dir: "up" | "down" | "same";
  pct: number;
}

/* ================================
   MARKET PRICE
================================ */

export interface IMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

/* ================================
   PRODUCT TYPES
================================ */

export interface IProduct {
  id: number;
  slug: string;
  nameBn: string;

  category: string;
  categoryNameBn: string;
  categoryIcon: string;

  unit: string;
  image: string;

  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;

  change: IProductChange;

  markets: IMarket[];
}

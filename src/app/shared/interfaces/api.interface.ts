export interface ExchangeApiData {
  meta: {
    last_updated_at: string;
  };
  data: CurrenciesData;
}

export interface CurrenciesData {
  [key: string]: Currency;
}

export interface Currency {
  code: string,
  value: number
}


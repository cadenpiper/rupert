const { request, gql } = require("graphql-request");
require("dotenv").config();

// SUBGRAPH ENDPOINT
const AAVE_SUBGRAPH_URL = `https://gateway.thegraph.com/api/${process.env.GRAPH_API_KEY}/subgraphs/id/JCNWRypm7FYwV8fx5HhzZPSFaMxgkPuw4TnR3Gpi81zk`;
const COMPOUND_SUBGRAPH_URL = `https://gateway.thegraph.com/api/${process.env.GRAPH_API_KEY}/subgraphs/id/AwoxEZbiWLvv6e3QdvdMZw4WDURdGbvPfHmZRc8Dpfz9`;

export interface MarketData {
  id: string;
  symbol: string;
  lendingRate: number;
  utilization: number;
}

const messariMarketQuery = gql`
  query Markets($symbol: String!) {
    markets(where: { inputToken_: { symbol: $symbol } }) {
      id
      inputToken {
        symbol
      }
      totalDepositBalanceUSD
      totalBorrowBalanceUSD
      rates(where: { side: LENDER }) {
        rate
      }
    }
  }
`;

export async function fetchAaveMarketData(symbol: string): Promise<MarketData | null> {
  try {
    const response = await request(AAVE_SUBGRAPH_URL, messariMarketQuery, { symbol });
    const market = response.markets?.[0];

    if (!market) return null;

    const lendingRate = parseFloat(market.rates?.[0]?.rate || "0");
    const utilization =
      parseFloat(market.totalBorrowBalanceUSD) / parseFloat(market.totalDepositBalanceUSD);

    return {
      id: market.id,
      symbol: market.inputToken.symbol,
      lendingRate,
      utilization,
    };
  } catch (error) {
    console.error("Error querying AAVE subgraph:", error);
    return null;
  }
}

export async function fetchCompoundMarketData(symbol: string): Promise<MarketData | null> {
  try {
    const response = await request(COMPOUND_SUBGRAPH_URL, messariMarketQuery, { symbol });
    const market = response.markets?.[0];

    if (!market) return null;

    const lendingRate = parseFloat(market.rates?.[0]?.rate || "0");
    const utilization =
      parseFloat(market.totalBorrowBalanceUSD) / parseFloat(market.totalDepositBalanceUSD);

    return {
      id: market.id,
      symbol: market.inputToken.symbol,
      lendingRate,
      utilization,
    };
  } catch (error) {
    console.error("Error querying Compound subgraph:", error);
    return null;
  }
}

const { request, gql } = require("graphql-request");
require("dotenv").config();

// SUBGRAPH ENDPOINT
const AAVE_SUBGRAPH_URL = `https://gateway.thegraph.com/api/${process.env.GRAPH_API_KEY}/subgraphs/id/GQFbb95cE6d8mV989mL5figjaGaKCQB3xqYrr1bRyXqF`;

const aaveQuery = gql`
  query Reserves($symbol: String!) {
    reserves(
      first: 10,
      where: { symbol: $symbol },
      orderBy: liquidityRate,
      orderDirection: desc
    ) {
      id
      name
      symbol
      decimals
      liquidityRate
      totalATokenSupply
      totalLiquidity
      totalCurrentVariableDebt
      availableLiquidity
    }
  }
`;

async function fetchAaveMarketData(symbol: string) {
  try {
    const response = await request(AAVE_SUBGRAPH_URL, aaveQuery, { symbol });
    return response.reserves;
  } catch (error) {
    console.error(`Error querying AAVE subgraph:`, error);
    return null;
  }
}

module.exports = { fetchAaveMarketData };

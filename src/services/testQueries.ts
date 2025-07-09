const { fetchAaveMarketData } = require("./graphQueries");

async function testAaveQuery() {
  try {
    const data = await fetchAaveMarketData("USDC");
    console.log("AAVE USDC Data:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error querying AAVE subgraph:", error);
  }
}

testAaveQuery();

import { fetchAaveMarketData, fetchCompoundMarketData } from "./graphQueries";

async function testMarketQueries() {
  try {
    const aaveData = await fetchAaveMarketData("USDC");
    console.log("🔹 AAVE USDC Data:", JSON.stringify(aaveData, null, 2));

    const compoundData = await fetchCompoundMarketData("USDC");
    console.log("🔸 Compound USDC Data:", JSON.stringify(compoundData, null, 2));
  } catch (error) {
    console.error("Error querying subgraphs:", error);
  }
}

testMarketQueries();

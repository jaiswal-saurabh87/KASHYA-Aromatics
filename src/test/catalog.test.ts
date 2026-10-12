import { describe, expect, it } from "vitest";
import { products } from "@/lib/catalog";

describe("configured KASHYA product facts", () => {
  it("prices Dhoopsticks Jar 130 g at MRP ₹349", () => {
    expect(products.find((product) => product.id === "dhoopsticks-jar-130g")).toMatchObject({
      name: "Dhoopsticks Jar",
      weight: "130 g",
      price: 349,
    });
  });

  it("prices Dhoopsticks Pouch 150 g at MRP ₹150", () => {
    expect(products.find((product) => product.id === "dhoopsticks-pouch-150g")).toMatchObject({
      name: "Dhoopsticks Pouch",
      weight: "150 g",
      price: 150,
    });
  });

  it("prices Samrani Cup 200 g at MRP ₹299", () => {
    expect(products.find((product) => product.id === "samrani-cup-200g")).toMatchObject({
      name: "Samrani Cup",
      weight: "200 g",
      price: 299,
    });
  });
});
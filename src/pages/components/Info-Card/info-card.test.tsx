import { ArrowDown, ArrowUp, Info } from "lucide-react";
import { describe, it, expect } from "vitest";

type InfoCardType = "total" | "above-average" | "below-average";

const cardConfig: Record<
  InfoCardType,
  {
    title: string;
    icon: React.ReactNode;
    description: string;
  }
> = {
  total: {
    title: "Total",
    icon: <Info className="h-6 w-6" />,
    description: "Número total de jogadores.",
  },
  "above-average": {
    title: "Acima da média",
    icon: <ArrowUp className="h-6 w-6 text-green-500" />,
    description: "Número de jogadores acima da média.",
  },
  "below-average": {
    title: "Abaixo da média",
    icon: <ArrowDown className="h-6 w-6 text-red-500" />,
    description: "Número de jogadores abaixo da média.",
  },
};

describe("cardConfig", () => {
  it("should have all required keys", () => {
    expect(cardConfig).toHaveProperty("total");
    expect(cardConfig).toHaveProperty("above-average");
    expect(cardConfig).toHaveProperty("below-average");
    expect(Object.keys(cardConfig)).toHaveLength(3);
  });

  it("should have correct values for 'total'", () => {
    expect(cardConfig.total.title).toBe("Total");
    expect(cardConfig.total.description).toBe("Número total de jogadores.");
    expect(cardConfig.total.icon).toBeDefined();
  });

  it("should have correct values for 'above-average'", () => {
    expect(cardConfig["above-average"].title).toBe("Acima da média");
    expect(cardConfig["above-average"].description).toBe(
      "Número de jogadores acima da média.",
    );
    expect(cardConfig["above-average"].icon).toBeDefined();
  });

  it("should have correct values for 'below-average'", () => {
    expect(cardConfig["below-average"].title).toBe("Abaixo da média");
    expect(cardConfig["below-average"].description).toBe(
      "Número de jogadores abaixo da média.",
    );
    expect(cardConfig["below-average"].icon).toBeDefined();
  });
});

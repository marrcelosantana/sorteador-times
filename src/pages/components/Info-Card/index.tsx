import { ArrowDown, ArrowUp, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type InfoCardType = "total" | "above-average" | "below-average";

interface InfoCardProps {
  type: InfoCardType;
  data: number;
}

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
    title: "Na média ou acima",
    icon: <ArrowUp className="h-6 w-6 text-green-400" />,
    description: "Número de jogadores na média ou acima.",
  },
  "below-average": {
    title: "Abaixo da média",
    icon: <ArrowDown className="h-6 w-6 text-red-400" />,
    description: "Número de jogadores abaixo da média.",
  },
};

const InfoCard: React.FC<InfoCardProps> = ({ type, data }) => {
  const { title, icon, description } = cardConfig[type];

  return (
    <Card className="border-accent-foreground h-[140px] w-[300px]">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">{data}</span>
        <p className="text-muted-foreground text-x2 mt-2 text-xs">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default InfoCard;

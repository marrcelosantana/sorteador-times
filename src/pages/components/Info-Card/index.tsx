import { ArrowDown, ArrowUp, Users } from "lucide-react";
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
    iconBg: string;
    description: string;
  }
> = {
  total: {
    title: "Total",
    icon: <Users className="h-5 w-5 text-primary" />,
    iconBg: "bg-primary/10 dark:bg-primary/20",
    description: "Número total de jogadores.",
  },
  "above-average": {
    title: "Na média ou acima",
    icon: <ArrowUp className="h-5 w-5 text-emerald" />,
    iconBg: "bg-emerald/10 dark:bg-emerald/20",
    description: "Número de jogadores na média ou acima.",
  },
  "below-average": {
    title: "Abaixo da média",
    icon: <ArrowDown className="h-5 w-5 text-coral" />,
    iconBg: "bg-coral/10 dark:bg-coral/20",
    description: "Número de jogadores abaixo da média.",
  },
};

const InfoCard: React.FC<InfoCardProps> = ({ type, data }) => {
  const { title, icon, iconBg, description } = cardConfig[type];

  return (
    <Card className="w-full border-border/50 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBg}`}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-3xl font-extrabold tracking-tight">{data}</span>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default InfoCard;

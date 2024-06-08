import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface IInfoCard {
  title: string;
  description: any;
}

export function InfoCard({ title, description }: IInfoCard) {
  return (
    <Card className="flex w-full items-center justify-center">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

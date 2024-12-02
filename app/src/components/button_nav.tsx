import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ButtonNavProps {
    handlePageChange: () => void;
    titre: string;
    description: string;
}

export function ButtonNav({ handlePageChange, titre, description }: ButtonNavProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="mb-4">{titre}</CardTitle>
        <Separator/>
        <CardDescription className="mt-8">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button onClick={handlePageChange}>Accéder</Button>
      </CardFooter>
    </Card>
  )
}


import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ServicesTab() {
  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Услуги</CardTitle>
          <Button size="sm">Добавить услугу</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">🧬 Анализы</h3>
            <ul className="space-y-1">
              <li className="flex justify-between">
                <span>Общий анализ крови + СОЭ</span>
                <span className="font-medium">50 000 сум</span>
              </li>
              <li className="flex justify-between">
                <span>Концентрация гемоглобина (HGB)</span>
                <span className="font-medium">28 000 сум</span>
              </li>
              <li className="flex justify-between">
                <span>Глюкоза натощак</span>
                <span className="font-medium">34 000 сум</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">🦴 УЗИ</h3>
            <ul className="space-y-1">
              <li className="flex justify-between">
                <span>УЗИ щитовидной железы</span>
                <span className="font-medium">90 000 сум</span>
              </li>
              <li className="flex justify-between">
                <span>УЗИ для беременных</span>
                <span className="font-medium">106 000–202 000 сум</span>
              </li>
              <li className="flex justify-between">
                <span>УЗИ сердца</span>
                <span className="font-medium">168 000 сум</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

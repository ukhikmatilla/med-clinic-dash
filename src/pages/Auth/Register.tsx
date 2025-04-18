
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [role, setRole] = useState("clinic-admin");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Пароли не совпадают",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      // This would be your actual registration logic
      // For demo purposes, we'll just redirect to login
      setTimeout(() => {
        toast({
          title: "Регистрация успешна",
          description: "Теперь вы можете войти в систему",
        });
        navigate("/login");
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка регистрации",
        description: "Что-то пошло не так. Пожалуйста, попробуйте снова.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-medical-gray p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Регистрация</CardTitle>
          <CardDescription className="text-center">
            Создайте аккаунт для доступа к медицинской CRM
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Выберите роль</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super-admin">Супер Админ</SelectItem>
                  <SelectItem value="clinic-admin">Админ клиники</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {role === "clinic-admin" && (
              <div className="space-y-2">
                <Label htmlFor="clinicName">Название клиники</Label>
                <Input
                  id="clinicName"
                  placeholder="Введите название клиники"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Эл. почта</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full mb-2" disabled={isLoading}>
              {isLoading ? "Загрузка..." : "Зарегистрироваться"}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Уже есть аккаунт?{" "}
              <a href="/login" className="text-primary hover:underline">
                Войти
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Register;


import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("clinic-admin");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user, userRole, loading: authLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !authLoading) {
      // Redirect based on user's actual role from metadata
      if (userRole === 'super-admin') {
        navigate('/super-admin', { replace: true });
      } else {
        navigate('/clinic-admin', { replace: true });
      }
    }
  }, [user, authLoading, navigate, userRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { success, error } = await signIn(email, password);
      
      if (success) {
        // Successful login, navigation will be handled by the auth state listener
      } else {
        toast({
          variant: "destructive",
          title: "Ошибка входа",
          description: error?.message || "Проверьте ваши данные и попробуйте снова",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка входа",
        description: "Что-то пошло не так. Пожалуйста, попробуйте снова.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state if auth state is being checked
  if (authLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-medical-gray">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-medical-gray p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Вход в систему</CardTitle>
          <CardDescription className="text-center">
            Введите ваши данные для входа в медицинскую CRM
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Пароль</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Забыли пароль?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full mb-2" disabled={isLoading}>
              {isLoading ? 
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Загрузка...</> : 
                "Войти"
              }
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Нет аккаунта?{" "}
              <a href="/register" className="text-primary hover:underline">
                Регистрация
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login;

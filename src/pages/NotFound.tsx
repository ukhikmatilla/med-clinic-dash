import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-medical-gray">
      <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Упс! Страница не найдена</p>
        <p className="text-sm text-muted-foreground mb-6">
          Запрашиваемая страница не существует или была перемещена
        </p>
        <a href="/" className="text-primary hover:text-primary/80 underline">
          Вернуться на главную
        </a>
      </div>
    </div>
  );
};

export default NotFound;

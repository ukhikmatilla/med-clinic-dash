import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-medical-light-blue">
      <div className="text-center">
        <h1 className="text-2xl font-medium mb-2">Перенаправление...</h1>
        <p className="text-muted-foreground">Загрузка медицинской CRM системы</p>
      </div>
    </div>
  );
};

export default Index;

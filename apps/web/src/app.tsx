import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import { AuthLayout } from "./layouts/auth-layout";
import { DashboardLayout } from "./layouts/dashboard-layout";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { BotListPage } from "./pages/bot-list";
import { BotDetailPage } from "./pages/bot-detail";

export function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1677ff",
        },
      }}
    >
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/bots" element={<BotListPage />} />
          <Route path="/bots/:botId" element={<BotDetailPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/bots" replace />} />
      </Routes>
    </ConfigProvider>
  );
}

import { Outlet, Navigate } from "react-router-dom";
import { Layout, Spin } from "antd";
import { authClient } from "../lib/auth-client";

export function AuthLayout() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <Layout style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Spin size="large" />
      </Layout>
    );
  }

  if (session?.user) {
    return <Navigate to="/bots" replace />;
  }

  return (
    <Layout style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 400, padding: 24 }}>
        <Outlet />
      </div>
    </Layout>
  );
}

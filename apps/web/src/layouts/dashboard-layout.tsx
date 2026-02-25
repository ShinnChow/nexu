import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { Layout, Menu, Button, Spin, Typography } from "antd";
import { RobotOutlined, LogoutOutlined } from "@ant-design/icons";
import { authClient } from "../lib/auth-client";

const { Header, Content } = Layout;

export function DashboardLayout() {
  const { data: session, isPending } = authClient.useSession();
  const location = useLocation();

  if (isPending) {
    return (
      <Layout style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Spin size="large" />
      </Layout>
    );
  }

  if (!session?.user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Typography.Title level={4} style={{ color: "white", margin: 0 }}>
            Nexu
          </Typography.Title>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname.startsWith("/bots") ? "/bots" : ""]}
            items={[
              {
                key: "/bots",
                icon: <RobotOutlined />,
                label: <Link to="/bots">Bots</Link>,
              },
            ]}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Typography.Text style={{ color: "rgba(255,255,255,0.65)" }}>
            {session.user.email}
          </Typography.Text>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ color: "rgba(255,255,255,0.65)" }}
          />
        </div>
      </Header>
      <Content style={{ padding: "24px 48px" }}>
        <Outlet />
      </Content>
    </Layout>
  );
}

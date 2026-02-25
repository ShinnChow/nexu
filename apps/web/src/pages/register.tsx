import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Typography, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { authClient } from "../lib/auth-client";

export function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { name: string; email: string; password: string }) => {
    setLoading(true);
    try {
      const result = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      if (result.error) {
        message.error(result.error.message ?? "Registration failed");
      } else {
        message.success("Account created successfully");
        navigate("/bots");
      }
    } catch {
      message.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Create Account" bordered={false}>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Name" size="large" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 8, message: "Password must be at least 8 characters" },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
      <Typography.Text>
        Already have an account? <Link to="/login">Login</Link>
      </Typography.Text>
    </Card>
  );
}

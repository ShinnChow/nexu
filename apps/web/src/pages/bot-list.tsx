import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, Button, Modal, Form, Input, Typography, Tag, Space, message } from "antd";
import { PlusOutlined, RobotOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { api } from "../lib/api-client";
import type { Bot } from "../lib/api-client";

export function BotListPage() {
  const queryClient = useQueryClient();
  const [createOpen, setCreateOpen] = useState(false);
  const [form] = Form.useForm();

  const { data, isLoading } = useQuery({
    queryKey: ["bots"],
    queryFn: () => api.bots.list(),
  });

  const createMutation = useMutation({
    mutationFn: (values: { name: string; slug: string; systemPrompt?: string; modelId?: string }) =>
      api.bots.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bots"] });
      setCreateOpen(false);
      form.resetFields();
      message.success("Bot created");
    },
    onError: (err: Error) => {
      message.error(err.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (botId: string) => api.bots.delete(botId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bots"] });
      message.success("Bot deleted");
    },
  });

  const statusColor: Record<string, string> = {
    active: "green",
    paused: "orange",
    deleted: "red",
  };

  const columns: ColumnsType<Bot> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: Bot) => (
        <Link to={`/bots/${record.id}`}>
          <Space>
            <RobotOutlined />
            {name}
          </Space>
        </Link>
      ),
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      render: (slug: string) => <code>{slug}</code>,
    },
    {
      title: "Model",
      dataIndex: "modelId",
      key: "modelId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={statusColor[status] ?? "default"}>{status}</Tag>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (d: string) => new Date(d).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Bot) => (
        <Button
          danger
          size="small"
          onClick={() => deleteMutation.mutate(record.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Typography.Title level={3}>Bots</Typography.Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateOpen(true)}
        >
          Create Bot
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data?.bots ?? []}
        rowKey="id"
        loading={isLoading}
        pagination={false}
      />

      <Modal
        title="Create Bot"
        open={createOpen}
        onCancel={() => setCreateOpen(false)}
        onOk={() => form.submit()}
        confirmLoading={createMutation.isPending}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => createMutation.mutate(values)}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter bot name" }]}
          >
            <Input placeholder="My Bot" />
          </Form.Item>
          <Form.Item
            name="slug"
            label="Slug"
            rules={[
              { required: true, message: "Please enter a slug" },
              { pattern: /^[a-z0-9-]+$/, message: "Lowercase letters, numbers and hyphens only" },
            ]}
          >
            <Input placeholder="my-bot" />
          </Form.Item>
          <Form.Item name="modelId" label="Model" initialValue="gpt-4o">
            <Input placeholder="gpt-4o" />
          </Form.Item>
          <Form.Item name="systemPrompt" label="System Prompt">
            <Input.TextArea rows={3} placeholder="You are a helpful assistant..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

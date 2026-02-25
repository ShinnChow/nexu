const API_BASE = "/v1";

async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(
      (body as { message?: string }).message ?? `HTTP ${res.status}`,
    );
  }

  return res.json() as Promise<T>;
}

export interface Bot {
  id: string;
  name: string;
  slug: string;
  status: "active" | "paused" | "deleted";
  modelId: string;
  systemPrompt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Channel {
  id: string;
  botId: string;
  channelType: "slack";
  accountId: string;
  status: "pending" | "connected" | "disconnected" | "error";
  teamName: string | null;
  createdAt: string;
  updatedAt: string;
}

export const api = {
  bots: {
    list: () => apiRequest<{ bots: Bot[] }>("/bots"),
    get: (botId: string) => apiRequest<Bot>(`/bots/${botId}`),
    create: (data: { name: string; slug: string; systemPrompt?: string; modelId?: string }) =>
      apiRequest<Bot>("/bots", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (botId: string, data: { name?: string; systemPrompt?: string; modelId?: string }) =>
      apiRequest<Bot>(`/bots/${botId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    delete: (botId: string) =>
      apiRequest<{ success: boolean }>(`/bots/${botId}`, {
        method: "DELETE",
      }),
    pause: (botId: string) =>
      apiRequest<Bot>(`/bots/${botId}/pause`, {
        method: "POST",
      }),
    resume: (botId: string) =>
      apiRequest<Bot>(`/bots/${botId}/resume`, {
        method: "POST",
      }),
  },
  channels: {
    list: (botId: string) =>
      apiRequest<{ channels: Channel[] }>(`/bots/${botId}/channels`),
    connectSlack: (
      botId: string,
      data: { botToken: string; signingSecret: string; teamId: string; teamName?: string },
    ) =>
      apiRequest<Channel>(`/bots/${botId}/channels/slack/connect`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    disconnect: (botId: string, channelId: string) =>
      apiRequest<{ success: boolean }>(`/bots/${botId}/channels/${channelId}`, {
        method: "DELETE",
      }),
  },
  config: {
    getPoolConfig: (poolId: string) =>
      fetch(`/api/internal/pools/${poolId}/config`, {
        credentials: "include",
      }).then((r) => r.json()),
  },
};

import { API_BASE_URL } from "../api/apiClient";

export function resolveImageUrl(url) {
  if (!url) return "/placeholder-house.jpg";

  if (url.startsWith("http")) {
    return url;
  }

  return `${API_BASE_URL}${url}`;
}
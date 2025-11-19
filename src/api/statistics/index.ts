import request from "..";

export function getStatisticsById<T>(id: string) {
  return request.request<T>({
    url: "/api/statistics",
    method: "get",
    params: {
      id: id
    }
  });
}

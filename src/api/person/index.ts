import request from "..";
import type { PersonQuestionWriteCount } from "./type";

export function getPersonQuestionWriteCount() {
  return request.get<{
    data: PersonQuestionWriteCount[];
    count: number;
  }>({
    url: "/api/person"
  });
}

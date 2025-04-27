export type HttpMethods =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD"
  | "CONNECT"
  | "TRACE";

export type RequestContentType =
  | "text/plain"
  | "text/html"
  | "text/css"
  | "application/json"
  | "application/xml"
  | "application/javascript"
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "application/pdf"
  | "application/x-www-form-urlencoded"
  | "multipart/form-data";

declare global {
  type ErrorResponse = {
    error: string;
    message: string;
    statusCode: number;
  };
}

type RequestArguments<BodyType> = {
  url: string;
  method: HttpMethods;
  contentType?: RequestContentType;
  body?: BodyType;
  token?: string;
  toJson?: boolean;
  onSuccess?: () => void | undefined;
  onError?: () => void | undefined;
};

const fetchRequest = async <BodyType, ResponseJsonType>({
  url,
  method,
  contentType,
  body,
  token,
  onSuccess,
  onError,
}: RequestArguments<BodyType>) => {
  const response = await fetch(url, {
    method,
    credentials: "include",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": contentType ? contentType : "application/json",
      Cookie: "token=" + token || "",
    },
  });
  if (response.ok) {
    const data: ResponseJsonType = await response.json();
    if (onSuccess) onSuccess();
    return data;
  } else {
    const data: ErrorResponse = await response.json();
    if (onError) onError();
    throw data;
  }
};

export default fetchRequest;

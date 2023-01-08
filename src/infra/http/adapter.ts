import { HTTPRequest } from "./http-request";
import { HTTPResponse } from "./http-response";

export interface IAdapter {
  adapt<ReqT, ResT>(
    path: string,
    method: string,
    controllerMethod: (req: HTTPRequest<ReqT>) => Promise<HTTPResponse<ResT>>
  ): Promise<void>;
}

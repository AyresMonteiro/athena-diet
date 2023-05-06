import { Express, Request, Response } from "express";
import { IAdapter } from "../../infra/http/adapter";

import { HTTPRequest } from "../../infra/http/http-request";
import { HTTPResponse } from "../../infra/http/http-response";

export class ExpressAdapter implements IAdapter {
  constructor(private readonly app: Express) {}

  async adapt<ReqT, ResT>(
    path: string,
    method: string,
    controllerMethod: (req: HTTPRequest<ReqT>) => Promise<HTTPResponse<ResT>>
  ) {
    const closure = async (expressReq: Request, expressRes: Response) => {
      const results = await controllerMethod({
        method: method,
        payload: expressReq.body,
      });

      return expressRes.status(results.status).json(results.data);
    };

    switch (method) {
      case "DELETE":
        this.app.delete(path, closure);
        break;
      case "PATCH":
        this.app.patch(path, closure);
        break;
      case "POST":
        this.app.post(path, closure);
        break;
      case "PUT":
        this.app.put(path, closure);
        break;
      default:
        this.app.get(path, closure);
    }
  }
}

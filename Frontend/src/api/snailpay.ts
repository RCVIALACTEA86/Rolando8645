import instanceAxios from "./axios";
import type { ChargePayload, ChargeResponse } from "../types";

export const chargeRequest = (payload: ChargePayload) =>
  instanceAxios.post<ChargeResponse>("/snailpay/charge", payload);

import type { Request, Response } from "express";
import {
  SNAILPAY_TEST_CARD,
  SNAILPAY_TEST_EXPIRY,
  SNAILPAY_TEST_CVV,
  SNAILPAY_LATENCY_MS,
  SNAILPAY_CARD_BAD_NUMBER,
  SNAILPAY_CARD_BAD_DATE,
  SNAILPAY_CARD_BAD_CVV,
  SNAILPAY_CARD_INSUFFICIENT,
  SNAILPAY_CARD_HIGH_RISK,
  SNAILPAY_CARD_CALL_AUTHORIZE,
  SNAILPAY_CARD_SYSTEM_ERROR,
} from "../config.js";

interface ChargeBody {
  cardNumber: string;
  expiry: string;
  cvv: string;
  fullName: string;
  amount: number;
  userId: string;
  email: string;
}

export type ChargeStatus = "Aprobado" | "Rechazado" | "Error";

export interface ChargeResponseBody {
  id: string;
  status: ChargeStatus;
  status_detail: string;
  transaction_amount: number;
  date_created: string;
  authorization_code: string | null;
  reference: string;
  payer_id: string;
  payer_email: string;
  cardNumber: string;
  cvv: string;
  message: string;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomToken(length: number): string {
  return Math.random()
    .toString(36)
    .slice(2, 2 + length);
}

function generateOperationId(): string {
  return `sp_${Date.now().toString(36)}${randomToken(6)}`;
}

function generateReference(): string {
  return `ref_${Date.now().toString(36)}${randomToken(6)}`;
}

function generateAuthorizationCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function buildResponse(params: {
  body: ChargeBody;
  id: string;
  status: ChargeStatus;
  statusDetail: string;
  message: string;
  authorizationCode?: string;
}): ChargeResponseBody {
  const { body, id, status, statusDetail, message, authorizationCode } = params;
  return {
    id,
    status,
    status_detail: statusDetail,
    transaction_amount: body.amount,
    date_created: new Date().toISOString(),
    authorization_code: authorizationCode ?? null,
    reference: generateReference(),
    payer_id: body.userId,
    payer_email: body.email,
    cardNumber: body.cardNumber,
    cvv: body.cvv,
    message,
  };
}

//#region Errores de transacción (requerimiento 2.3.2)
interface RejectionScenario {
  statusDetail: string;
  message: string;
}

const REJECTION_SCENARIOS: Record<string, RejectionScenario> = {
  [SNAILPAY_CARD_BAD_NUMBER]: {
    statusDetail: "Número de tarjeta mal ingresado",
    message: "Cobro rechazado: el número de tarjeta no es válido.",
  },
  [SNAILPAY_CARD_BAD_DATE]: {
    statusDetail: "Fecha de vencimiento mal ingresada",
    message: "Cobro rechazado: la fecha de vencimiento no es válida.",
  },
  [SNAILPAY_CARD_BAD_CVV]: {
    statusDetail: "Código de seguridad mal ingresado",
    message: "Cobro rechazado: el código de seguridad (CVV) no es válido.",
  },
  [SNAILPAY_CARD_INSUFFICIENT]: {
    statusDetail: "Fondos insuficientes",
    message: "Cobro rechazado: fondos insuficientes.",
  },
  [SNAILPAY_CARD_HIGH_RISK]: {
    statusDetail: "Rechazado por seguridad",
    message: "Cobro rechazado: operación retenida por seguridad.",
  },
  [SNAILPAY_CARD_CALL_AUTHORIZE]: {
    statusDetail: "Requiere autorización del banco",
    message: "Cobro rechazado: comunícate con tu banco para autorizar el pago.",
  },
};
//#endregion

//#region Cobro (recarga) simulado con SnailPay
export const charge = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as ChargeBody;
  const id = generateOperationId();

  try {
    await delay(SNAILPAY_LATENCY_MS);

    // Error del sistema (requerimiento 2.3.3): nunca aprueba ni aplica recarga.
    if (body.cardNumber === SNAILPAY_CARD_SYSTEM_ERROR) {
      throw new Error(
        "SnailPay: error interno del sistema. Intenta de nuevo más tarde."
      );
    }

    const matchesTestCard =
      body.cardNumber === SNAILPAY_TEST_CARD &&
      body.expiry === SNAILPAY_TEST_EXPIRY &&
      body.cvv === SNAILPAY_TEST_CVV;

    if (!matchesTestCard || body.amount <= 0) {
      const scenario = REJECTION_SCENARIOS[body.cardNumber];
      res.status(200).json(
        buildResponse({
          body,
          id,
          status: "Rechazado",
          statusDetail: scenario?.statusDetail ?? "Rechazado por otro motivo",
          message:
            scenario?.message ??
            "Cobro rechazado: los datos de la tarjeta no son válidos.",
        })
      );
      return;
    }

    res.status(200).json(
      buildResponse({
        body,
        id,
        status: "Aprobado",
        statusDetail: "Acreditado",
        message: `Cobro aprobado por $${body.amount.toLocaleString("es-CO")}.`,
        authorizationCode: generateAuthorizationCode(),
      })
    );
  } catch (error) {
    res.status(500).json(
      buildResponse({
        body,
        id,
        status: "Error",
        statusDetail: "Error interno",
        message: (error as Error).message,
      })
    );
  }
};
//#endregion

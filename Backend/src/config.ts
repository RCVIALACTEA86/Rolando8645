import "dotenv/config";

export const PORT = process.env.PORT || 3000;
const initialBalance = Number(process.env.INITIAL_BALANCE);
export const INITIAL_BALANCE = Number.isFinite(initialBalance) ? initialBalance : 0;
export const KEY_SECRET = process.env.KEY_SECRET || "SecretCaracolRace";

//#region SnailPay (pasarela de pagos simulada)
export const SNAILPAY_TEST_CARD = process.env.SNAILPAY_TEST_CARD || "1234123412341234";
export const SNAILPAY_TEST_EXPIRY = process.env.SNAILPAY_TEST_EXPIRY || "12/26";
export const SNAILPAY_TEST_CVV = process.env.SNAILPAY_TEST_CVV || "543";
const snailpayLatency = Number(process.env.SNAILPAY_LATENCY_MS);
export const SNAILPAY_LATENCY_MS = Number.isFinite(snailpayLatency)
  ? snailpayLatency
  : 900;

// Tarjetas de prueba que disparan cada error de transacción (requerimiento 2.3.2)
export const SNAILPAY_CARD_BAD_NUMBER =
  process.env.SNAILPAY_CARD_BAD_NUMBER || "4000000000000001";
export const SNAILPAY_CARD_BAD_DATE =
  process.env.SNAILPAY_CARD_BAD_DATE || "4000000000000002";
export const SNAILPAY_CARD_BAD_CVV =
  process.env.SNAILPAY_CARD_BAD_CVV || "4000000000000003";
export const SNAILPAY_CARD_INSUFFICIENT =
  process.env.SNAILPAY_CARD_INSUFFICIENT || "4000000000000004";
export const SNAILPAY_CARD_HIGH_RISK =
  process.env.SNAILPAY_CARD_HIGH_RISK || "4000000000000005";
export const SNAILPAY_CARD_CALL_AUTHORIZE =
  process.env.SNAILPAY_CARD_CALL_AUTHORIZE || "4000000000000006";

// Tarjeta que simula un error del sistema (requerimiento 2.3.3)
export const SNAILPAY_CARD_SYSTEM_ERROR =
  process.env.SNAILPAY_CARD_SYSTEM_ERROR || "5000000000000001";
//#endregion

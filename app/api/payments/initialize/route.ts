import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// In-memory store (replace with Prisma in production)
// Shape: { [reference]: { userId, amount, method, status, isPremium } }
const transactionStore: Record<string, {
  userId: string;
  amount: number;
  method: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  phone: string;
  createdAt: string;
}> = {};

// Export so webhook can access it
export { transactionStore };

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, method, phone, amount = 700 } = body;

    if (!userId || !method || !phone) {
      return NextResponse.json(
        { error: "Paramètres manquants: userId, method, phone sont requis." },
        { status: 400 }
      );
    }

    const reference = `CKV-${Date.now().toString().slice(-6)}-${crypto.randomUUID().slice(0, 4).toUpperCase()}`;

    // Store the pending transaction
    transactionStore[reference] = {
      userId,
      amount,
      method,
      status: "PENDING",
      phone,
      createdAt: new Date().toISOString(),
    };

    // --- In a real scenario, call payment gateway API here ---
    // Example with FedaPay/KKiaPay/CinetPay:
    //
    // const GATEWAY_API_KEY = process.env.PAYMENT_GATEWAY_API_KEY;
    // const GATEWAY_URL = process.env.PAYMENT_GATEWAY_URL;
    //
    // const gatewayResponse = await fetch(GATEWAY_URL + "/collections", {
    //   method: "POST",
    //   headers: { Authorization: `Bearer ${GATEWAY_API_KEY}`, "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     amount,
    //     currency: "XOF",
    //     description: "Abonnement Talent Premium Netacuv",
    //     callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/webhook`,
    //     customer: { phone_number: { number: phone, prefix: method === "wave" ? "+221" : "+229" } },
    //     reference,
    //   }),
    // });
    // const gatewayData = await gatewayResponse.json();
    // transactionStore[reference].gatewayId = gatewayData.id;
    // --------------------------------------------------------

    return NextResponse.json({
      success: true,
      reference,
      message: "Paiement initialisé. En attente de validation USSD.",
    });
  } catch (error) {
    console.error("Payment initialization error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}

// GET: Polling endpoint – client calls this to check transaction status
export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Référence manquante." }, { status: 400 });
  }

  const tx = transactionStore[reference];
  if (!tx) {
    return NextResponse.json({ error: "Transaction introuvable." }, { status: 404 });
  }

  return NextResponse.json({ status: tx.status, reference });
}

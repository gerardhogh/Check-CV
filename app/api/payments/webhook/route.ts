import { NextRequest, NextResponse } from "next/server";
import { transactionStore } from "../initialize/route";

/**
 * POST /api/payments/webhook
 *
 * This endpoint receives payment gateway callbacks.
 * It validates the webhook signature and updates the transaction status.
 *
 * In production, uncomment and configure:
 *   - Webhook secret validation (HMAC)
 *   - Prisma DB update for User.isPremium = true
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // --- Validate webhook signature ---
    // const signature = request.headers.get("x-gateway-signature");
    // const expectedSig = createHmac("sha256", process.env.PAYMENT_WEBHOOK_SECRET!)
    //   .update(JSON.stringify(body))
    //   .digest("hex");
    // if (signature !== expectedSig) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    // }

    const { reference, status } = body;

    if (!reference || !status) {
      return NextResponse.json({ error: "Paramètres manquants." }, { status: 400 });
    }

    const tx = transactionStore[reference];
    if (!tx) {
      return NextResponse.json({ error: "Transaction introuvable." }, { status: 404 });
    }

    // Map gateway status to our status
    const normalizedStatus = status === "approved" ? "SUCCESS" :
      status === "declined" ? "FAILED" : "PENDING";

    transactionStore[reference].status = normalizedStatus;

    // --- Update database with Prisma ---
    // If payment succeeded, upgrade user to Premium:
    // if (normalizedStatus === "SUCCESS") {
    //   await prisma.user.update({
    //     where: { id: tx.userId },
    //     data: { isPremium: true, premiumActivatedAt: new Date() },
    //   });
    //   await prisma.transaction.create({
    //     data: {
    //       userId: tx.userId,
    //       reference,
    //       amount: tx.amount,
    //       paymentMethod: tx.method,
    //       status: "SUCCESS",
    //       service: "Abonnement Talent Premium",
    //     },
    //   });
    // }
    // -----------------------------------------

    return NextResponse.json({ success: true, reference, status: normalizedStatus });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}

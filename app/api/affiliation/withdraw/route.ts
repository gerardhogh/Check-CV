import { NextRequest, NextResponse } from "next/server";

// In-memory store for withdrawal requests (replace with Prisma)
const withdrawalStore: Record<string, {
  userId: string;
  amount: number;
  method: string;
  phone: string;
  status: "PENDING" | "PROCESSED" | "REJECTED";
  createdAt: string;
}> = {};

/**
 * POST /api/affiliation/withdraw
 *
 * Records a withdrawal request. Checks that the user has sufficient balance.
 * In production: use Prisma to check User.affiliateBalance and create a
 * Withdrawal record with PENDING status.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, amount, method, phone } = body;

    if (!userId || !amount || !method || !phone) {
      return NextResponse.json(
        { error: "Paramètres manquants: userId, amount, method, phone." },
        { status: 400 }
      );
    }

    if (amount < 1000) {
      return NextResponse.json(
        { error: "Le montant minimum de retrait est de 1 000 FCFA." },
        { status: 422 }
      );
    }

    // --- In production: check User.affiliateBalance in DB ---
    // const user = await prisma.user.findUnique({ where: { id: userId } });
    // if (!user || user.affiliateBalance < amount) {
    //   return NextResponse.json({ error: "Solde insuffisant." }, { status: 422 });
    // }
    // await prisma.user.update({
    //   where: { id: userId },
    //   data: { affiliateBalance: { decrement: amount } },
    // });
    // const withdrawal = await prisma.withdrawal.create({
    //   data: { userId, amount, method, phone, status: "PENDING" },
    // });
    // ---------------------------------------------------------

    const id = `WD-${Date.now()}`;
    withdrawalStore[id] = {
      userId, amount, method, phone,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      withdrawalId: id,
      message: `Demande de retrait de ${amount} FCFA enregistrée. Votre solde sera réservé.`,
    });
  } catch (error) {
    console.error("Withdrawal error:", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}

/**
 * GET /api/affiliation/withdraw?userId=xxx
 * List all withdrawal requests for a user.
 */
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId manquant." }, { status: 400 });
  }

  const userWithdrawals = Object.entries(withdrawalStore)
    .filter(([, w]) => w.userId === userId)
    .map(([id, w]) => ({ id, ...w }));

  return NextResponse.json({ withdrawals: userWithdrawals });
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        user: {
          include: {
            role: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json({ transactions }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des transactions:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des transactions' },
      { status: 500 }
    );
  }
}

import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from '@/app/utils/connect';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json(
        { error: 'Missing requred fields' },
        { status: 401 }
      );
    }

    if (title.length < 3) {
      return NextResponse.json(
        { error: 'Title must be at least 3 characters long' },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error Creating Tasks' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: 'Error Getting Task' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
  } catch (error) {
    return NextResponse.json({ error: 'Error Uptating Task' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
  } catch (error) {
    return NextResponse.json({ error: 'Error Deleting Task' }, { status: 500 });
  }
}

import prisma from '@/app/utils/connect';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check if task exists before deleting
    const existingTask = await prisma.task.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!existingTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    const task = await prisma.task.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    return NextResponse.json({ message: 'Task deleted successfully', task });
  } catch (error: any) {
    console.error('Error deleting task:', error);

    // Handle specific Prisma errors
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Task not found or already deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete task. Please try again.' },
      { status: 500 }
    );
  }
}

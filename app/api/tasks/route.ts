import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json(
        {
          error: 'Missing requred fields',
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log('ERROR CREATING TASKS:', error);
    return NextResponse.json(
      { error: 'Error Creating Tasks' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
  } catch (error) {
    console.log('ERROR GETTING TASK:', error);
    return NextResponse.json({ error: 'Error Getting Task' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
  } catch (error) {
    console.log('ERROR UPDATING TASK:', error);
    return NextResponse.json({ error: 'Error Uptating Task' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
  } catch (error) {
    console.log('ERROR DELETING TASK:', error);
    return NextResponse.json({ error: 'Error Deleting Task' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const FormSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long').max(128, 'Password must be less than 128 characters long').nonempty('Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const parsedData = FormSchema.parse(formData);

    console.log(parsedData);

    return NextResponse.json({ message: JSON.stringify(parsedData) }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

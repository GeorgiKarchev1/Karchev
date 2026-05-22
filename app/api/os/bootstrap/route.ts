import { NextResponse } from 'next/server'
import { businessProfileSchema, generateOSBootstrap } from '../../../../lib/os/generate'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const input = businessProfileSchema.parse(body)
    const result = await generateOSBootstrap(input)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Invalid request',
      },
      { status: 400 }
    )
  }
}

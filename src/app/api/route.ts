import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    
    req.json().then(res => {
        console.log(res)
    })
    
    
    return NextResponse.json({ message: 'Hello World' })
}
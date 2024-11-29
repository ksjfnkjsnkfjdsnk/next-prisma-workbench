import { NextResponse } from 'next/server'
import connection from "@/src/services/mysql";

export async function GET() {
  try {
    const response = await connection.query('SELECT * FROM usuarios');

    return NextResponse.json({ result: response[0], status: 200 });

  } catch (error) {
    
    return NextResponse.json({ error: error.message }, { status: 500 });
    
  }
}

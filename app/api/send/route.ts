import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const { recipient, subject, emailBody, reportBody } = await req.json();
    if (!recipient || !subject || !emailBody || !reportBody) {
      return NextResponse.json({ error: 'recipient, subject, emailBody, and reportBody are required.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.AI_WOC_FROM_EMAIL;
    if (!apiKey || !from) return NextResponse.json({ error: 'Server email configuration missing.' }, { status: 500 });

    const resend = new Resend(apiKey);
    const fullBody = `${emailBody}\n\n--------------------\nENGINEERING WORK ORDER CORRECTION REPORT\n--------------------\n\n${reportBody}`;

    const sent = await resend.emails.send({ from, to: recipient, subject, text: fullBody });
    return NextResponse.json({ success: true, id: sent.data?.id ?? null });
  } catch {
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}

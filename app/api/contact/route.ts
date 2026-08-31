import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 })
    }

    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL || "faizal@adamgroup.ae"

    // If SMTP credentials are configured in .env.local, send real email
    if (host && user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // true for 465, false for 587 or other ports
        auth: {
          user,
          pass,
        },
      })

      const mailOptions = {
        from: `"${name || "Portfolio Visitor"}" <${user}>`,
        replyTo: email,
        to: toEmail,
        subject: `[CEO Portfolio Inquiry] New message from ${name ? name : email}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; color: #111827;">
            <div style="background: #141517; padding: 24px; text-align: left;">
              <span style="font-family: monospace; font-size: 11px; letter-spacing: 2px; color: #9ca3af; text-transform: uppercase;">EXECUTIVE INQUIRY</span>
              <h2 style="color: #ffffff; margin: 6px 0 0 0; font-size: 20px; font-weight: 300;">New Portfolio Message</h2>
            </div>
            
            <div style="padding: 24px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; font-size: 13px; color: #6b7280; width: 100px;"><strong>From:</strong></td>
                  <td style="padding: 8px 0; font-size: 14px; color: #111827;">${name || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 13px; color: #6b7280;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0; font-size: 14px; color: #111827;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 13px; color: #6b7280;"><strong>Time:</strong></td>
                  <td style="padding: 8px 0; font-size: 13px; color: #374151;">${new Date().toUTCString()}</td>
                </tr>
              </table>

              <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 18px; margin-top: 10px;">
                <div style="font-size: 11px; font-family: monospace; text-transform: uppercase; color: #6b7280; margin-bottom: 8px;">Message / Inquiry:</div>
                <div style="font-size: 14px; line-height: 1.6; color: #1f2937; white-space: pre-wrap;">${message ? message : "(No additional message provided — email connect request)"}</div>
              </div>

              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f3f4f6; text-align: center;">
                <a href="mailto:${email}?subject=Re: Your inquiry to Faizal Chirakkal" style="display: inline-block; background: #111827; color: #ffffff; padding: 10px 20px; border-radius: 8px; font-size: 13px; text-decoration: none; font-weight: 500;">
                  Reply directly to ${email}
                </a>
              </div>
            </div>

            <div style="background: #f3f4f6; padding: 12px 24px; text-align: center; font-size: 11px; color: #9ca3af;">
              Sent via Muhammed Faizal Chirakkal Executive Website &bull; Destination: ${toEmail}
            </div>
          </div>
        `,
      }

      await transporter.sendMail(mailOptions)
      return NextResponse.json({ success: true, message: "Email sent successfully." })
    } else {
      // SMTP not yet configured — log in development console and return success
      console.log("=== [CONTACT FORM INQUIRY RECEIVED] ===")
      console.log(`From: ${name || "Visitor"} <${email}>`)
      console.log(`Message: ${message || "(empty)"}`)
      console.log("Note: To deliver real emails, add SMTP credentials in .env.local")
      console.log("=======================================")
      return NextResponse.json({ 
        success: true, 
        message: "Inquiry received. Configure SMTP in .env.local to dispatch live emails." 
      })
    }
  } catch (error: any) {
    console.error("Error in contact API route:", error)
    return NextResponse.json(
      { error: error?.message || "Failed to process message." },
      { status: 500 }
    )
  }
}

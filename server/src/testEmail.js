import dotenv from "dotenv";
dotenv.config(); 
import { sendEmail } from "./utils/mailer.js";


async function test() {
  await sendEmail({
    to: "lawrenccejoel2020@gmail.com",
    subject: "Test Email",
    html: `
      <h2>Hello!</h2>
      <p>This is a test email sent from Node.js.</p>
      <p>If you see this, your mail configuration works! 🎉</p>
    `,
  });
}

test();

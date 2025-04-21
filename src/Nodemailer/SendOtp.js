const nodemailer = require("nodemailer");
require("dotenv").config();


const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    service:"gmail",
    port: 465,
    secure: true,
        auth: {
        user: process.env.NODEMAILER_EMAIL, 
        pass: process.env.NODEMAILER_PASSWORD, 
    },
  });


exports.otpsender = async (name, emailId, randomOtp) => {

    const emailTemplate = {
    from: `"MoviesAll" <${process.env.NODEMAILER_EMAIL}>`, // Must match authenticated email
    to: emailId,
    subject: "Email Verification OTP - MoviesAll",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #16253D; padding: 30px; border-radius: 10px;">
          <h1 style="color: #FF4500; margin: 0; padding-bottom: 20px;">MoviesAll</h1>
          <div style="background-color: #ffffff; padding: 30px; border-radius: 8px;">
            <h2 style="color: #16253D; margin-top: 0;">Verify Your Email</h2>
            <p style="color: #333333;">Hello ${name},</p>
            <p style="color: #333333;">Your OTP is:</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #16253D;">${randomOtp}</span>
            </div>
            <p style="color: #333333;">This code is valid for 5 minutes.</p>
            <p style="color: #333333;">Do not share this code with anyone.</p>
            <p style="color: #333333;">If you did not request this, ignore this email.</p>
            <p style="color: #333333; margin-top: 20px;">Welcome aboard!<br>Team MoviesAll</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(emailTemplate);
    console.log(`✅ Email sent successfully. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error("Failed to send OTP email");
  }
};
    
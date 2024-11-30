import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (user) => {
  try {
    // Nodemailer transporter configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.ZIPNGO_SMPT_MAIL,
        pass: process.env.ZIPNGO_SMPT_MAIL_PASSWORD,
      },
    });

    // Email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div style="padding: 20px; background: #4CAF50;">
            <img src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" alt="Welcome" style="width: 80px; margin-bottom: 20px;">
            <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Welcome to ZipNGo</h1>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px; color: #333333;">Hello, <b>${user.name}</b>,</p>
            <p style="font-size: 16px; color: #333333;">
              Thank you for registering with <b>Storefleet</b>. We're excited to have you as a new member of our community.
            </p>
            <a href="${process.env.APP_URL}" style="display: inline-block; background: #4CAF50; color: #ffffff; text-decoration: none; font-size: 16px; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">Get Started</a>
          </div>
          <div style="padding: 20px; background: #f4f4f4; text-align: center;">
            <p style="font-size: 12px; color: #999999;">&copy; 2024 Storefleet. All rights reserved.</p>
          </div>
        </div>
      </div>
    `;

    // Email options
    const mailOptions = {
      from: process.env.ZIPNGO_SMPT_MAIL,
      to: user.email,
      subject: "Welcome to Storefleet",
      html: emailHtml,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Could not send welcome email");
  }
};

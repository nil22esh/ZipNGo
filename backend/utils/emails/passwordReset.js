import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (user, resetPasswordURL, token) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    port: 587,
    auth: {
      user: process.env.ZIPNGO_SMPT_MAIL,
      pass: process.env.ZIPNGO_SMPT_MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.ZIPNGO_SMTP_MAIL,
    to: user.email,
    subject: "Password Reset",
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                /* Add your custom CSS styles here */
                body {
                    font-family: Arial, sans-serif;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    text-align: center;
                }
                .logo {
                    max-width: 150px;
                }
                .content {
                    margin-top: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #20d49a;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                /* Mobile Responsive Styles */
                @media only screen and (max-width: 600px) {
                    .container {
                        padding: 10px;
                    }
                    .logo {
                        max-width: 100px;
                    }
                    .button {
                        display: block;
                        margin-top: 10px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img class="logo" src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" alt="Zipngo Logo">
                    <h1>Password Reset</h1>
                </div>
                <div class="content">
                    <p>Hello, ${user.name}</p>
                    <p>You have requested to reset your password for your ZipNGo account. To reset your password, please enter the given token to complete reset password process: <strong>${token}</strong></p>
                    <p>If you did not request a password reset, please ignore this email.</p>
                </div>
            </div>
        </body>
        </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

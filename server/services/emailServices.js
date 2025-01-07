import nodemailer from "nodemailer";
// import db from "../models/index.js";

export class Emailservice {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "np03cs4s220027@heraldcollege.edu.np", // email address
        pass: "qpsngvcfibuvkyyg", // gmail password
      },
    });
  }

  async sendEmail(to, subject, text) {
    const mailOptions = {
      from: "np03cs4s220027@heraldcollege.edu.np", // Admin email admin.email
      to: to,
      subject: subject,
      text: text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (err) {
      throw new Error(`Failed to send Email: ${err.message}`);
    }
  }
}

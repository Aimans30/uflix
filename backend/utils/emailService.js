const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendEmail = async (options) => {
  const mailOptions = {
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    html: options.html
  };

  await transporter.sendMail(mailOptions);
};

exports.sendOrderConfirmation = async (order, user) => {
  const html = `
    <h1>Order Confirmation</h1>
    <p>Dear ${user.name},</p>
    <p>Thank you for your order! Your order number is <strong>${order.orderNumber}</strong></p>
    <h2>Order Details:</h2>
    <ul>
      ${order.items.map(item => `
        <li>${item.name} - Quantity: ${item.quantity} - Price: ₹${item.price}</li>
      `).join('')}
    </ul>
    <p><strong>Total: ₹${order.totalPrice}</strong></p>
    <p>We'll send you another email when your order ships.</p>
  `;

  await this.sendEmail({
    email: user.email,
    subject: `Order Confirmation - ${order.orderNumber}`,
    html
  });
};

exports.sendOrderStatusUpdate = async (order, user, status) => {
  const html = `
    <h1>Order Status Update</h1>
    <p>Dear ${user.name},</p>
    <p>Your order <strong>${order.orderNumber}</strong> status has been updated to: <strong>${status}</strong></p>
    ${order.trackingInfo?.trackingNumber ? `
      <p>Tracking Number: ${order.trackingInfo.trackingNumber}</p>
      <p>Carrier: ${order.trackingInfo.carrier}</p>
    ` : ''}
    <p>Thank you for shopping with UFLIX!</p>
  `;

  await this.sendEmail({
    email: user.email,
    subject: `Order Update - ${order.orderNumber}`,
    html
  });
};

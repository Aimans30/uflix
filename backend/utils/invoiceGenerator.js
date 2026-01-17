const PDFDocument = require('pdfkit');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const generateInvoice = (order, user) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];

      // Collect PDF data
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve(pdfBuffer);
      });
      doc.on('error', reject);

      // Header
      doc.fontSize(20).text('UFLIX', 50, 50);
      doc.fontSize(10).text('Premium Furniture & Metal Fabrication', 50, 75);
      doc.text('Phone: +91 120 491 1871 | +91 730 383 6300', 50, 90);
      doc.text('Email: ebusiness@uflix.co.in', 50, 105);

      // Invoice Title
      doc.fontSize(20).text('INVOICE', 400, 50);
      doc.fontSize(10).text(`Invoice #: ${order.orderNumber}`, 400, 75);
      doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 400, 90);
      doc.text(`Status: ${order.orderStatus.toUpperCase()}`, 400, 105);

      // Line
      doc.moveTo(50, 130).lineTo(550, 130).stroke();

      // Bill To
      doc.fontSize(12).text('Bill To:', 50, 150);
      doc.fontSize(10).text(order.shippingAddress.name, 50, 170);
      doc.text(order.shippingAddress.phone, 50, 185);
      doc.text(order.shippingAddress.addressLine1, 50, 200);
      if (order.shippingAddress.addressLine2) {
        doc.text(order.shippingAddress.addressLine2, 50, 215);
      }
      doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`, 50, 230);

      // Payment Info
      doc.fontSize(12).text('Payment Details:', 350, 150);
      doc.fontSize(10).text(`Method: ${order.paymentMethod.toUpperCase()}`, 350, 170);
      doc.text(`Status: ${order.paymentInfo?.status || 'Pending'}`, 350, 185);
      if (order.paymentInfo?.paidAt) {
        doc.text(`Paid On: ${new Date(order.paymentInfo.paidAt).toLocaleDateString()}`, 350, 200);
      }

      // Items Table Header
      let yPosition = 270;
      doc.fontSize(10).text('Item', 50, yPosition);
      doc.text('Qty', 300, yPosition);
      doc.text('Price', 370, yPosition);
      doc.text('Total', 470, yPosition);
      
      doc.moveTo(50, yPosition + 15).lineTo(550, yPosition + 15).stroke();
      yPosition += 25;

      // Items
      order.items.forEach(item => {
        const itemPrice = item.discountPrice || item.price;
        const itemTotal = itemPrice * item.quantity;

        doc.fontSize(9).text(item.name, 50, yPosition, { width: 240 });
        doc.text(item.quantity.toString(), 300, yPosition);
        doc.text(`₹${itemPrice.toLocaleString()}`, 370, yPosition);
        doc.text(`₹${itemTotal.toLocaleString()}`, 470, yPosition);
        
        yPosition += 30;
      });

      // Line before totals
      doc.moveTo(50, yPosition).lineTo(550, yPosition).stroke();
      yPosition += 15;

      // Totals
      doc.fontSize(10).text('Subtotal:', 370, yPosition);
      doc.text(`₹${order.itemsPrice.toLocaleString()}`, 470, yPosition);
      yPosition += 20;

      doc.text('Tax (GST 18%):', 370, yPosition);
      doc.text(`₹${order.taxPrice.toLocaleString()}`, 470, yPosition);
      yPosition += 20;

      doc.text('Shipping:', 370, yPosition);
      doc.text(`₹${order.shippingPrice.toLocaleString()}`, 470, yPosition);
      yPosition += 20;

      if (order.discountAmount > 0) {
        doc.text('Discount:', 370, yPosition);
        doc.text(`-₹${order.discountAmount.toLocaleString()}`, 470, yPosition);
        yPosition += 20;
      }

      // Grand Total
      doc.fontSize(12).text('Grand Total:', 370, yPosition);
      doc.text(`₹${order.totalPrice.toLocaleString()}`, 470, yPosition);

      // Footer
      yPosition = 700;
      doc.fontSize(8).text('Thank you for your business!', 50, yPosition, { align: 'center', width: 500 });
      doc.text('For any queries, please contact us at ebusiness@uflix.co.in', 50, yPosition + 15, { align: 'center', width: 500 });

      // Finalize PDF
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

const uploadInvoiceToCloudinary = async (pdfBuffer, orderNumber) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'uflix/invoices',
        resource_type: 'raw',
        public_id: `invoice_${orderNumber}`,
        format: 'pdf'
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(pdfBuffer);
  });
};

exports.generateAndUploadInvoice = async (order, user) => {
  try {
    // Generate PDF
    const pdfBuffer = await generateInvoice(order, user);
    
    // Upload to Cloudinary
    const result = await uploadInvoiceToCloudinary(pdfBuffer, order.orderNumber);
    
    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw error;
  }
};

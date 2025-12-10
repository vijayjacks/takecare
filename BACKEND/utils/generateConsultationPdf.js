// const puppeteer = require('puppeteer');
// const ejs = require('ejs');
// const path = require('path');

// const generateConsultationPdf = async (consultation, res) => {
//   try {
//     const templatePath = path.join(__dirname, '../templates/consultation-template.ejs');

//     const html = await ejs.renderFile(templatePath, { consultation });

//     const browser = await puppeteer.launch({
//       headless: 'new', // safer with Node >=18
//       args: ['--no-sandbox', '--disable-setuid-sandbox']
//     });

//     const page = await browser.newPage();
//     await page.setContent(html, { waitUntil: 'networkidle0' });

//     const pdfBuffer = await page.pdf({
//       format: 'A4',
//       printBackground: true,
//       margin: { top: '20mm', bottom: '20mm' }
//     });

//     await browser.close();

//     // Set PDF headers
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader(
//       'Content-Disposition',
//       `attachment; filename=consultation-${consultation._id}.pdf`
//     );
//     res.send(pdfBuffer);
//   } catch (err) {
//     console.error('PDF Generation Error:', err);
//     res.status(500).json({ error: 'Failed to generate PDF' });
//   }
// };

// module.exports = generateConsultationPdf;


// const puppeteer = require('puppeteer');
// const ejs = require('ejs');
// const path = require('path');
// const fs = require('fs');

// const generateConsultationPdf = async (consultation, res) => {
//   const templatePath = path.join(__dirname, '../utils/template.ejs');

//   if (!fs.existsSync(templatePath)) {
//     console.error('Template file not found:', templatePath);
//     return res.status(500).json({ error: 'Template not found' });
//   }

//   let browser;
//   try {
//     const html = await ejs.renderFile(templatePath, { consultation });

//     const puppeteerOptions = {
//       headless: 'new', // or true if older Node version
//       args: process.env.NO_SANDBOX === 'true' ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
//     };

//     browser = await puppeteer.launch(puppeteerOptions);

//     const page = await browser.newPage();
//     await page.setContent(html, { waitUntil: 'networkidle0' });

//     const pdfBuffer = await page.pdf({
//       format: 'A4',
//       printBackground: true,
//       margin: { top: '20mm', bottom: '20mm' },
//     });

//     res.type('pdf');
//     res.attachment(`consultation-${consultation._id}.pdf`);
//     res.send(pdfBuffer);
//   } catch (err) {
//     console.error('PDF Generation Error:', err.message);
//     res.status(500).json({ error: 'Failed to generate PDF', details: err.message });
//   } finally {
//     if (browser) {
//       try {
//         await browser.close();
//       } catch (closeErr) {
//         console.error('Error closing browser:', closeErr.message);
//       }
//     }
//   }
// };

// module.exports = generateConsultationPdf;









const puppeteer = require('puppeteer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const generateConsultationPdf = async (consultation, res) => {
  const templatePath = path.join(__dirname, 'template.ejs');

  if (!fs.existsSync(templatePath)) {
    console.error('EJS template not found:', templatePath);
    return res.status(500).json({ error: 'Template file missing' });
  }

  let browser;
  try {
    const html = await ejs.renderFile(templatePath, { consultation });

    const puppeteerOptions = {
      headless: 'new',
      args: process.env.NO_SANDBOX === 'true'
        ? ['--no-sandbox', '--disable-setuid-sandbox']
        : [],
    };

    browser = await puppeteer.launch(puppeteerOptions);
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm' },
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=consultation-${consultation._id}.pdf`);
    res.send(pdfBuffer);

  } catch (err) {
    console.error('PDF generation failed:', err.message);
    res.status(500).json({ error: 'Error generating PDF' });
  } finally {
    if (browser) await browser.close();
  }
};

module.exports = generateConsultationPdf;

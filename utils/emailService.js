import createTransporter from '../config/emailConfig.js';

const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const transporter = createTransporter();
        const mailOptions = {
            from: `"Hire Bridge" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        };
        const info = await transporter.sendMail(mailOptions);
        return { success: true, info }; 
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
};

// Welcome Email
const sendWelcomeEmail = async (email, userName) => {
  const subject = 'Welcome to Hire Bridge, Your Hiring Journey Starts Here!';
  
  const text = `
Welcome to Hire Bridge, ${userName}!

We're thrilled to have you join our platform. Hire Bridge is a web recruitment platform designed to provide an end-to-end hiring experience that eliminates broken communication, accelerates matching, and improves transparency.

Get Started:
- Complete your profile
- Post your first job or upload your resume
- Start connecting with top talent or exciting opportunities

// Need help? Contact us at support@hirebridge.com     

Best regards,
The Hire Bridge Team
  `;

  const html = `
    <h2>Welcome to Hire Bridge, ${userName}!</h2>
    <p>We're thrilled to have you join our platform. Hire Bridge is a web recruitment platform designed to provide an end-to-end hiring experience that eliminates broken communication, accelerates matching, and improves transparency.</p>
    
    <h3>Get Started:</h3>
    <ul>
      <li>Complete your profile</li>
      <li>Post your first job or upload your resume</li>
      <li>Start connecting with top talent or exciting opportunities</li>
    </ul>
    
    // <p>Need help? Contact us at <a href="mailto:support@hirebridge.com">support@hirebridge.com</a></p>
    
    <p>Best regards,<br>The Hire Bridge Team</p>
  `;

  return sendEmail({
    to: email,
    subject,
    text,
    html
  });
};


const sendPasswordResetEmail = async (email, userName, resetToken) => {
  const resetLink = `https://www.hirebridge.com/reset-password?token=${resetToken}`;
  
  const subject = 'Hire Bridge, Password Reset Request';
  
  const text = `
Hello ${userName},

We received a request to reset the password for your Hire Bridge account.

Click the link below to reset your password:
${resetLink}

This link will expire in 1 hour for your security.

If you didn't request a password reset, you can safely ignore this email. Your account is still secure.

// Need assistance? Contact us at support@hirebridge.com

Best regards,
The Hire Bridge Security Team
  `;

  const html = `
    <h2>Password Reset Request</h2>
    
    <p>Hello <strong>${userName}</strong>,</p>
    
    <p>We received a request to reset the password for your Hire Bridge account.</p>
    
    <p><a href="${resetLink}">Click here to reset your password</a></p>
    <p>Or copy and paste this link: ${resetLink}</p>
    
    <p><strong>This link will expire in 1 hour</strong></p>
    
    <p>If you didn't request a password reset, you can safely ignore this email. Your account is still secure.</p>
    
    // <p>Need assistance? Contact us at <a href="mailto:support@hirebridge.com">support@hirebridge.com</a></p>
    
    <p>Best regards,<br>The Hire Bridge Security Team</p>
  `;

  return sendEmail({
    to: email,
    subject,
    text,
    html
  });
};


export { sendWelcomeEmail, sendPasswordResetEmail };
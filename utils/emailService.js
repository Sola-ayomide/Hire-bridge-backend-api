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
const sendWelcomeEmail = async (email, userName, role) => {
  const subject = 'Welcome to Hire Bridge, Your Hiring Journey Starts Here!';
  let userRole;
  let secondStep;

  if (role === "recruiter") {
    userRole = role;
    secondStep = "Post your first job";
  } else {
    userRole = 'candidate'
    secondStep = "Upload your resume";
  }
  
  const text = `
Welcome to Hire Bridge, ${userName}!

We're thrilled to have you join our platform. Hire Bridge is a web recruitment platform designed to provide an end-to-end hiring experience that eliminates broken communication, accelerates matching, and improves transparency.

Get Started:
- Complete your profile as ${userRole}
-  ${secondStep}
- Start connecting with top talent or exciting opportunities

Need help? Contact us at support@hirebridge.com     

Best regards,
The Hire Bridge Team
  `;

const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    
    <!-- Header -->
    <div style="background-color: #1E5ED6; padding: 40px 32px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">
        Hire <span style="color: #10B981;">Bridge</span>
      </h1>
    </div>

    <!-- Hero Banner -->
    <div style="background-color: #EFF6FF; padding: 32px; text-align: center; border-bottom: 3px solid #1E5ED6;">
      <h2 style="color: #1E5ED6; font-size: 24px; margin: 0 0 8px 0;">
        Welcome to Hire Bridge, ${userName}!
      </h2>
      <p style="color: #475569; font-size: 15px; margin: 0;">
        Your hiring journey starts here.
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 32px;">
      <p style="color: #0F172A; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
        We're thrilled to have you join our platform. Hire Bridge is a web recruitment platform 
        designed to provide an end-to-end hiring experience that eliminates broken communication, 
        accelerates matching, and improves transparency.
      </p>

      <!-- Get Started Section -->
      <div style="background-color: #F8FAFC; border-left: 4px solid #1E5ED6; border-radius: 4px; padding: 24px; margin-bottom: 24px;">
        <h3 style="color: #0F172A; font-size: 16px; margin: 0 0 16px 0; font-weight: 700;">
          Get Started
        </h3>

        <!-- Step 1 -->
        <div style="display: flex; align-items: flex-start; margin-bottom: 12px;">
          <div style="background-color: #1E5ED6; color: #ffffff; border-radius: 50%; width: 24px; height: 24px; display: inline-block; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700; margin-right: 12px; flex-shrink: 0;">
            1
          </div>
          <p style="color: #0F172A; font-size: 14px; margin: 0; line-height: 24px;">
            Complete your profile as a <strong>${userRole}</strong>
          </p>
        </div>

        <!-- Step 2 -->
        <div style="display: flex; align-items: flex-start; margin-bottom: 12px;">
          <div style="background-color: #1E5ED6; color: #ffffff; border-radius: 50%; width: 24px; height: 24px; display: inline-block; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700; margin-right: 12px; flex-shrink: 0;">
            2
          </div>
          <p style="color: #0F172A; font-size: 14px; margin: 0; line-height: 24px;">
            ${secondStep}
          </p>
        </div>

        <!-- Step 3 -->
        <div style="display: flex; align-items: flex-start;">
          <div style="background-color: #10B981; color: #ffffff; border-radius: 50%; width: 24px; height: 24px; display: inline-block; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700; margin-right: 12px; flex-shrink: 0;">
            3
          </div>
          <p style="color: #0F172A; font-size: 14px; margin: 0; line-height: 24px;">
            Start connecting with top talent or exciting opportunities
          </p>
        </div>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 32px 0;">
        <a href="https://oyinbosola.github.io/Hire-Bridge-Group5/frontend/pages/welcome.html" 
           style="background-color: #1E5ED6; color: #ffffff; text-decoration: none; padding: 14px 36px; border-radius: 6px; font-size: 15px; font-weight: 700; display: inline-block;">
          Go to Hire Bridge
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #0F172A; padding: 24px 32px; text-align: center;">
      <p style="color: #94A3B8; font-size: 13px; margin: 0 0 8px 0;">
        Best regards,<br>
        <span style="color: #ffffff; font-weight: 700;">The Hire Bridge Team</span>
      </p>
      <p style="color: #475569; font-size: 12px; margin: 8px 0 0 0;">
        Need help? Contact us at 
        <a href="mailto:support@hirebridge.com" onclick="return false" style="color: #1E5ED6; text-decoration: none;">
          support@hirebridge.com
        </a>
      </p>
    </div>

  </div>
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

Need assistance? Contact us at support@hirebridge.com

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
    
    <p>Need assistance? Contact us at <a href="mailto:support@hirebridge.com">support@hirebridge.com</a></p>
    
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
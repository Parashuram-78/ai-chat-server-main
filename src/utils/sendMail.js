import axios from "axios";

export const sendInviteMail = async (name, email, resetToken) => {
	const apiKey = process.env.MAIL_API_KEY;
	const link = `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`;
	const data = {
		sender: { name: "AI Chat", email: "ai-chat@gmail.com" },
		to: [{ email: email, name: "Dear Team Member" }],
		subject: "AI CHAT RESET PASSWORD",
		htmlContent: `
  <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
    <h2>Hello ${name}</h2>
    <p>We received a request to reset your password. Click the button below to reset it:</p>
    <a href="${link}" rel="noopener noreferrer" target="_blank">
      <button type="button">Reset Password</button>
    </a>
    <p>If you didn’t request a password reset, you can ignore this email, and your password will remain unchanged.</p>
  <p>This link is <strong>valid for 15 minutes</strong> and can only be used once.</p>
    <p>
      Best regards,<br><strong>AI Chat</strong>
    </p>
  </div>
`,
	};

	try {
		const response = await axios.post("https://api.brevo.com/v3/smtp/email", data, {
			headers: {
				accept: "application/json",
				"api-key": apiKey,
				"content-type": "application/json",
			},
		});
		return response.data;
	} catch {
		return null;
	}
};

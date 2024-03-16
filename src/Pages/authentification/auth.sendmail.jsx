import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const MailSender = () => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const sendMail = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: recipient,
        subject,
        message_html: body,
      }, 'YOUR_USER_ID');

      console.log('Email sent successfully!');
      setRecipient('');
      setSubject('');
      setBody('');
    } catch (error) {
      console.error('Error sending email:', error);
      setError('Failed to send email');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <h2>Send Email</h2>
      {error && <p>{error}</p>}
      <form onSubmit={sendMail}>
        <label>
          Recipient:
          <input
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </label>
        <label>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </label>
        <label>
          Body:
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={sending}>Send Email</button>
      </form>
    </div>
  );
};

export default MailSender;

import postmark from 'postmark';
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

export const handler = async (event, context) => {
  try {
   const { to, name, email, subject, text } = JSON.parse(event.body);

    const msg = {
      "To": "info@matjo.de", // set email of receiver
      "From": `"${name}" <info@matjo.de>`, // set email of sender
      "Subject": subject,
      "TextBody": text,
      "ReplyTo": `"${name}" <${email}>`,
      "MessageStream": "matjo"
    };
    await client.sendEmail(msg);
    console.log('Email erfolgreich verschickt.');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email erfolgreich verschickt' }),
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Fehler beim verschicken der E-Mail!' }),
    };
  }
};

// functions/api/contact.js
export async function onRequestPost({ request, env }) {
  console.log('API called!', env.RESEND_API_KEY); // 用于调试
  console.log('Method:', request.method); // 应输出 "POST"
  
  try {
    const data = await request.json();
    const { name, email, message } = data;

    // 基础验证
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 验证邮箱格式（简单版）
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'The email address format is incorrect' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 调用 Resend 发送邮件
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Elunehair Contact <onboarding@resend.dev>', // Resend 提供的测试发信地址
        to: env.CONTACT_EMAIL || '1642334095@qq.com',     // 从环境变量读取接收邮箱（推荐）
        subject: `【Elunehair】New Visitor Message：${name}`,
        text: `NAME: ${name}\nEMAIL: ${email}\n\nMESSAGE:\n${message}`,
        reply_to: email
      })
    });

    if (resendResponse.ok) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      const errText = await resendResponse.text();
      console.error('Resend API Error:', errText);
      return new Response(JSON.stringify({ error: 'The email failed to send. Please contact the administrator' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (err) {
    console.error('Function Runtime Error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}


import { NextResponse } from "next/server";

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function isValidEmail(value: string): boolean {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "リクエストの形式が正しくありません。" },
      { status: 400 },
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name) {
    return NextResponse.json(
      { error: "お名前を入力してください。" },
      { status: 400 },
    );
  }
  if (!email) {
    return NextResponse.json(
      { error: "メールアドレスを入力してください。" },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "正しいメールアドレスの形式で入力してください。" },
      { status: 400 },
    );
  }
  if (!message) {
    return NextResponse.json(
      { error: "本文を入力してください。" },
      { status: 400 },
    );
  }

  const payload = { name, email, message };
  console.log("[api/contact] POST", payload);

  return NextResponse.json({ ok: true });
}

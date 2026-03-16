"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { sendWhatsAppMessage } from "@/lib/fonnte";
import { generateVerificationToken } from "@/lib/tokens";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  phoneNumber: z.string().min(10),
});

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Data tidak valid!" };
  }

  const { email, password, name, phoneNumber } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email sudah digunakan!" };
  }

  // Create User
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  // Send Verification Email
  await sendEmail({
    to: email,
    subject: "Verifikasi Akun Bylian Trans",
    text: `Klik di sini untuk verifikasi: ${process.env.NEXT_PUBLIC_APP_URL}/auth/verifikasi?token=${verificationToken.token}`,
  });

  return { success: "Email verifikasi telah dikirim!" };
};

export const newVerification = async (token: string) => {
  const existingToken = await db.verificationToken.findUnique({
    where: { token }
  });

  if (!existingToken) {
    return { error: "Token tidak ditemukan!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token telah kedaluwarsa!" };
  }

  const existingUser = await db.user.findUnique({
    where: { email: existingToken.identifier }
  });

  if (!existingUser) {
    return { error: "Email tidak ditemukan!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(),
      email: existingToken.identifier, // Fallback in case email was changed
    }
  });

  await db.verificationToken.delete({
    where: { 
        identifier_token: {
            identifier: existingToken.identifier,
            token: existingToken.token
        }
    }
  });

  return { success: "Email berhasil diverifikasi!" };
};

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Email atau password tidak valid!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (!existingUser || !existingUser.password) {
    return { error: "Email belum terdaftar!" };
  }

  if (!existingUser.emailVerified) {
    return { error: "Email belum diverifikasi!" };
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordMatch) {
    return { error: "Password salah!" };
  }

  // Task 58: AI-Driven Anomaly Detection (Super Logic)
  // Mock IP/City from headers (in real app use a GEO-IP service)
  const mockIp = "182.1.2.3"; 
  const mockCity = "Jakarta";
  const { detectSecurityAnomaly } = await import("@/lib/security_ai");
  const anomalyCheck = await detectSecurityAnomaly(existingUser.id, mockIp, mockCity);

  if (anomalyCheck.anomaly && anomalyCheck.riskScore && anomalyCheck.riskScore > 0.9) {
      console.warn(`[SECURITY] High risk login blocked for ${email}: ${anomalyCheck.type}`);
      // In a real high-sec app, we might block this login or trigger 2FA
  }

  // Here you would normally call signIn from next-auth/react or similar
  return { 
      success: "Berhasil masuk!",
      securityNote: anomalyCheck.anomaly ? "Aktivitas login tidak biasa terdeteksi." : undefined
  };
};

/**
 * Task 9: Generate Admin 2FA OTP
 */
export const generateAdminOtp = async (userId: string) => {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    return { error: "Akses ditolak!" };
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 mins

  await db.otpVerification.upsert({
    where: { id: userId }, // Using userId as ID for simpler lookup or unique constraint
    update: { otp, expires, purpose: "2FA_ADMIN" },
    create: { id: userId, userId, otp, expires, purpose: "2FA_ADMIN" }
  });

  // Try WhatsApp first, then Email
  if (user.phoneNumber) {
    const waResult = await sendWhatsAppMessage(
        user.phoneNumber, 
        `Kode OTP Admin Bylian Trans: *${otp}*. Berlaku 5 menit. JANGAN BERIKAN KODE INI KEPADA SIAPAPUN.`
    );
    if (waResult.success) return { success: "OTP dikirim ke WhatsApp!" };
  }

  if (user.email) {
    await sendEmail({
      to: user.email,
      subject: "Kode OTP Admin Bylian Trans",
      text: `Kode OTP Anda adalah: ${otp}. Berlaku selama 5 menit.`
    });
    return { success: "OTP dikirim ke Email!" };
  }

  return { error: "Gagal mengirim OTP!" };
};

/**
 * Task 9: Verify Admin 2FA OTP
 */
export const verifyAdminOtp = async (userId: string, otp: string) => {
  const verification = await db.otpVerification.findUnique({
    where: { id: userId }
  });

  if (!verification || verification.otp !== otp) {
    return { error: "Kode OTP salah!" };
  }

  if (new Date(verification.expires) < new Date()) {
    return { error: "Kode OTP telah kedaluwarsa!" };
  }

  // Delete OTP after verification
  await db.otpVerification.delete({ where: { id: userId } });

  return { success: "Verifikasi berhasil!" };
};

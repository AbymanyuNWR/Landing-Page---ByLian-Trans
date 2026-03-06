"use client";

import QRCode from "react-qr-code";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function TicketQRCode({ bookingCode, qrData }: { bookingCode: string, qrData: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center shadow-sm max-w-sm mx-auto">
      <h3 className="font-bold text-lg mb-2 text-slate-800">Scan untuk Boarding</h3>
      <p className="text-xs text-slate-500 mb-6 px-4">Tunjukkan QR code ini kepada petugas saat menaiki bus.</p>
      
      <div className="bg-white p-4 border-2 border-dashed border-slate-300 rounded-2xl inline-block mx-auto">
        <QRCode 
          value={qrData} 
          size={180}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
        />
      </div>

      <div className="mt-8 flex items-center justify-between bg-slate-50 font-mono text-sm p-3 rounded-xl border border-slate-200">
        <span className="font-bold tracking-widest pl-2">{bookingCode}</span>
        <button 
          onClick={copyCode}
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

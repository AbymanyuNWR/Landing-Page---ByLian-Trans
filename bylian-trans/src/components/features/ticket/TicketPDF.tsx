import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register fonts if needed
// Font.register({ family: 'Inter', src: '...' });

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#1d4ed8',
    paddingBottom: 10,
    marginBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  gridItem: {
    width: '50%',
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
    fontSize: 8,
    color: '#94a3b8',
    textAlign: 'center',
  },
  ticketBox: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#f8fafc',
  }
});

export const TicketPDF = ({ booking }: { booking: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>BYLIAN TRANS</Text>
        <Text style={styles.title}>E-TICKET / INVOICE</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Kode Booking</Text>
            <Text style={[styles.value, { fontSize: 20, color: '#1d4ed8' }]}>{booking.bookingCode}</Text>
          </View>
          <View style={{ textAlign: 'right' }}>
            <Text style={styles.label}>Status Pembayaran</Text>
            <Text style={[styles.value, { color: '#059669' }]}>LUNAS / SETTLED</Text>
          </View>
        </View>
      </View>

      <View style={styles.ticketBox}>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Nama Pemesan</Text>
            <Text style={styles.value}>{booking.user?.name || booking.customerEmail}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Rute Perjalanan</Text>
            <Text style={styles.value}>{booking.schedule.route.origin} - {booking.schedule.route.destination}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Waktu Keberangkatan</Text>
            <Text style={styles.value}>{new Date(booking.schedule.departureTime).toLocaleString('id-ID')}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Pool Keberangkatan</Text>
            <Text style={styles.value}>{booking.schedule.departurePool}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Nomor Kursi</Text>
            <Text style={styles.value}>{booking.passengers.map((p: any) => p.seat.seatNumber).join(', ')}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Total Bayar</Text>
            <Text style={styles.value}>Rp {booking.totalAmount.toLocaleString('id-ID')}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, { marginTop: 30 }]}>
        <Text style={[styles.label, { marginBottom: 10 }]}>Daftar Penumpang</Text>
        {booking.passengers.map((passenger: any, index: number) => (
          <View key={index} style={{ marginBottom: 5, paddingBottom: 5, borderBottomWidth: 0.5, borderBottomColor: '#f1f5f9' }}>
            <Text style={styles.value}>{index + 1}. {passenger.name} ({passenger.idNumber})</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text>Harap tiba di pool 30 menit sebelum keberangkatan. Tunjukkan E-Ticket ini (digital/cetak) kepada petugas.</Text>
        <Text>PT Bylian Trans - Melayani Dengan Nyaman & Terpercaya</Text>
      </View>
    </Page>
  </Document>
);

export default TicketPDF;

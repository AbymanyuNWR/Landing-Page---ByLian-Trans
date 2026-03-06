// Dummy Initial Data for UI while Database is spinning up

export const COMPANY_DATA = {
    name: "PT Bylian Trans",
    brand: "Bylian Trans",
    tagline: "Perjalanan Mewah, Harga Terjangkau",
    subTagline: "Mitra Perjalanan Terpercaya Anda",
    description: "Operator bus kota dan pariwisata terkemuka di Kota Tegal",
    foundedYear: 2005,
    operationalSince: "2005",
    address: "Jl. Kapten Sudibyo No.123, Pekauman, Kec. Tegal Bar., Kota Tegal, Jawa Tengah 52112",
    contacts: {
        phone: "(0283) 351234",
        whatsapp: "081234567890",
        csWhatsApp: "6281234567890",
        email: "info@byliantrans.co.id"
    },
    socials: {
        instagram: "https://instagram.com/byliantrans",
        facebook: "https://facebook.com/byliantrans",
        twitter: "https://twitter.com/byliantrans",
        youtube: "https://youtube.com/@byliantrans"
    },
    stats: {
        rating: 4.8,
        totalFleet: 25,
        activeRoutes: 18,
        monthlyPassengers: 15000,
        yearsOperating: new Date().getFullYear() - 2005,
        totalPassengers: 500000
    }
};
export const CITIES = [
    "Tegal",
    "Jakarta",
    "Bandung",
    "Semarang",
    "Yogyakarta",
    "Surabaya",
    "Malang",
    "Purwokerto"
];

export const DUMMY_ROUTES = [
    {
        id: "r1",
        origin: "Tegal",
        destination: "Jakarta",
        price: 150000,
        busClass: "EKSEKUTIF",
        departureTime: "19:00",
        arrivalTime: "23:00",
        duration: "4J 0M",
        availableSeats: 12
    },
    {
        id: "r2",
        origin: "Tegal",
        destination: "Bandung",
        price: 130000,
        busClass: "BISNIS_AC",
        departureTime: "08:00",
        arrivalTime: "12:30",
        duration: "4J 30M",
        availableSeats: 5
    },
    {
        id: "r3",
        origin: "Jakarta",
        destination: "Tegal",
        price: 150000,
        busClass: "SUPER_EKSEKUTIF",
        departureTime: "18:00",
        arrivalTime: "22:00",
        duration: "4J 0M",
        availableSeats: 2
    }
];

export const FLEET_INFO = [
    {
        id: "f1",
        name: "Mercedes Benz OH 1626",
        class: "Super Eksekutif",
        capacity: 22,
        layout: "2-1",
        image: "/images/fleet/super-exec.jpg",
        facilities: ["AC", "Toilet", "Reclining Seat", "Leg Rest", "USB Charger", "Meal", "Bantal & Selimut"]
    },
    {
        id: "f2",
        name: "Hino RK8 R260",
        class: "Eksekutif",
        capacity: 32,
        layout: "2-2",
        image: "/images/fleet/exec.jpg",
        facilities: ["AC", "Toilet", "Reclining Seat", "Leg Rest", "USB Charger", "Snack"]
    },
    {
        id: "f3",
        name: "Hino AK215",
        class: "Bisnis AC",
        capacity: 40,
        layout: "2-2",
        image: "/images/fleet/bisnis.jpg",
        facilities: ["AC", "Reclining Seat", "Music"]
    }
];

export const TESTIMONIALS = [
    {
        id: "t1",
        name: "Andi Saputra",
        route: "Tegal - Jakarta",
        rating: 5,
        text: "Mantap! Bus bersih, AC dingin, dan yang paling penting tepat waktu. Terima kasih Bylian Trans!"
    },
    {
        id: "t2",
        name: "Siti Rahma",
        route: "Tegal - Bandung",
        rating: 4,
        text: "Perjalanan nyaman, kursi luas bisa buat tidur nyenyak. Toilet juga bersih sepanjang jalan."
    },
    {
        id: "t3",
        name: "Budi Santoso",
        route: "Jakarta - Tegal",
        rating: 5,
        text: "Pesan tiket online gampang banget sekarang. Nggak perlu antri di terminal lagi."
    }
];

// Extended routes data used by RuteUnggulanSection and MarqueeSection
export const ROUTES_DATA = [
    {
        id: "rd1",
        origin: "Tegal",
        destination: "Jakarta",
        estimatedDuration: "4 Jam",
        distanceKm: 280,
        classes: ["Super Eksekutif", "Eksekutif", "Bisnis AC"],
        startPrice: 150000
    },
    {
        id: "rd2",
        origin: "Tegal",
        destination: "Bandung",
        estimatedDuration: "5 Jam",
        distanceKm: 310,
        classes: ["Eksekutif", "Bisnis AC"],
        startPrice: 130000
    },
    {
        id: "rd3",
        origin: "Tegal",
        destination: "Semarang",
        estimatedDuration: "2 Jam",
        distanceKm: 110,
        classes: ["Bisnis AC"],
        startPrice: 75000
    },
    {
        id: "rd4",
        origin: "Tegal",
        destination: "Yogyakarta",
        estimatedDuration: "3.5 Jam",
        distanceKm: 200,
        classes: ["Eksekutif", "Bisnis AC"],
        startPrice: 100000
    },
    {
        id: "rd5",
        origin: "Tegal",
        destination: "Surabaya",
        estimatedDuration: "6 Jam",
        distanceKm: 430,
        classes: ["Super Eksekutif", "Eksekutif"],
        startPrice: 175000
    },
    {
        id: "rd6",
        origin: "Jakarta",
        destination: "Tegal",
        estimatedDuration: "4 Jam",
        distanceKm: 280,
        classes: ["Super Eksekutif", "Eksekutif", "Bisnis AC"],
        startPrice: 150000
    }
];

// Extended fleet data used by ArmadaSection
export const FLEET_DATA = [
    {
        id: "fd1",
        name: "Mercedes Benz OH 1626",
        brand: "Mercedes Benz",
        class: "Super Eksekutif",
        capacity: 22,
        config: "2-1",
        image: "/images/fleet/super-exec.jpg",
        facilities: ["AC Bersih Dingin", "Toilet Onboard", "Reclining Seat 120°", "Leg Rest", "USB Charger", "Lampu Baca", "Bantal & Selimut", "Meal Service"]
    },
    {
        id: "fd2",
        name: "Hino RK8 R260",
        brand: "Hino",
        class: "Eksekutif",
        capacity: 32,
        config: "2-2",
        image: "/images/fleet/exec.jpg",
        facilities: ["Full AC", "Reclining Seat", "USB Charger", "Bantal & Selimut", "Entertainment System", "Toilet Onboard"]
    },
    {
        id: "fd3",
        name: "Hino AK215",
        brand: "Hino",
        class: "Bisnis AC",
        capacity: 40,
        config: "2-2",
        image: "/images/fleet/bisnis.jpg",
        facilities: ["Full AC", "Reclining Seat", "Music Channel", "USB Charger"]
    }
];

// Dummy seat generator used by pesan/kursi page
export function generateDummySeats(layout: "2-2" | "2-1" = "2-2", rows = 10) {
    const seats = [];
    const letters = layout === "2-2" ? ["A", "B", "C", "D"] : ["A", "B", "C"];
    for (let r = 1; r <= rows; r++) {
        for (let c = 0; c < letters.length; c++) {
            const isBooked = Math.random() > 0.8;
            seats.push({
                id: `${r}${letters[c]}`,
                seatNumber: `${r}${letters[c]}`,
                status: isBooked ? "BOOKED" : "AVAILABLE",
                price: layout === "2-2" ? 150000 : 210000
            });
        }
    }
    return seats;
}


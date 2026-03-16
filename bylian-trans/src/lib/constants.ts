export const APP_NAME = "PT Bylian Trans"
export const APP_DESC = "Pesan tiket bus mudah, cepat, dan terpercaya."

// Booking Configs
export const MAX_PASSENGERS_PER_BOOKING = 4
export const SEAT_LOCK_EXPIRY_MINUTES = 10
export const PAYMENT_EXPIRY_MINUTES = 60

// Redis Keys
export const REDIS_KEYS = {
    SEAT_LOCK: "seat_lock",
    RATE_LIMIT: "rate_limit",
    ROUTE_CACHE: "route_cache",
    BUS_LOCATION: "bus_loc"
}

// Internal API Paths
export const API_PATHS = {
    SEARCH_ROUTES: "/api/search",
    SEATS: "/api/seats",
    BOOKING: "/api/booking",
    PAYMENT: "/api/payment"
}

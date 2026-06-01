import axios from "axios";

const API_URL = process.env.VITE_API_URL || "http://localhost:3000";

/**
 * 📊 Ghi doanh thu vé vào Zoho Books
 */
export async function recordBookingToZoho(bookingInfo) {
    try {
        const response = await axios.post(`${API_URL}/api/zoho/record-booking`, {
            bookingId: bookingInfo.bookingId,
            customerName: bookingInfo.customerName,
            customerEmail: bookingInfo.customerEmail,
            movieTitle: bookingInfo.movieTitle,
            seatCount: bookingInfo.seatCount,
            totalAmount: bookingInfo.totalAmount,
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi ghi Zoho:", error);
        // Không throw - không làm ảnh hưởng UX
        return null;
    }
}

/**
 * 🎫 Tạo ticket khiếu nại
 */
export async function createComplaintTicketZoho(complaintInfo) {
    try {
        const response = await axios.post(
            `${API_URL}/api/zoho/create-complaint`,
            complaintInfo
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi tạo ticket:", error);
        throw error;
    }
}

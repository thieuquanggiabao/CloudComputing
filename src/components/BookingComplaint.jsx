import React, { useState } from 'react';
import '../styles/BookingComplaint.css';
import { createComplaintTicketZoho } from '../services/zohoCinema';

function BookingComplaint({ isOpen, onClose, booking }) {
    const [department, setDepartment] = useState('Support');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!subject || !description) {
            setError('Vui lòng điền đầy đủ tiêu đề và nội dung.');
            return;
        }

        try {
            setSubmitting(true);
            setError('');
            const complaintInfo = {
                contactName: booking.customerName,
                email: booking.customerEmail || `khachhang_${booking.customerPhone}@minicinema.com`,
                phone: booking.customerPhone,
                departmentId: department, // Có thể map với ID thật của Zoho Desk
                subject: `[Booking #${booking.bookingId}] ${subject}`,
                description: `Phim: ${booking.movieTitle}\nSuất chiếu: ${booking.date} - ${booking.time}\nPhòng: ${booking.room}\nGhế: ${booking.seats.join(', ')}\n\nNội dung:\n${description}`,
            };

            const result = await createComplaintTicketZoho(complaintInfo);
            setSubmittedData(result);
        } catch (err) {
            setError('Gửi khiếu nại thất bại. Vui lòng thử lại sau.');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="booking-complaint-modal">
            <div className="complaint-content">
                <div className="complaint-header">
                    <h2>Gửi Khiếu Nại / Hỗ Trợ</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                {submittedData ? (
                    <div className="submitted-message">
                        <div className="success-icon">✅</div>
                        <h3>Gửi thành công!</h3>
                        <div className="ticket-id">
                            Mã Ticket: <strong>{submittedData.ticketNumber || 'Đang cập nhật'}</strong>
                        </div>
                        <p>Chúng tôi sẽ phản hồi lại qua email trong thời gian sớm nhất.</p>
                        <div className="actions">
                            <button className="primary-btn" onClick={onClose}>Đóng</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="booking-info">
                            <h3>Thông tin vé</h3>
                            <p><strong>Phim:</strong> {booking.movieTitle}</p>
                            <p><strong>Mã đặt vé:</strong> #{booking.bookingId}</p>
                        </div>

                        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}

                        <form className="complaint-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Bộ phận hỗ trợ</label>
                                <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                                    <option value="Support">Hỗ trợ chung</option>
                                    <option value="Refund">Hoàn tiền / Hủy vé</option>
                                    <option value="Technical">Lỗi kỹ thuật</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Tiêu đề</label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Ví dụ: Xin hủy vé..."
                                    style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }}
                                />
                            </div>

                            <div className="form-group">
                                <label>Nội dung chi tiết</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Vui lòng mô tả chi tiết vấn đề của bạn..."
                                ></textarea>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="cancel-btn" onClick={onClose}>Hủy</button>
                                <button type="submit" className="submit-btn" disabled={submitting}>
                                    {submitting ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default BookingComplaint;

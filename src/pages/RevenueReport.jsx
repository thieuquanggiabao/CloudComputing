import React, { useState, useEffect } from 'react';
import '../styles/RevenueReport.css';

function RevenueReport() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ totalRevenue: 0, invoiceCount: 0, invoices: [] });

    const fetchReport = async () => {
        setLoading(true);
        try {
            // Fetch actual data from backend
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/zoho/revenue?start=${startDate}&end=${endDate}`);
            const result = await response.json();
            
            if (result.success) {
                setData(result.data);
            } else {
                throw new Error(result.message || "Lỗi tải báo cáo");
            }
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch revenue:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch initially
        fetchReport();
    }, []);

    const getStatusClass = (status) => {
        switch(status) {
            case 'paid': return 'status-paid';
            case 'sent': return 'status-sent';
            case 'draft': return 'status-draft';
            case 'open': return 'status-open';
            case 'overdue': return 'status-overdue';
            default: return '';
        }
    };

    const getStatusLabel = (status) => {
        switch(status) {
            case 'paid': return 'Đã thanh toán';
            case 'sent': return 'Đã gửi';
            case 'draft': return 'Bản nháp';
            case 'open': return 'Mở';
            case 'overdue': return 'Quá hạn';
            default: return status;
        }
    };

    return (
        <div className="revenue-report-container">
            <div className="report-header">
                <h2>Báo Cáo Doanh Thu (Zoho Books)</h2>
                <p>Theo dõi hóa đơn và tổng doanh thu đặt vé từ hệ thống Zoho.</p>
            </div>

            <div className="date-filter">
                <div className="date-inputs">
                    <div className="input-group">
                        <label>Từ ngày</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label>Đến ngày</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <button className="fetch-btn" onClick={fetchReport} disabled={loading}>
                        {loading ? 'Đang tải...' : 'Lọc Dữ Liệu'}
                    </button>
                </div>
            </div>

            <div className="summary-cards">
                <div className="card total-revenue">
                    <h3>Tổng doanh thu</h3>
                    <p className="amount">{data.totalRevenue.toLocaleString('vi-VN')}₫</p>
                </div>
                <div className="card invoice-count">
                    <h3>Số lượng hóa đơn</h3>
                    <p className="amount">{data.invoiceCount}</p>
                </div>
                <div className="card period">
                    <h3>Giai đoạn</h3>
                    <p className="amount">{startDate && endDate ? `${startDate} đến ${endDate}` : 'Tất cả thời gian'}</p>
                </div>
            </div>

            <div className="invoices-section">
                <h3>Danh sách hóa đơn</h3>
                {data.invoices.length > 0 ? (
                    <div className="invoices-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã HĐ</th>
                                    <th>Khách hàng</th>
                                    <th>Số tiền</th>
                                    <th>Ngày tạo</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.invoices.map(invoice => (
                                    <tr key={invoice.id}>
                                        <td className="invoice-id">{invoice.id}</td>
                                        <td>{invoice.customer}</td>
                                        <td className="amount">{invoice.amount.toLocaleString('vi-VN')}₫</td>
                                        <td>{invoice.date}</td>
                                        <td>
                                            <span className={`status-badge ${getStatusClass(invoice.status)}`}>
                                                {getStatusLabel(invoice.status)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="no-data">Không có dữ liệu hóa đơn trong thời gian này.</div>
                )}
            </div>
        </div>
    );
}

export default RevenueReport;

import React, { useState, useEffect } from 'react';
import '../styles/RevenueReport.css'; // Reusing some styles

function AdminAnalytics() {
    const [iframeUrl, setIframeUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lấy URL Iframe từ file .env
        const url = import.meta.env.VITE_ZOHO_ANALYTICS_URL;
        if (url) {
            setIframeUrl(url);
        }
        setLoading(false);
    }, []);

    return (
        <div className="revenue-report-container" style={{ height: 'calc(100vh - 40px)', display: 'flex', flexDirection: 'column' }}>
            <div className="report-header">
                <h2>📊 Phân Tích Dữ Liệu AI (Zoho Analytics)</h2>
                <p>Khám phá dự báo doanh thu, xu hướng khách hàng và hiệu suất phòng chiếu nhờ sức mạnh của AI và Big Data.</p>
            </div>

            <div style={{ flex: 1, backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {loading ? (
                    <div className="loading-spinner" />
                ) : iframeUrl ? (
                    <iframe
                        title="Zoho Analytics Dashboard"
                        src={iframeUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                        style={{ border: 'none', background: '#fff' }}
                    ></iframe>
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📉</div>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>Chưa cấu hình liên kết Zoho Analytics</h3>
                        <p style={{ maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
                            Để hiển thị biểu đồ phân tích tại đây, bạn cần dán đường link <strong>Iframe</strong> của Dashboard từ Zoho Analytics vào biến <code>VITE_ZOHO_ANALYTICS_URL</code> trong file <code>frontend/.env</code>.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminAnalytics;

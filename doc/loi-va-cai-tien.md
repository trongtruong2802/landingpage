# Danh sách Lỗi & Đề xuất Cải tiến Landing Page Đám cưới

Tài liệu này ghi nhận các lỗi kỹ thuật phát hiện được trong quá trình kiểm tra mã nguồn, các chỉnh sửa đã thực hiện, cùng các hướng dẫn/đề xuất cải tiến nhằm giúp sản phẩm hoàn hảo và đạt độ thuyết phục khách hàng cao nhất.

---

## I. Lỗi Kỹ Thuật Đã Phát Hiện & Đã Sửa

### 1. Bảng Lời Chúc (`WishesSection.tsx`) Trống Trơn Khi Chưa Liên Kết API
*   **Chi tiết lỗi:** Do một cập nhật trước đó, mã nguồn của component đã gỡ bỏ hoàn toàn việc sử dụng dữ liệu lời chúc mẫu (`sampleWishes`) lấy từ `wedding-data.ts`. Khi `WISHES_API_URL` không được định nghĩa hoặc gặp sự cố tải, danh sách lời chúc trả về rỗng `[]`, khiến bảng tin hiển thị trống trơn. Điều này làm giảm đáng kể tính thẩm mỹ khi khách hàng chạy thử giao diện lần đầu.
*   **Cách xử lý:** 
    *   Đã nhập lại `useMemo` và dữ liệu tĩnh `weddingData` từ tệp cấu hình.
    *   Cấu hình lại hàm `fetchWishes` để tự động chuyển sang hiển thị 4 lời chúc mẫu rất tình cảm trong `weddingData.sampleWishes` khi không có link API hoặc khi yêu cầu fetch bị lỗi/timeout.
    *   Đã chạy thử nghiệm trên trình duyệt ảo và xác nhận danh sách lời chúc mẫu hiện lên mượt mà với đầy đủ hiệu ứng bong bóng tin nhắn và màu sắc đại diện ngẫu nhiên.

---

## II. Các Điểm Quan Trọng Cần Cấu Hình Khi Bàn Giao

### 1. Thay Thế Liên Kết Google Sheets (Apps Script API)
Hiện tại hệ thống đang sử dụng đường dẫn mẫu để lưu trữ dữ liệu RSVP và lời chúc. Trước khi bàn giao cho khách hàng thực tế sử dụng, bạn cần thực hiện:
*   **RSVP (`RSVPSection.tsx`):** Thay thế biến `GOOGLE_SHEET_URL` ở dòng 16 bằng đường dẫn Apps Script Web App liên kết trực tiếp với Google Sheet của cặp đôi để quản lý danh sách khách mời tham gia.
*   **Lời Chúc (`WishesSection.tsx`):** Thay thế biến `WISHES_API_URL` ở dòng 10 bằng đường dẫn Apps Script tương ứng để ghi nhận và hiển thị lời chúc theo thời gian thực.
*   *Lưu ý:* Mã nguồn của tệp Google Apps Script mẫu đã được hướng dẫn chi tiết ở phần bình luận đầu mỗi file component để bạn dễ dàng triển khai.

### 2. Thay Thế Các Ảnh Tạm Thời (Placeholders)
Một số khu vực đang sử dụng ảnh tạm dạng định dạng đồ họa vector SVG:
*   Ảnh bìa cưới (`/images/cover/wedding-cover.svg`)
*   Ảnh hành trình tình yêu (`/images/story/story-placeholder.svg` cho cả 3 mốc sự kiện)
*   Ảnh trong album cưới (`/images/album/album-placeholder.svg` cho 4 ảnh cưới mẫu)
*   Ảnh chân dung Cô dâu & Chú rể (`/images/couple/groom.svg` và `/images/couple/bride.svg`)
*   *Yêu cầu:* Cần thay thế bằng các tệp ảnh thực tế định dạng `.jpg` hoặc `.png` đã qua tối ưu dung lượng (nén ảnh) để trang tải nhanh nhất và hiển thị chân thực, lung linh nhất.

---

## III. Các Đề Xuất Cải Tiến Để Đạt Mức Độ "Không Có Gì Để Chê"

Để biến Landing Page này thành một sản phẩm siêu cao cấp, không tì vết và khiến bất kỳ khách hàng khó tính nào cũng phải hài lòng, chúng tôi đề xuất bổ sung thêm các tính năng sau:

### 1. Cải Tiến Danh Sách Nhạc Nền (Audio Playlist)
*   **Hiện trạng:** Trình phát nhạc hiện tại phát 1 bài hát duy nhất từ liên kết tĩnh.
*   **Cải tiến đề xuất:** Bổ sung danh sách gồm 3 bài hát cưới phổ biến (ví dụ: *Beautiful in White*, *Perfect*, *Until I Found You*). Khách mời có thể click vào trình phát nhạc để chuyển tiếp (Next) sang bài hát họ thích nghe nhất khi đang xem thiệp cưới.

### 2. Tối Ưu Hóa Xem Ảnh Gallery (Lightbox Touch Gestures)
*   **Hiện trạng:** Trình xem ảnh phóng to (Lightbox) hoạt động tốt trên máy tính (hỗ trợ click chuột và phím Escape để đóng).
*   **Cải tiến đề xuất:** Bổ sung tính năng vuốt (Swipe Left / Swipe Right) bằng tay trên điện thoại di động để chuyển ảnh trong album. Điều này giúp nâng cao trải nghiệm tự nhiên cho người dùng smartphone.

### 3. Tối Ưu Hóa Chia Sẻ Liên Kết (SEO & Open Graph Metadata)
*   **Đề xuất:** Cấu hình lại các thẻ Open Graph trong `src/app/layout.tsx` hoặc `src/app/page.tsx` bao gồm tiêu đề, mô tả đám cưới hấp dẫn và đặc biệt là hình ảnh xem trước (`og:image`). 
*   **Hiệu quả:** Khi chú rể cô dâu gửi link thiệp qua Messenger, Zalo hoặc Facebook, tin nhắn sẽ tự động hiển thị một ô xem trước cực kỳ đẹp mắt với ảnh cưới đại diện và thông tin thiệp mời, gia tăng tính chuyên nghiệp.

---

*Tài liệu hướng dẫn phát triển và tối ưu sản phẩm.*

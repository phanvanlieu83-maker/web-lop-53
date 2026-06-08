// ===============================
// SCRIPT WEBSITE LỚP 5/3 - PHIÊN BẢN 3.0
// Giữ phần trò chơi, phụ huynh cũ nếu đã có trong file trước.
// Phần dưới chuyên đọc dữ liệu Supabase Database.
// ===============================

function layIconTaiLieu(tenFile) {
  const lower = (tenFile || "").toLowerCase();
  if (lower.includes(".pdf")) return "📕";
  if (lower.includes(".doc")) return "📘";
  if (lower.includes(".xls")) return "📗";
  if (lower.includes(".ppt")) return "📙";
  if (lower.includes(".jpg") || lower.includes(".jpeg") || lower.includes(".png")) return "🖼️";
  return "📄";
}

function dinhDangNgay(ngay) {
  if (!ngay) return "";
  const d = new Date(ngay);
  if (isNaN(d.getTime())) return ngay;
  return d.toLocaleDateString("vi-VN");
}

async function taiThongBaoV3() {
  const khuVuc = document.getElementById("danhSachThongBao");
  if (!khuVuc || typeof supabaseClient === "undefined") return;

  const { data, error } = await supabaseClient
    .from("thong_bao")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    khuVuc.innerHTML = "<p>Chưa tải được thông báo.</p>";
    return;
  }

  if (!data || data.length === 0) {
    khuVuc.innerHTML = "<p>Chưa có thông báo mới.</p>";
    return;
  }

  let html = "";
  data.forEach(tb => {
    html += `
      <div class="notice-card">
        <div class="notice-date">📅 ${dinhDangNgay(tb.created_at)} | Năm học: ${tb.namhoc || ""}</div>
        <h3>📢 ${tb.tieude || "Thông báo"}</h3>
        ${tb.noidung ? `<p>${tb.noidung}</p>` : ""}
        ${tb.fileurl ? `<a class="year-btn" href="${tb.fileurl}" target="_blank">Xem / Tải</a>` : ""}
      </div>
    `;
  });
  khuVuc.innerHTML = html;
}

async function taiLichHocV3() {
  const khuVuc = document.getElementById("danhSachLichHoc") || document.getElementById("lichhoc");
  if (!khuVuc || typeof supabaseClient === "undefined") return;

  const { data, error } = await supabaseClient
    .from("lich_hoc")
    .select("*")
    .order("ngay", { ascending: true });

  if (error || !data || data.length === 0) {
    const target = document.getElementById("danhSachLichHoc");
    if (target) target.innerHTML = "<p>Chưa có lịch học hoặc lịch kiểm tra mới.</p>";
    return;
  }

  let html = `
    <table class="result-table">
      <tr><th>Ngày</th><th>Nội dung</th><th>Ghi chú</th></tr>
  `;
  data.forEach(item => {
    html += `
      <tr>
        <td>${dinhDangNgay(item.ngay)}</td>
        <td><b>${item.tieude || ""}</b></td>
        <td>${item.noidung || ""}</td>
      </tr>
    `;
  });
  html += "</table>";

  let target = document.getElementById("danhSachLichHoc");
  if (target) target.innerHTML = html;
}

async function taiTaiLieuV3() {
  const khuVuc = document.getElementById("danhSachTaiLieu");
  if (!khuVuc || typeof supabaseClient === "undefined") return;

  const { data, error } = await supabaseClient
    .from("tai_lieu")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    khuVuc.innerHTML = "<p>Chưa có tài liệu nào.</p>";
    return;
  }

  let html = '<div class="tai-lieu-list">';
  data.forEach(file => {
    html += `
      <div class="tai-lieu-item">
        <span>${layIconTaiLieu(file.fileurl)} ${file.tieude || "Tài liệu"}</span>
        <a href="${file.fileurl}" target="_blank">Xem / Tải</a>
      </div>
    `;
  });
  html += "</div>";
  khuVuc.innerHTML = html;
}

async function taiThuVienAnhV3() {
  const khuVuc = document.getElementById("danhSachAnh") || document.getElementById("thuvienAnhNoiDung");
  if (!khuVuc || typeof supabaseClient === "undefined") return;

  const { data, error } = await supabaseClient
    .from("thu_vien_anh")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    khuVuc.innerHTML = "<p>Chưa có hình ảnh nào.</p>";
    return;
  }

  let html = '<div class="gallery-grid">';
  data.forEach(img => {
    html += `
      <div class="gallery-card">
        <a href="${img.imageurl}" target="_blank">
          <img src="${img.imageurl}" alt="${img.tieude || "Ảnh hoạt động"}">
        </a>
        <p><b>${img.tieude || "Ảnh hoạt động"}</b></p>
        <small>${img.namhoc || ""}</small>
      </div>
    `;
  });
  html += "</div>";
  khuVuc.innerHTML = html;
}

async function taiVideoV3() {
  const khuVuc = document.getElementById("danhSachVideo");
  if (!khuVuc || typeof supabaseClient === "undefined") return;

  const { data, error } = await supabaseClient
    .from("video_lop")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    khuVuc.innerHTML = "<p>Chưa có video nào.</p>";
    return;
  }

  let html = '<div class="tai-lieu-list">';
  data.forEach(video => {
    html += `
      <div class="tai-lieu-item">
        <span>🎬 ${video.tieude || "Video hoạt động"}</span>
        <a href="${video.videourl}" target="_blank">Xem video</a>
      </div>
    `;
  });
  html += "</div>";
  khuVuc.innerHTML = html;
}

async function taiNamHocV3() {
  const khuVuc = document.getElementById("dsNamHoc");
  if (!khuVuc || typeof supabaseClient === "undefined") return;

  const macDinh = [
    { lop: "5/3", namhoc: "2025-2026", mota: "Lớp 5/3 - Năm học 2025 - 2026", trangthai: "Năm học hiện tại" },
    { lop: "3/1", namhoc: "2024-2025", mota: "Lớp 3/1 - Năm học 2024 - 2025", trangthai: "Đã lưu trữ" },
    { lop: "5/2", namhoc: "2023-2024", mota: "Lớp 5/2 - Năm học 2023 - 2024", trangthai: "Đã lưu trữ" },
    { lop: "5/2", namhoc: "2022-2023", mota: "Lớp 5/2 - Năm học 2022 - 2023", trangthai: "Đã lưu trữ" },
    { lop: "5/1", namhoc: "2021-2022", mota: "Lớp 5/1 - Năm học 2021 - 2022", trangthai: "Đã lưu trữ" }
  ];

  let { data } = await supabaseClient.from("nam_hoc").select("*").order("created_at", { ascending: false });
  if (!data || data.length === 0) data = macDinh;

  let html = "";
  data.forEach(item => {
    html += `
      <div class="year-card">
        <h3>${item.mota || item.lop || "Năm học"}</h3>
        <p><b>Lớp:</b> ${item.lop || ""}</p>
        <p><b>Năm học:</b> ${item.namhoc || ""}</p>
        <p><b>Trạng thái:</b> ${item.trangthai || "Đã lưu trữ"}</p>
        <a class="year-btn" href="#thuvien">Xem hình ảnh</a>
      </div>
    `;
  });
  khuVuc.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
  taiThongBaoV3();
  taiLichHocV3();
  taiTaiLieuV3();
  taiThuVienAnhV3();
  taiVideoV3();
  taiNamHocV3();
});

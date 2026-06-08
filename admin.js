// ===============================
// QUẢN TRỊ NỘI DUNG SUPABASE
// ===============================
// Mật khẩu quản trị. Có thể đổi tại đây.
const ADMIN_PASSWORD = "lop53@2026";

const DANH_MUC_NOI_DUNG = {
  thongbao: {
    ten: "Thông báo mới",
    icon: "📢",
    thuMuc: "thongbao"
  },
  lichhoc: {
    ten: "Lịch học - Lịch kiểm tra",
    icon: "📅",
    thuMuc: "lichhoc"
  },
  tailieu: {
    ten: "Kho tài liệu lớp 5/3",
    icon: "📚",
    thuMuc: "tailieu"
  },
  thuvienanh: {
    ten: "Thư viện ảnh hoạt động lớp",
    icon: "🖼️",
    thuMuc: "thuvienanh"
  }
};

function dangNhapAdmin() {
  const pass = document.getElementById("adminPassword").value.trim();
  const msg = document.getElementById("adminLoginMsg");

  if (pass === ADMIN_PASSWORD) {
    sessionStorage.setItem("adminDaDangNhap", "true");
    document.getElementById("adminLoginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    taiDanhSachNoiDungAdmin();
  } else {
    msg.innerHTML = "<span style='color:red;font-weight:bold;'>Sai mật khẩu quản trị.</span>";
  }
}

window.addEventListener("DOMContentLoaded", function () {
  if (sessionStorage.getItem("adminDaDangNhap") === "true") {
    const loginBox = document.getElementById("adminLoginBox");
    const adminPanel = document.getElementById("adminPanel");
    if (loginBox && adminPanel) {
      loginBox.style.display = "none";
      adminPanel.style.display = "block";
      taiDanhSachNoiDungAdmin();
    }
  }
});

function lamSachTenFile(ten) {
  return ten
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9.\-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function lamSlugTieuDe(text) {
  return lamSachTenFile(text || "noi-dung")
    .replace(/\.[^.]+$/, "")
    .substring(0, 80);
}

function layIconFile(tenFile) {
  const lower = tenFile.toLowerCase();
  if (lower.endsWith(".pdf")) return "📕";
  if (lower.endsWith(".doc") || lower.endsWith(".docx")) return "📘";
  if (lower.endsWith(".xls") || lower.endsWith(".xlsx")) return "📗";
  if (lower.endsWith(".ppt") || lower.endsWith(".pptx")) return "📙";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".png") || lower.endsWith(".webp")) return "🖼️";
  return "📄";
}

function layTenHienThi(duongDanHoacTenFile) {
  const tenFile = duongDanHoacTenFile.split("/").pop();
  // Dạng file: 1780000000000_Tieu-De__ten-file.pdf
  const boThoiGian = tenFile.replace(/^\d+_/, "");
  const phanTieuDe = boThoiGian.split("__")[0] || boThoiGian;
  return phanTieuDe.replace(/-/g, " ");
}

async function uploadNoiDung() {
  const input = document.getElementById("fileTaiLieu");
  const status = document.getElementById("uploadStatus");
  const tieuDe = document.getElementById("tieuDeNoiDung").value.trim();
  const loai = document.getElementById("loaiNoiDung").value;
  const danhMuc = DANH_MUC_NOI_DUNG[loai];

  if (!danhMuc) {
    status.innerHTML = "<span style='color:red;'>Vui lòng chọn mục hiển thị.</span>";
    return;
  }

  if (!tieuDe) {
    status.innerHTML = "<span style='color:red;'>Vui lòng nhập tiêu đề hiển thị.</span>";
    return;
  }

  if (!input.files || input.files.length === 0) {
    status.innerHTML = "<span style='color:red;'>Vui lòng chọn file.</span>";
    return;
  }

  const file = input.files[0];
  const tenFileGoc = lamSachTenFile(file.name);
  const slugTieuDe = lamSlugTieuDe(tieuDe);
  const tenFile = `${danhMuc.thuMuc}/${Date.now()}_${slugTieuDe}__${tenFileGoc}`;

  status.innerHTML = "Đang tải file lên...";

  const { error } = await supabaseClient.storage
    .from(SUPABASE_BUCKET)
    .upload(tenFile, file, {
      cacheControl: "3600",
      upsert: false
    });

  if (error) {
    status.innerHTML = "<span style='color:red;font-weight:bold;'>Lỗi: " + error.message + "</span>";
    return;
  }

  status.innerHTML = `<span style='color:green;font-weight:bold;'>✅ Đã đăng vào mục ${danhMuc.ten}!</span>`;
  input.value = "";
  document.getElementById("tieuDeNoiDung").value = "";
  document.getElementById("boLocDanhSach").value = loai;
  taiDanhSachNoiDungAdmin();
}

async function layFileTheoDanhMuc(loai) {
  const danhMuc = DANH_MUC_NOI_DUNG[loai];
  if (!danhMuc) return [];

  const { data, error } = await supabaseClient.storage
    .from(SUPABASE_BUCKET)
    .list(danhMuc.thuMuc, {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" }
    });

  if (error) throw error;

  return (data || [])
    .filter(file => file.name && file.name !== ".emptyFolderPlaceholder")
    .map(file => ({
      ...file,
      loai,
      thuMuc: danhMuc.thuMuc,
      duongDan: `${danhMuc.thuMuc}/${file.name}`
    }));
}

async function taiDanhSachNoiDungAdmin() {
  const khuVuc = document.getElementById("adminDanhSachTaiLieu");
  if (!khuVuc) return;

  khuVuc.innerHTML = "Đang tải danh sách...";
  const boLoc = document.getElementById("boLocDanhSach")?.value || "tatca";

  try {
    let danhSach = [];

    if (boLoc === "tatca") {
      for (const loai of Object.keys(DANH_MUC_NOI_DUNG)) {
        const files = await layFileTheoDanhMuc(loai);
        danhSach = danhSach.concat(files);
      }
      danhSach.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
    } else {
      danhSach = await layFileTheoDanhMuc(boLoc);
    }

    if (!danhSach.length) {
      khuVuc.innerHTML = "<p>Chưa có nội dung nào.</p>";
      return;
    }

    let html = '<div class="tai-lieu-list">';

    danhSach.forEach(function(file) {
      const danhMuc = DANH_MUC_NOI_DUNG[file.loai];
      const publicUrl = supabaseClient.storage
        .from(SUPABASE_BUCKET)
        .getPublicUrl(file.duongDan)
        .data.publicUrl;

      const tenHienThi = layTenHienThi(file.name);

      html += `
        <div class="tai-lieu-item">
          <span>${danhMuc.icon} <b>${danhMuc.ten}:</b> ${layIconFile(file.name)} ${tenHienThi}</span>
          <div class="file-actions">
            <a href="${publicUrl}" target="_blank">Xem</a>
            <button class="delete-file-btn" onclick="xoaNoiDung('${file.duongDan.replace(/'/g, "\\'")}')">Xóa</button>
          </div>
        </div>
      `;
    });

    html += "</div>";
    khuVuc.innerHTML = html;
  } catch (error) {
    khuVuc.innerHTML = "<p style='color:red;'>Không tải được danh sách: " + error.message + "</p>";
  }
}

async function xoaNoiDung(duongDan) {
  if (!confirm("Bạn có chắc muốn xóa nội dung này không?")) return;

  const { error } = await supabaseClient.storage
    .from(SUPABASE_BUCKET)
    .remove([duongDan]);

  if (error) {
    alert("Không xóa được file: " + error.message);
    return;
  }

  taiDanhSachNoiDungAdmin();
}

// Giữ tên hàm cũ để tránh lỗi nếu HTML cũ còn gọi uploadTaiLieu().
function uploadTaiLieu() {
  uploadNoiDung();
}

function taiDanhSachTaiLieuAdmin() {
  taiDanhSachNoiDungAdmin();
}

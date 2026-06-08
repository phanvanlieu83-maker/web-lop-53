// Mật khẩu quản trị đơn giản cho trang admin.
// Bạn có thể đổi mật khẩu tại đây.
const ADMIN_PASSWORD = "lop53@2026";

function dangNhapAdmin() {
  const pass = document.getElementById("adminPassword").value.trim();
  const msg = document.getElementById("adminLoginMsg");

  if (pass === ADMIN_PASSWORD) {
    document.getElementById("adminLoginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    taiDanhSachTaiLieuAdmin();
  } else {
    msg.innerHTML = "<span style='color:red;font-weight:bold;'>Sai mật khẩu quản trị.</span>";
  }
}

function lamSachTenFile(ten) {
  return ten
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");
}

async function uploadTaiLieu() {
  const input = document.getElementById("fileTaiLieu");
  const status = document.getElementById("uploadStatus");

  if (!input.files || input.files.length === 0) {
    status.innerHTML = "<span style='color:red;'>Vui lòng chọn file.</span>";
    return;
  }

  const file = input.files[0];
  const tenFile = Date.now() + "_" + lamSachTenFile(file.name);

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

  status.innerHTML = "<span style='color:green;font-weight:bold;'>✅ Upload thành công!</span>";
  input.value = "";
  taiDanhSachTaiLieuAdmin();
}

function layIconFile(tenFile) {
  const lower = tenFile.toLowerCase();
  if (lower.endsWith(".pdf")) return "📕";
  if (lower.endsWith(".doc") || lower.endsWith(".docx")) return "📘";
  if (lower.endsWith(".xls") || lower.endsWith(".xlsx")) return "📗";
  if (lower.endsWith(".ppt") || lower.endsWith(".pptx")) return "📙";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".png")) return "🖼️";
  return "📄";
}

async function taiDanhSachTaiLieuAdmin() {
  const khuVuc = document.getElementById("adminDanhSachTaiLieu");
  khuVuc.innerHTML = "Đang tải danh sách...";

  const { data, error } = await supabaseClient.storage
    .from(SUPABASE_BUCKET)
    .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });

  if (error) {
    khuVuc.innerHTML = "<p style='color:red;'>Không tải được danh sách: " + error.message + "</p>";
    return;
  }

  if (!data || data.length === 0) {
    khuVuc.innerHTML = "<p>Chưa có tài liệu nào.</p>";
    return;
  }

  let html = '<div class="tai-lieu-list">';

  data.forEach(function(file) {
   const publicUrl = supabaseClient.storage
    .from(SUPABASE_BUCKET)
    .getPublicUrl(file.name)
    .data.publicUrl;

console.log("Bucket:", SUPABASE_BUCKET);
console.log("File:", file.name);
console.log("URL:", publicUrl);

const tenHienThi = file.name.replace(/^\d+_/, "");
    html += `
      <div class="tai-lieu-item">
        <span>${layIconFile(file.name)} ${tenHienThi}</span>
        <div class="file-actions">
          <a href="${publicUrl}" target="_blank">Xem</a>
          <button class="delete-file-btn" onclick="xoaTaiLieu('${file.name}')">Xóa</button>
        </div>
      </div>
    `;
  });

  html += "</div>";
  khuVuc.innerHTML = html;
}

async function xoaTaiLieu(tenFile) {
  if (!confirm("Bạn có chắc muốn xóa tài liệu này không?")) return;

  const { error } = await supabaseClient.storage
    .from(SUPABASE_BUCKET)
    .remove([tenFile]);

  if (error) {
    alert("Không xóa được file: " + error.message);
    return;
  }

  taiDanhSachTaiLieuAdmin();
}

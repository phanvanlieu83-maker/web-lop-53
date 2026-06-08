// ===============================
// ADMIN 3.0 - SUPABASE DATABASE + STORAGE
// ===============================
const ADMIN_PASSWORD = "lop53@2026";
let moduleDangChon = "thong_bao";

const cauHinhModule = {
  thong_bao: { ten: "📢 Đăng thông báo", bang: "thong_bao", file: true, noidung: true, ngay: false, video: false },
  lich_hoc: { ten: "📅 Đăng lịch học - lịch kiểm tra", bang: "lich_hoc", file: false, noidung: true, ngay: true, video: false },
  tai_lieu: { ten: "📚 Đăng tài liệu", bang: "tai_lieu", file: true, noidung: false, ngay: false, video: false },
  thu_vien_anh: { ten: "🖼️ Đăng ảnh hoạt động", bang: "thu_vien_anh", file: true, noidung: false, ngay: false, video: false },
  video_lop: { ten: "🎬 Đăng video hoạt động", bang: "video_lop", file: false, noidung: false, ngay: false, video: true },
  nam_hoc: { ten: "🏫 Thêm năm học lưu trữ", bang: "nam_hoc", file: false, noidung: true, ngay: false, video: false }
};

function dangNhapAdmin() {
  const pass = document.getElementById("adminPassword").value.trim();
  const msg = document.getElementById("adminLoginMsg");

  if (pass === ADMIN_PASSWORD) {
    document.getElementById("adminLoginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    chonModule("thong_bao");
  } else {
    msg.innerHTML = "<span style='color:red;font-weight:bold;'>Sai mật khẩu quản trị.</span>";
  }
}

function chonModule(module) {
  moduleDangChon = module;
  const cfg = cauHinhModule[module];
  document.getElementById("moduleTitle").innerHTML = cfg.ten;
  document.getElementById("boLocModule").value = module;
  document.getElementById("noiDungBox").style.display = cfg.noidung ? "block" : "none";
  document.getElementById("ngayBox").style.display = cfg.ngay ? "block" : "none";
  document.getElementById("fileBox").style.display = cfg.file ? "block" : "none";
  document.getElementById("videoUrlBox").style.display = cfg.video ? "block" : "none";

  if (module === "nam_hoc") {
    document.getElementById("tieuDe").placeholder = "Ví dụ: Lớp 3/1 - Năm học 2024 - 2025";
    document.getElementById("noiDung").placeholder = "Nhập mô tả hoặc trạng thái năm học...";
  } else {
    document.getElementById("tieuDe").placeholder = "Nhập tiêu đề hiển thị";
  }

  taiDanhSachAdmin();
}

function lamSachTenFile(ten) {
  return ten
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");
}

async function uploadFileNeuCo(prefix) {
  const input = document.getElementById("fileUpload");
  if (!input.files || input.files.length === 0) return "";

 const urls = [];

for (const file of input.files) {
  const path = prefix + "/" + Date.now() + "_" + lamSachTenFile(file.name);

  const { error } = await supabaseClient.storage
    .from(SUPABASE_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw error;

  const publicUrl = supabaseClient.storage
    .from(SUPABASE_BUCKET)
    .getPublicUrl(path)
    .data.publicUrl;

  urls.push(publicUrl);
}

return urls.join("|");
}

async function luuNoiDung() {
  const status = document.getElementById("adminStatus");
  const tieude = document.getElementById("tieuDe").value.trim();
  const noidung = document.getElementById("noiDung").value.trim();
  const namhoc = document.getElementById("namHoc").value;
  const ngay = document.getElementById("ngayHoc").value;
  const videoUrl = document.getElementById("videoUrl").value.trim();

  if (!tieude) {
    status.innerHTML = "<span style='color:red;'>Vui lòng nhập tiêu đề.</span>";
    return;
  }

  status.innerHTML = "Đang lưu nội dung...";

  try {
    let fileUrl = "";
    const cfg = cauHinhModule[moduleDangChon];

    if (cfg.file) {
      fileUrl = await uploadFileNeuCo(moduleDangChon);
    }

    let duLieu = {};

    if (moduleDangChon === "thong_bao") {
      duLieu = { tieude, noidung, fileurl: fileUrl, namhoc };
    }

    if (moduleDangChon === "lich_hoc") {
      duLieu = { tieude, noidung, ngay: ngay || null, namhoc };
    }

    if (moduleDangChon === "tai_lieu") {
      duLieu = { tieude, fileurl: fileUrl, namhoc };
    }

    if (moduleDangChon === "thu_vien_anh") {
      duLieu = { tieude, imageurl: fileUrl, namhoc };
    }

    if (moduleDangChon === "video_lop") {
      duLieu = { tieude, videourl: videoUrl, namhoc };
    }

    if (moduleDangChon === "nam_hoc") {
      duLieu = { lop: tieude, namhoc, mota: noidung, trangthai: noidung || "Đã lưu trữ" };
    }

    const { error } = await supabaseClient
      .from(cfg.bang)
      .insert([duLieu]);

    if (error) throw error;

    status.innerHTML = "<span style='color:green;font-weight:bold;'>✅ Đã lưu thành công!</span>";
    lamMoiForm();
    taiDanhSachAdmin();
  } catch (err) {
    status.innerHTML = "<span style='color:red;font-weight:bold;'>Lỗi: " + err.message + "</span>";
  }
}

function lamMoiForm() {
  document.getElementById("tieuDe").value = "";
  document.getElementById("noiDung").value = "";
  document.getElementById("ngayHoc").value = "";
  document.getElementById("videoUrl").value = "";
  document.getElementById("fileUpload").value = "";
}

async function taiDanhSachAdmin() {
  const khuVuc = document.getElementById("adminDanhSach");
  if (!khuVuc) return;

  const module = document.getElementById("boLocModule").value || moduleDangChon;
  const bang = cauHinhModule[module].bang;
  khuVuc.innerHTML = "Đang tải danh sách...";

  const { data, error } = await supabaseClient
    .from(bang)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    khuVuc.innerHTML = "<p style='color:red;'>Không tải được dữ liệu: " + error.message + "</p>";
    return;
  }

  if (!data || data.length === 0) {
    khuVuc.innerHTML = "<p>Chưa có nội dung nào.</p>";
    return;
  }

  let html = '<div class="tai-lieu-list">';

  data.forEach(item => {
    const tieuDe = item.tieude || item.lop || "Không có tiêu đề";
    const phu = item.noidung || item.mota || item.trangthai || item.ngay || item.namhoc || "";
    const link = item.fileurl || item.imageurl || item.videourl || "";

    html += `
      <div class="tai-lieu-item">
        <div>
          <b>${tieuDe}</b><br>
          <small>${phu}</small><br>
          <small>Năm học: ${item.namhoc || ""}</small>
        </div>
        <div class="file-actions">
          ${link ? `<a href="${link}" target="_blank">Xem</a>` : ""}
          <button class="delete-file-btn" onclick="xoaBanGhi('${bang}', ${item.id})">Xóa</button>
        </div>
      </div>
    `;
  });

  html += "</div>";
  khuVuc.innerHTML = html;
}

async function xoaBanGhi(bang, id) {
  if (!confirm("Bạn có chắc muốn xóa nội dung này không?")) return;

  const { error } = await supabaseClient
    .from(bang)
    .delete()
    .eq("id", id);

  if (error) {
    alert("Không xóa được: " + error.message);
    return;
  }

  taiDanhSachAdmin();
}

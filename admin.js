// ADMIN 4.0 - Website lớp 5/3
// Cần có supabase-config.js chứa supabaseClient và SUPABASE_BUCKET = "tailieu"

let loaiDangChon = "thong_bao";
let dangXemThungRac = false;
const ADMIN_USER = "admin";
const ADMIN_PASS = "ngoquyen53";

const cauHinh = {
  thong_bao: { icon: "📢", ten: "Thông báo", bang: "thong_bao", cotFile: "fileurl" },
  lich_hoc: { icon: "📅", ten: "Lịch học", bang: "lich_hoc", cotFile: null },
  tai_lieu: { icon: "📚", ten: "Tài liệu", bang: "tai_lieu", cotFile: "fileurl" },
  thu_vien_anh: { icon: "🖼️", ten: "Thư viện ảnh", bang: "thu_vien_anh", cotFile: "imageurl" },
  video_lop: { icon: "🎬", ten: "Video", bang: "video_lop", cotFile: "videourl" },
  nam_hoc: { icon: "🏫", ten: "Năm học", bang: "nam_hoc", cotFile: null }
};

function $(id){ return document.getElementById(id); }

function dangNhapAdmin(){
  const u = $("adminUser").value.trim();
  const p = $("adminPass").value.trim();
  if(u === ADMIN_USER && p === ADMIN_PASS){
    localStorage.setItem("admin_lop53", "ok");
    hienAdmin();
  } else {
    $("loginStatus").innerHTML = "Sai tài khoản hoặc mật khẩu.";
    $("loginStatus").style.color = "red";
  }
}

function dangXuatAdmin(){
  localStorage.removeItem("admin_lop53");
  location.reload();
}

function hienAdmin(){
  $("loginBox").classList.add("hidden");
  $("adminMain").classList.remove("hidden");
  chonLoai("thong_bao");
  taiDashboard();
}

function lamSachTenFile(name){
  return (name || "file")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g,"d").replace(/Đ/g,"D")
    .replace(/[^a-zA-Z0-9._-]/g, "-");
}

function anHien(id, show){ const el=$(id); if(el) el.style.display = show ? "block" : "none"; }

function chonLoai(loai){
  loaiDangChon = loai;
  dangXemThungRac = false;
  Object.keys(cauHinh).forEach(k => { const t = $("tab_"+k); if(t) t.classList.toggle("active", k===loai); });
  const trash = $("tab_trash"); if(trash) trash.classList.remove("active");
  $("locLoai").value = loai;
  $("formTitle").innerText = cauHinh[loai].icon + " Đăng " + cauHinh[loai].ten;
  lamMoiForm(false);
  capNhatFormTheoLoai();
  taiDanhSachAdmin();
}

function capNhatFormTheoLoai(){
  anHien("noiDungWrap", ["thong_bao","lich_hoc"].includes(loaiDangChon));
  anHien("ngayWrap", loaiDangChon === "lich_hoc");
  anHien("albumWrap", loaiDangChon === "thu_vien_anh");
  anHien("lopWrap", loaiDangChon === "nam_hoc");
  anHien("trangThaiWrap", loaiDangChon === "nam_hoc");
  anHien("fileWrap", ["thong_bao","tai_lieu","thu_vien_anh"].includes(loaiDangChon));
  anHien("videoWrap", loaiDangChon === "video_lop");
}

function lamMoiForm(clearStatus=true){
  ["editingId","tieuDe","noiDung","ngay","album","lop","trangThai","videoUrl"].forEach(id => { if($(id)) $(id).value = ""; });
  if($("fileUpload")) $("fileUpload").value = "";
  if(clearStatus) $("adminStatus").innerHTML = "";
}

async function uploadMotFile(file, prefix){
  const path = prefix + "/" + Date.now() + "_" + Math.random().toString(36).slice(2,8) + "_" + lamSachTenFile(file.name);
  const { error } = await supabaseClient.storage.from(SUPABASE_BUCKET).upload(path, file, { cacheControl:"3600", upsert:false });
  if(error) throw error;
  return supabaseClient.storage.from(SUPABASE_BUCKET).getPublicUrl(path).data.publicUrl;
}

async function uploadNhieuFile(prefix){
  const input = $("fileUpload");
  if(!input || !input.files || input.files.length === 0) return [];
  const urls = [];
  for(const file of input.files){
    urls.push(await uploadMotFile(file, prefix));
  }
  return urls;
}

async function luuNoiDung(){
  const status = $("adminStatus");
  status.style.color = "#005f3b";
  status.innerHTML = "Đang lưu...";
  try{
    const loai = loaiDangChon;
    const editId = $("editingId").value;
    const tieude = $("tieuDe").value.trim();
    const noidung = $("noiDung").value.trim();
    const namhoc = $("namHoc").value;
    if(!tieude){ status.style.color="red"; status.innerHTML="Vui lòng nhập tiêu đề."; return; }

    let payload = {};

    if(loai === "thong_bao"){
      const urls = await uploadNhieuFile("thongbao");
      payload = { tieude, noidung, namhoc };
      if(urls[0]) payload.fileurl = urls[0];
    }

    if(loai === "lich_hoc"){
      payload = { tieude, noidung, ngay: $("ngay").value || null, namhoc };
    }

    if(loai === "tai_lieu"){
      const urls = await uploadNhieuFile("tailieu");
      if(!editId && urls.length === 0){ status.style.color="red"; status.innerHTML="Vui lòng chọn file tài liệu."; return; }
      payload = { tieude, namhoc };
      if(urls[0]) payload.fileurl = urls[0];
    }

    if(loai === "thu_vien_anh"){
      const urls = await uploadNhieuFile("hinhanh/" + namhoc);
      if(editId){
        payload = { tieude, namhoc };
        if($("album").value.trim()) payload.album = $("album").value.trim();
        if(urls[0]) payload.imageurl = urls[0];
      } else {
        if(urls.length === 0){ status.style.color="red"; status.innerHTML="Vui lòng chọn ảnh."; return; }
        for(let i=0;i<urls.length;i++){
          const row = { tieude: urls.length > 1 ? `${tieude} (${i+1})` : tieude, imageurl: urls[i], namhoc };
          if($("album").value.trim()) row.album = $("album").value.trim();
          const { error } = await supabaseClient.from("thu_vien_anh").insert(row);
          if(error) throw error;
        }
        status.innerHTML = "Đã lưu " + urls.length + " ảnh thành công.";
        lamMoiForm(false); await taiDashboard(); await taiDanhSachAdmin(); return;
      }
    }

    if(loai === "video_lop"){
      payload = { tieude, videourl: $("videoUrl").value.trim(), namhoc };
    }

    if(loai === "nam_hoc"){
      payload = { lop: $("lop").value.trim(), namhoc, mota: tieude, trangthai: $("trangThai").value.trim() || "Đã lưu trữ" };
    }

    const bang = cauHinh[loai].bang;
    let result;
    if(editId){ result = await supabaseClient.from(bang).update(payload).eq("id", editId); }
    else { result = await supabaseClient.from(bang).insert(payload); }
    if(result.error) throw result.error;

    status.innerHTML = editId ? "Cập nhật thành công." : "Lưu thành công.";
    lamMoiForm(false);
    await taiDashboard(); await taiDanhSachAdmin();
  }catch(err){
    status.style.color = "red";
    status.innerHTML = "Lỗi: " + err.message;
  }
}

async function taiDashboard(){
  const box = $("dashboard");
  if(!box) return;
  let html = "";
  for(const key of Object.keys(cauHinh)){
    const c = cauHinh[key];
    const { count } = await supabaseClient.from(c.bang).select("*", { count:"exact", head:true }).eq("is_deleted", false);
    html += `<div class="stat-card">${c.icon} ${c.ten}: ${count || 0}</div>`;
  }
  box.innerHTML = html;
}

function tieuDeItem(loai, item){
  if(loai === "nam_hoc") return item.mota || (item.lop + " - " + item.namhoc);
  return item.tieude || "Không có tiêu đề";
}

function linkItem(loai, item){
  if(loai === "thong_bao") return item.fileurl;
  if(loai === "tai_lieu") return item.fileurl;
  if(loai === "thu_vien_anh") return item.imageurl;
  if(loai === "video_lop") return item.videourl;
  return "";
}

async function taiDanhSachAdmin(){
  const loai = $("locLoai").value || loaiDangChon;
  loaiDangChon = loai;
  const bang = cauHinh[loai].bang;
  const { data, error } = await supabaseClient.from(bang).select("*").eq("is_deleted", dangXemThungRac).order("created_at", { ascending:false });
  const list = $("adminList");
  if(error){ list.innerHTML = `<p style="color:red">${error.message}</p>`; return; }
  if(!data || data.length === 0){ list.innerHTML = dangXemThungRac ? "<p>Thùng rác đang trống.</p>" : "<p>Chưa có nội dung.</p>"; return; }
  let html = "";
  data.forEach(item => {
    const link = linkItem(loai, item);
    const img = loai === "thu_vien_anh" && link ? `<img class="preview-img" src="${link}">` : "";
    html += `<div class="list-item">
      <div>${img}<b>${cauHinh[loai].icon} ${tieuDeItem(loai,item)}</b><br><span class="muted">${item.namhoc || ""} ${item.album ? " | Album: " + item.album : ""}</span></div>
      <div class="list-actions">
        ${link ? `<button class="view" onclick="window.open('${link}','_blank')">Xem</button>` : ""}
        ${dangXemThungRac ? `
          <button class="restore" onclick="khoiPhuc('${loai}',${item.id})">♻️ Khôi phục</button>
          <button class="delete" onclick="xoaVinhVien('${loai}',${item.id})">❌ Xóa vĩnh viễn</button>
        ` : `
          <button class="edit" onclick='suaItem("${loai}", ${JSON.stringify(item).replace(/'/g,"&#39;")})'>✏️ Sửa</button>
          <button class="trash" onclick="duaVaoThungRac('${loai}',${item.id})">🗑️ Xóa</button>
        `}
      </div>
    </div>`;
  });
  list.innerHTML = html;
}

function suaItem(loai, item){
  dangXemThungRac = false;
  chonLoai(loai);
  $("editingId").value = item.id;
  $("tieuDe").value = item.tieude || item.mota || "";
  $("noiDung").value = item.noidung || "";
  $("namHoc").value = item.namhoc || "2025-2026";
  $("ngay").value = item.ngay || "";
  $("album").value = item.album || "";
  $("lop").value = item.lop || "";
  $("trangThai").value = item.trangthai || "";
  $("videoUrl").value = item.videourl || "";
  $("adminStatus").style.color = "#005f3b";
  $("adminStatus").innerHTML = "Đang sửa: " + (item.tieude || item.mota || "nội dung");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function duaVaoThungRac(loai,id){
  if(!confirm("Chuyển nội dung này vào thùng rác?")) return;
  const { error } = await supabaseClient.from(cauHinh[loai].bang).update({ is_deleted:true, deleted_at:new Date().toISOString() }).eq("id", id);
  if(error) alert(error.message); else { await taiDashboard(); await taiDanhSachAdmin(); }
}

async function khoiPhuc(loai,id){
  const { error } = await supabaseClient.from(cauHinh[loai].bang).update({ is_deleted:false, deleted_at:null }).eq("id", id);
  if(error) alert(error.message); else { await taiDashboard(); await taiDanhSachAdmin(); }
}

async function xoaVinhVien(loai,id){
  if(!confirm("Xóa vĩnh viễn? Không thể khôi phục.")) return;
  const { error } = await supabaseClient.from(cauHinh[loai].bang).delete().eq("id", id);
  if(error) alert(error.message); else { await taiDashboard(); await taiDanhSachAdmin(); }
}

function xemThungRac(){
  dangXemThungRac = true;
  Object.keys(cauHinh).forEach(k => { const t = $("tab_"+k); if(t) t.classList.remove("active"); });
  $("tab_trash").classList.add("active");
  taiDanhSachAdmin();
}

window.addEventListener("DOMContentLoaded", function(){
  if(localStorage.getItem("admin_lop53") === "ok") hienAdmin();
});

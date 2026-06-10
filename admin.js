// ADMIN 6.0 - Website lớp 5/3
let loaiHienTai = "thong_bao";
const ADMIN_USER = "admin";
const ADMIN_PASS = "ngoquyen53";

const cauHinh = {
  thong_bao: { icon: "📢", ten: "Thông báo", table: "thong_bao", fileCol: "fileurl" },
  lich_hoc: { icon: "📅", ten: "Lịch học", table: "lich_hoc", fileCol: "fileurl" },
  tai_lieu: { icon: "📚", ten: "Tài liệu", table: "tai_lieu", fileCol: "fileurl" },
  hoat_dong_lop: { icon: "🎉", ten: "Hoạt động lớp", table: "hoat_dong_lop", fileCol: "url" },
  nam_hoc: { icon: "🏫", ten: "Năm học", table: "nam_hoc" }
};

function dangNhapAdmin(){
  const u=document.getElementById("adminUser").value.trim();
  const p=document.getElementById("adminPass").value.trim();
  if(u===ADMIN_USER && p===ADMIN_PASS){localStorage.setItem("lop53_admin_login","1");hienAdmin();}
  else document.getElementById("loginMsg").innerHTML="<b style='color:red'>Sai tài khoản hoặc mật khẩu.</b>";
}
function dangXuatAdmin(){localStorage.removeItem("lop53_admin_login");location.reload();}
function hienAdmin(){document.getElementById("loginBox").style.display="none";document.getElementById("adminApp").style.display="block";capNhatForm();taiDashboard();taiDanhSachAdmin();}
function setStatus(msg, ok=true){document.getElementById("adminStatus").innerHTML=msg?`<b style="color:${ok?'green':'red'}">${msg}</b>`:"";}
function lamSachTenFile(name){return (name||"file").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").replace(/[^a-zA-Z0-9._-]/g,"-");}

function chonLoai(loai, btn){loaiHienTai=loai;document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));if(btn)btn.classList.add("active");lamMoiForm(false);capNhatForm();taiDanhSachAdmin();}
function capNhatForm(){
  const isTrash=loaiHienTai==="trash"; const cfg=cauHinh[loaiHienTai];
  document.getElementById("formCard").style.display=isTrash?"none":"block";
  document.getElementById("listTitle").innerText=isTrash?"🗑️ Thùng rác":"📂 Danh sách nội dung";
  if(isTrash) return;
  document.getElementById("formTitle").innerText=`${cfg.icon} Quản lý ${cfg.ten}`;
  document.getElementById("noiDungWrap").style.display=["thong_bao","lich_hoc"].includes(loaiHienTai)?"block":"none";
  document.getElementById("ngayWrap").style.display=loaiHienTai==="lich_hoc"?"block":"none";
  document.getElementById("hoatDongWrap").style.display=loaiHienTai==="hoat_dong_lop"?"block":"none";
  document.getElementById("namHocWrap").style.display=loaiHienTai==="nam_hoc"?"grid":"none";
  document.getElementById("fileWrap").style.display=["tai_lieu","hoat_dong_lop","thong_bao","lich_hoc"].includes(loaiHienTai)?"block":"none";
}
function lamMoiForm(clearStatus=true){["editId","tieuDe","noiDung","ngayHoc","lop","trangThai","album","linkHoatDong"].forEach(id=>{const el=document.getElementById(id);if(el)el.value="";});document.getElementById("noiBat").checked=false;document.getElementById("fileUpload").value="";if(clearStatus)setStatus("");}

async function uploadNhieuFile(prefix){
  const input=document.getElementById("fileUpload"); if(!input.files||input.files.length===0) return ""; const urls=[];
  for(const file of input.files){const path=`${prefix}/${Date.now()}_${Math.random().toString(36).slice(2,7)}_${lamSachTenFile(file.name)}`; const {error}=await supabaseClient.storage.from(SUPABASE_BUCKET).upload(path,file,{cacheControl:"3600",upsert:false}); if(error) throw error; urls.push(supabaseClient.storage.from(SUPABASE_BUCKET).getPublicUrl(path).data.publicUrl);}
  return urls.join("|");
}

async function luuNoiDungV6(){
  try{
    const cfg=cauHinh[loaiHienTai]; const editId=document.getElementById("editId").value; const tieude=document.getElementById("tieuDe").value.trim(); const noidung=document.getElementById("noiDung").value.trim(); const namhoc=document.getElementById("namHoc").value; const is_pinned=document.getElementById("noiBat").checked;
    if(!tieude && loaiHienTai!=="nam_hoc"){setStatus("Vui lòng nhập tiêu đề.",false);return;}
    let row={};
    if(loaiHienTai==="nam_hoc") row={lop:document.getElementById("lop").value.trim(),namhoc,mota:tieude,trangthai:document.getElementById("trangThai").value.trim(),is_deleted:false};
    else {
      row={tieude,namhoc,is_deleted:false,is_pinned};
      if(["thong_bao","lich_hoc"].includes(loaiHienTai)) row.noidung=noidung;
      if(loaiHienTai==="lich_hoc") row.ngay=document.getElementById("ngayHoc").value||null;
      if(loaiHienTai==="hoat_dong_lop") {row.loai=document.getElementById("loaiHoatDong").value; row.album=document.getElementById("album").value.trim(); row.url=document.getElementById("linkHoatDong").value.trim(); row.noidung=noidung;}
      const fileUrls=await uploadNhieuFile(loaiHienTai); if(fileUrls && cfg.fileCol) row[cfg.fileCol]=row[cfg.fileCol]? row[cfg.fileCol]+"|"+fileUrls : fileUrls;
    }
    const result=editId? await supabaseClient.from(cfg.table).update(row).eq("id",editId) : await supabaseClient.from(cfg.table).insert([row]);
    if(result.error) throw result.error; setStatus(editId?"✅ Đã cập nhật nội dung.":"✅ Đã lưu nội dung."); lamMoiForm(false); taiDashboard(); taiDanhSachAdmin();
  }catch(err){setStatus("Lỗi: "+err.message,false);}
}

async function taiDashboard(){const box=document.getElementById("dashboard");let html="";for(const key of Object.keys(cauHinh)){const cfg=cauHinh[key];const {count}=await supabaseClient.from(cfg.table).select("*",{count:"exact",head:true}).eq("is_deleted",false);html+=`<div class="admin-stat-card"><span>${cfg.icon} ${cfg.ten}</span><b>${count||0}</b></div>`;}box.innerHTML=html;}
async function taiDanhSachAdmin(){const box=document.getElementById("adminList");if(loaiHienTai==="trash") return taiThungRac();const cfg=cauHinh[loaiHienTai];let {data,error}=await supabaseClient.from(cfg.table).select("*").eq("is_deleted",false).order("created_at",{ascending:false});if(error){box.innerHTML=`<p style='color:red'>${error.message}</p>`;return;}if(!data||data.length===0){box.innerHTML="<p>Chưa có nội dung.</p>";return;}box.innerHTML=data.map(item=>renderItem(item,cfg,false)).join("");}
function renderItem(item,cfg,deleted){const title=item.tieude||item.mota||item.namhoc||"Nội dung";const desc=item.noidung||item.trangthai||item.album||item.loai||"";const pin=item.is_pinned?"<span class='badge'>📌 Nổi bật</span>":"";const album=item.album?`<span class='badge'>Album: ${item.album}</span>`:"";let preview="";const url=item.fileurl||item.imageurl||item.videourl||item.url||"";const first=url.split("|")[0];if(first && /\.(jpg|jpeg|png|webp|gif)$/i.test(first.split('?')[0])) preview=`<img class="preview-img" src="${first}">`;return `<div class="list-item ${deleted?'deleted':''}"><div>${preview}<div style="font-weight:800;color:#065f46">${cfg.icon} ${title}</div><div>${desc}</div><div style="font-size:13px;color:#64748b">Năm học: ${item.namhoc||""} ${pin} ${album}</div></div><div class="actions">${deleted?`<button class="btn small green" onclick="khoiPhuc('${cfg.table}',${item.id})">♻️ Khôi phục</button><button class="btn small red" onclick="xoaVinhVien('${cfg.table}',${item.id})">❌ Xóa vĩnh viễn</button>`:`<button class="btn small blue" onclick='suaNoiDung(${JSON.stringify(item).replace(/'/g,"&#39;")})'>✏️ Sửa</button><button class="btn small red" onclick="duaVaoThungRac('${cfg.table}',${item.id})">🗑️ Xóa</button>`}</div></div>`;}
function suaNoiDung(item){document.getElementById("editId").value=item.id;document.getElementById("tieuDe").value=item.tieude||item.mota||"";document.getElementById("noiDung").value=item.noidung||"";document.getElementById("namHoc").value=item.namhoc||"2025-2026";document.getElementById("ngayHoc").value=item.ngay||"";document.getElementById("lop").value=item.lop||"";document.getElementById("trangThai").value=item.trangthai||"";document.getElementById("album").value=item.album||"";document.getElementById("linkHoatDong").value=item.url||"";if(item.loai)document.getElementById("loaiHoatDong").value=item.loai;document.getElementById("noiBat").checked=!!item.is_pinned;window.scrollTo({top:0,behavior:"smooth"});}
async function duaVaoThungRac(table,id){if(!confirm("Chuyển nội dung này vào thùng rác?")) return;const {error}=await supabaseClient.from(table).update({is_deleted:true,deleted_at:new Date().toISOString()}).eq("id",id);if(error)alert(error.message);else{taiDashboard();taiDanhSachAdmin();}}
async function khoiPhuc(table,id){const {error}=await supabaseClient.from(table).update({is_deleted:false,deleted_at:null}).eq("id",id);if(error)alert(error.message);else{taiDashboard();taiThungRac();}}
async function xoaVinhVien(table,id){if(!confirm("Xóa vĩnh viễn? Không thể khôi phục."))return;const {error}=await supabaseClient.from(table).delete().eq("id",id);if(error)alert(error.message);else{taiDashboard();taiThungRac();}}
async function taiThungRac(){const box=document.getElementById("adminList");let html="";for(const key of Object.keys(cauHinh)){const cfg=cauHinh[key];const {data}=await supabaseClient.from(cfg.table).select("*").eq("is_deleted",true).order("deleted_at",{ascending:false});if(data&&data.length)html+=`<h3>${cfg.icon} ${cfg.ten}</h3>`+data.map(i=>renderItem(i,cfg,true)).join("");}box.innerHTML=html||"<p>Thùng rác đang trống.</p>";}

document.addEventListener("DOMContentLoaded",()=>{if(localStorage.getItem("lop53_admin_login")==="1")hienAdmin();});

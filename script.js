const danhSachNamHoc = [
  {
    lop: "5/3",
    namHoc: "2025 - 2026",
    moTa: "Lớp 5/3 - Năm học 2025 - 2026",
    trangThai: "Năm học hiện tại"
  },
  {
    lop: "3/1",
    namHoc: "2024 - 2025",
    moTa: "Lớp 3/1 - Năm học 2024 - 2025",
    trangThai: "Đã lưu trữ"
  },
  {
    lop: "5/2",
    namHoc: "2023 - 2024",
    moTa: "Lớp 5/2 - Năm học 2023 - 2024",
    trangThai: "Đã lưu trữ"
  },
  {
    lop: "5/2",
    namHoc: "2022 - 2023",
    moTa: "Lớp 5/2 - Năm học 2022 - 2023",
    trangThai: "Đã lưu trữ"
  },
  {
    lop: "5/1",
    namHoc: "2021 - 2022",
    moTa: "Lớp 5/1 - Năm học 2021 - 2022",
    trangThai: "Đã lưu trữ"
  }
];

const khuVucNamHoc = document.getElementById("dsNamHoc");

danhSachNamHoc.forEach(function(item) {
  khuVucNamHoc.innerHTML += `
    <div class="year-card">
      <h3>${item.moTa}</h3>
      <p><b>Lớp:</b> ${item.lop}</p>
      <p><b>Năm học:</b> ${item.namHoc}</p>
      <p><b>Trạng thái:</b> ${item.trangThai}</p>
      <button>Xem chi tiết</button>
    </div>
  `;
});
const tuChinhTa = [
  { dung: "xinh xắn", sai: "xinh sắn" },
  { dung: "sáng sủa", sai: "sáng sữa" },
  { dung: "chăm chỉ", sai: "trăm chỉ" },
  { dung: "rèn luyện", sai: "dèn luyện" },
  { dung: "kiên trì", sai: "kiên chì" },
  { dung: "trung thực", sai: "chung thực" },
  { dung: "sạch sẽ", sai: "sạch sẻ" },
  { dung: "mạnh dạn", sai: "mạnh dạng" }
];

let diem = 0;

function batDauTroChoi() {
  diem = 0;
  document.getElementById("diem").innerText = diem;
  taoBong();
}

function taoBong() {
  const gameArea = document.getElementById("gameArea");
  gameArea.innerHTML = "";

  const cau = tuChinhTa[Math.floor(Math.random() * tuChinhTa.length)];

  let danhSach = [
    { text: cau.dung, dung: true },
    { text: cau.sai, dung: false }
  ];

  danhSach.sort(() => Math.random() - 0.5);

  danhSach.forEach(function(item) {
    const bong = document.createElement("div");
    bong.className = "balloon";
    bong.innerText = item.text;

    bong.onclick = function() {
     if (item.dung) {
    diem += 10;

    document.getElementById("ketQuaChinhTa").innerHTML =
    "✅ Chính xác! +10 điểm";

} else {

    diem -= 5;

    document.getElementById("ketQuaChinhTa").innerHTML =
    "❌ Chưa đúng! -5 điểm";
}

      document.getElementById("diem").innerText = diem;
      taoBong();
    };

    gameArea.appendChild(bong);
  });
}
const nganHangCauHoiToan = [
  { q: "125 + 236 = ?", a: 361, options: [351, 361, 371, 381] },
  { q: "468 + 127 = ?", a: 595, options: [585, 595, 605, 615] },
  { q: "732 - 218 = ?", a: 514, options: [504, 514, 524, 534] },
  { q: "905 - 476 = ?", a: 429, options: [419, 429, 439, 449] },
  { q: "24 × 5 = ?", a: 120, options: [100, 110, 120, 130] },
  { q: "36 × 4 = ?", a: 144, options: [124, 134, 144, 154] },
  { q: "48 × 6 = ?", a: 288, options: [268, 278, 288, 298] },
  { q: "72 ÷ 8 = ?", a: 9, options: [7, 8, 9, 10] },
  { q: "96 ÷ 12 = ?", a: 8, options: [6, 7, 8, 9] },
  { q: "15 × 12 = ?", a: 180, options: [160, 170, 180, 190] },

  { q: "245 + 318 = ?", a: 563, options: [553, 563, 573, 583] },
  { q: "609 + 284 = ?", a: 893, options: [873, 883, 893, 903] },
  { q: "834 - 259 = ?", a: 575, options: [565, 575, 585, 595] },
  { q: "1000 - 357 = ?", a: 643, options: [633, 643, 653, 663] },
  { q: "27 × 8 = ?", a: 216, options: [196, 206, 216, 226] },
  { q: "35 × 7 = ?", a: 245, options: [225, 235, 245, 255] },
  { q: "64 × 3 = ?", a: 192, options: [172, 182, 192, 202] },
  { q: "81 ÷ 9 = ?", a: 9, options: [7, 8, 9, 10] },
  { q: "144 ÷ 12 = ?", a: 12, options: [10, 11, 12, 13] },
  { q: "25 × 16 = ?", a: 400, options: [360, 380, 400, 420] },

  { q: "345 + 455 = ?", a: 800, options: [780, 790, 800, 810] },
  { q: "789 - 456 = ?", a: 333, options: [323, 333, 343, 353] },
  { q: "58 × 4 = ?", a: 232, options: [222, 232, 242, 252] },
  { q: "63 × 6 = ?", a: 378, options: [358, 368, 378, 388] },
  { q: "128 ÷ 8 = ?", a: 16, options: [14, 15, 16, 17] },
  { q: "225 ÷ 15 = ?", a: 15, options: [13, 14, 15, 16] },
  { q: "19 × 9 = ?", a: 171, options: [161, 171, 181, 191] },
  { q: "47 × 5 = ?", a: 235, options: [225, 235, 245, 255] },
  { q: "560 ÷ 7 = ?", a: 80, options: [70, 75, 80, 85] },
  { q: "640 ÷ 8 = ?", a: 80, options: [70, 75, 80, 90] },

  { q: "432 + 268 = ?", a: 700, options: [680, 690, 700, 710] },
  { q: "921 - 374 = ?", a: 547, options: [537, 547, 557, 567] },
  { q: "52 × 7 = ?", a: 364, options: [344, 354, 364, 374] },
  { q: "84 × 5 = ?", a: 420, options: [400, 410, 420, 430] },
  { q: "360 ÷ 9 = ?", a: 40, options: [30, 35, 40, 45] },
  { q: "490 ÷ 7 = ?", a: 70, options: [60, 65, 70, 75] },
  { q: "18 × 14 = ?", a: 252, options: [232, 242, 252, 262] },
  { q: "26 × 11 = ?", a: 286, options: [266, 276, 286, 296] },
  { q: "315 ÷ 5 = ?", a: 63, options: [53, 58, 63, 68] },
  { q: "125 × 4 = ?", a: 500, options: [450, 475, 500, 525] },

  { q: "678 + 222 = ?", a: 900, options: [880, 890, 900, 910] },
  { q: "850 - 275 = ?", a: 575, options: [555, 565, 575, 585] },
  { q: "39 × 6 = ?", a: 234, options: [214, 224, 234, 244] },
  { q: "73 × 4 = ?", a: 292, options: [272, 282, 292, 302] },
  { q: "216 ÷ 6 = ?", a: 36, options: [26, 32, 36, 42] },
  { q: "324 ÷ 9 = ?", a: 36, options: [30, 33, 36, 39] },
  { q: "45 × 12 = ?", a: 540, options: [520, 530, 540, 550] },
  { q: "32 × 15 = ?", a: 480, options: [460, 470, 480, 490] },
  { q: "900 ÷ 10 = ?", a: 90, options: [70, 80, 90, 100] },
  { q: "1000 ÷ 25 = ?", a: 40, options: [30, 35, 40, 45] },

  { q: "234 + 567 = ?", a: 801, options: [781, 791, 801, 811] },
  { q: "756 - 389 = ?", a: 367, options: [347, 357, 367, 377] },
  { q: "67 × 3 = ?", a: 201, options: [191, 201, 211, 221] },
  { q: "88 × 2 = ?", a: 176, options: [166, 176, 186, 196] },
  { q: "150 ÷ 6 = ?", a: 25, options: [20, 25, 30, 35] },
  { q: "240 ÷ 8 = ?", a: 30, options: [20, 25, 30, 35] },
  { q: "21 × 13 = ?", a: 273, options: [253, 263, 273, 283] },
  { q: "14 × 16 = ?", a: 224, options: [204, 214, 224, 234] },
  { q: "375 ÷ 15 = ?", a: 25, options: [20, 25, 30, 35] },
  { q: "625 ÷ 25 = ?", a: 25, options: [15, 20, 25, 30] },

  { q: "456 + 378 = ?", a: 834, options: [814, 824, 834, 844] },
  { q: "999 - 444 = ?", a: 555, options: [535, 545, 555, 565] },
  { q: "92 × 3 = ?", a: 276, options: [256, 266, 276, 286] },
  { q: "76 × 4 = ?", a: 304, options: [284, 294, 304, 314] },
  { q: "420 ÷ 6 = ?", a: 70, options: [60, 65, 70, 75] },
  { q: "540 ÷ 9 = ?", a: 60, options: [50, 55, 60, 65] },
  { q: "28 × 12 = ?", a: 336, options: [316, 326, 336, 346] },
  { q: "34 × 11 = ?", a: 374, options: [354, 364, 374, 384] },
  { q: "720 ÷ 12 = ?", a: 60, options: [50, 55, 60, 65] },
  { q: "840 ÷ 14 = ?", a: 60, options: [50, 55, 60, 70] },

  { q: "123 + 789 = ?", a: 912, options: [892, 902, 912, 922] },
  { q: "654 - 321 = ?", a: 333, options: [313, 323, 333, 343] },
  { q: "43 × 7 = ?", a: 301, options: [281, 291, 301, 311] },
  { q: "56 × 8 = ?", a: 448, options: [428, 438, 448, 458] },
  { q: "288 ÷ 12 = ?", a: 24, options: [20, 22, 24, 26] },
  { q: "360 ÷ 15 = ?", a: 24, options: [20, 22, 24, 26] },
  { q: "17 × 18 = ?", a: 306, options: [286, 296, 306, 316] },
  { q: "29 × 13 = ?", a: 377, options: [357, 367, 377, 387] },
  { q: "960 ÷ 12 = ?", a: 80, options: [70, 75, 80, 85] },
  { q: "1080 ÷ 12 = ?", a: 90, options: [80, 85, 90, 95] },

  { q: "675 + 125 = ?", a: 800, options: [780, 790, 800, 810] },
  { q: "872 - 468 = ?", a: 404, options: [384, 394, 404, 414] },
  { q: "65 × 6 = ?", a: 390, options: [370, 380, 390, 400] },
  { q: "78 × 5 = ?", a: 390, options: [370, 380, 390, 400] },
  { q: "315 ÷ 9 = ?", a: 35, options: [25, 30, 35, 40] },
  { q: "480 ÷ 16 = ?", a: 30, options: [20, 25, 30, 35] },
  { q: "22 × 17 = ?", a: 374, options: [354, 364, 374, 384] },
  { q: "31 × 14 = ?", a: 434, options: [414, 424, 434, 444] },
  { q: "750 ÷ 15 = ?", a: 50, options: [40, 45, 50, 55] },
  { q: "990 ÷ 11 = ?", a: 90, options: [80, 85, 90, 95] },

  { q: "555 + 345 = ?", a: 900, options: [880, 890, 900, 910] },
  { q: "1000 - 625 = ?", a: 375, options: [355, 365, 375, 385] },
  { q: "97 × 2 = ?", a: 194, options: [184, 194, 204, 214] },
  { q: "89 × 3 = ?", a: 267, options: [247, 257, 267, 277] },
  { q: "540 ÷ 6 = ?", a: 90, options: [80, 85, 90, 95] },
  { q: "660 ÷ 11 = ?", a: 60, options: [50, 55, 60, 65] },
  { q: "42 × 12 = ?", a: 504, options: [484, 494, 504, 514] },
  { q: "55 × 11 = ?", a: 605, options: [585, 595, 605, 615] },
  { q: "121 ÷ 11 = ?", a: 11, options: [9, 10, 11, 12] },
  { q: "169 ÷ 13 = ?", a: 13, options: [11, 12, 13, 14] }
];

let diemToan = 0;
let cauDungToan = 0;
let soCauToan = 0;
let dapAnDung = 0;
let thoiGian = 60;
let timerToan;
let boCauHoiDangChoi = [];

function tronMang(array) {
  return array.sort(() => Math.random() - 0.5);
}

function batDauToan() {
  diemToan = 0;
  cauDungToan = 0;
  soCauToan = 0;
  thoiGian = 60;

  boCauHoiDangChoi = tronMang([...nganHangCauHoiToan]).slice(0, 10);

  document.getElementById("diemToan").innerText = diemToan;
  document.getElementById("cauDungToan").innerText = cauDungToan;
  document.getElementById("soCauToan").innerText = soCauToan;
  document.getElementById("dongHoToan").innerText = "⏰ 60 giây";
  document.getElementById("ketQuaToan").innerHTML = "";

  clearInterval(timerToan);

  timerToan = setInterval(function () {
    thoiGian--;
    document.getElementById("dongHoToan").innerText = "⏰ " + thoiGian + " giây";

    if (thoiGian <= 0) {
      ketThucToan();
    }
  }, 1000);

  hienCauHoiToan();
}

function hienCauHoiToan() {
  if (soCauToan >= 10) {
    ketThucToan();
    return;
  }

  const cau = boCauHoiDangChoi[soCauToan];
  dapAnDung = cau.a;

  document.getElementById("phepTinh").innerText = cau.q;

  const luaChon = tronMang([...cau.options]);

  document.getElementById("luaChonToan").innerHTML = luaChon.map(function (item) {
    return `
      <div class="answer-option" onclick="chonDapAnToan(${item}, this)">
        ${item}
      </div>
    `;
  }).join("");
}

function chonDapAnToan(value, element) {
  const dapAnCuaCauNay = dapAnDung;

  const cacLuaChon = document.querySelectorAll(".answer-option");
  cacLuaChon.forEach(btn => btn.style.pointerEvents = "none");

  soCauToan++;

  if (value === dapAnCuaCauNay) {
    diemToan += 10;
    cauDungToan++;
    element.classList.add("correct-answer");
    document.getElementById("ketQuaToan").innerHTML = "✅ Chính xác! +10 điểm";
  } else {
    element.classList.add("wrong-answer");
    document.getElementById("ketQuaToan").innerHTML =
      "❌ Chưa đúng. Đáp án đúng là: " + dapAnCuaCauNay;
  }

  document.getElementById("diemToan").innerText = diemToan;
  document.getElementById("cauDungToan").innerText = cauDungToan;
  document.getElementById("soCauToan").innerText = soCauToan;

  if (soCauToan >= 10) {
    setTimeout(ketThucToan, 1000);
  } else {
    setTimeout(hienCauHoiToan, 1000);
  }
}
function ketThucToan() {
  clearInterval(timerToan);

  let huyHieu = "";

  if (diemToan >= 90) {
    huyHieu = "🥇 SIÊU TOÁN";
  } else if (diemToan >= 70) {
    huyHieu = "🥈 NHÀ TOÁN HỌC NHÍ";
  } else if (diemToan >= 50) {
    huyHieu = "🥉 CHĂM CHỈ LUYỆN TẬP";
  } else {
    huyHieu = "⭐ CỐ GẮNG HƠN NỮA";
  }

  document.getElementById("phepTinh").innerHTML = "🏆 HOÀN THÀNH";
  document.getElementById("luaChonToan").innerHTML = "";
  document.getElementById("ketQuaToan").innerHTML =
    `
    <div class="final-result">
      <h3>${huyHieu}</h3>
      <p>Điểm: <b>${diemToan}/100</b></p>
      <p>Số câu đúng: <b>${cauDungToan}/10</b></p>
      <p>Thời gian còn lại: <b>${thoiGian} giây</b></p>
    </div>
    `;
}

function phatAmThanhDung() {
  const audio = new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");
  audio.play();
}

function phatAmThanhSai() {
  const audio = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");
  audio.play();
}
window.onload = function () {
  clearInterval(timerToan);

  document.getElementById("diemToan").innerText = 0;
  document.getElementById("cauDungToan").innerText = 0;
  document.getElementById("soCauToan").innerText = 0;
  document.getElementById("dongHoToan").innerText = "⏰ 60 giây";

  document.getElementById("phepTinh").innerText = "Bấm bắt đầu để chơi";
  document.getElementById("luaChonToan").innerHTML = "";
  document.getElementById("ketQuaToan").innerHTML = "";
};
const API_URL = "https://script.google.com/macros/s/AKfycby39ADBAkm0rd2twflUdJwa33U4Ghs8U5ElkdxZ74N3HnqVjA1RLgnJE6iqdFEJrXIpXg/exec";

function dangNhapHocSinh() {
  const hoten = document.getElementById("tenhs").value.trim();
  const matkhau = document.getElementById("matkhau").value.trim();
  const namhoc = document.getElementById("namhoc").value;
  if (hoten === "" || matkhau === "") {
    document.getElementById("ketQuaHocSinh").innerHTML =
      "<p style='color:red; font-weight:bold;'>Vui lòng nhập đầy đủ họ tên và mật khẩu.</p>";
    return;
  }

  document.getElementById("ketQuaHocSinh").innerHTML =
    "<p>Đang tra cứu dữ liệu...</p>";

  const oldScript = document.getElementById("jsonpScript");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.id = "jsonpScript";
  script.src =
  API_URL +
  "?hoten=" + encodeURIComponent(hoten) + // có thể nhập họ tên hoặc mã học sinh nếu Apps Script đã hỗ trợ MAHS
  "&matkhau=" + encodeURIComponent(matkhau) +
  "&namhoc=" + encodeURIComponent(namhoc) +
  "&callback=nhanKetQuaHocSinh";

  document.body.appendChild(script);
}

function nhanKetQuaHocSinh(data) {
  if (!data.success) {
    document.getElementById("ketQuaHocSinh").innerHTML =
      "<p style='color:red; font-weight:bold;'>" + data.message + "</p>";
    return;
  }

  hienKetQuaHocSinh(data);
}

function layGiaTri(item, tenCot) {
  return item && item[tenCot] !== undefined && item[tenCot] !== ""
    ? item[tenCot]
    : "";
}

function hienMon(item, tenMon, cotMuc, cotDiem) {
  const muc = layGiaTri(item, cotMuc);
  const diem = layGiaTri(item, cotDiem);

  if (diem !== "") {
    return `<tr><td>${tenMon}</td><td>${muc}</td><td>${diem}</td></tr>`;
  }

  return `<tr><td>${tenMon}</td><td>${muc}</td><td></td></tr>`;
}

function hienKetQuaHocSinh(data) {
console.log(data);
  const danhSachKy = [
    { ma: "GK1", ten: "Giữa kì 1" },
    { ma: "CK1", ten: "Cuối kì 1" },
    { ma: "GK2", ten: "Giữa kì 2" },
    { ma: "CK2", ten: "Cuối kì 2" }
  ];

 let html = `
<div class="parent-page">

<div class="student-header">

    <div class="student-avatar">
        👨‍🎓
    </div>

    <div class="student-info-box">

        <h2>📚 KẾT QUẢ HỌC TẬP VÀ RÈN LUYỆN</h2>

        <h3 class="student-name">
            ${data.hoten}
        </h3>

        <div class="student-desc ma-hoc-sinh">
            Mã học sinh: <b>${data.mahs || data.MAHS || "Chưa cập nhật"}</b>
        </div>
       <button class="print-btn" onclick="inKetQuaHocTap()">
  📄 In / Lưu PDF kết quả học tập
</button>

        <div class="student-desc">
            Trường Tiểu học Ngô Quyền
        </div>

        <div class="student-desc">
            Tra cứu kết quả học tập và rèn luyện
        </div>

    </div>

</div>

<p class="note-parent">
Phụ huynh theo dõi kết quả học tập và rèn luyện của học sinh qua từng kỳ.
</p>
`;

  danhSachKy.forEach(function(ky) {
    const item = data.ketqua[ky.ma];

    html += `
      <div class="term-card-full">
        <h3>${ky.ten}</h3>
    `;

    if (!item) {
      html += `<p>Chưa cập nhật dữ liệu.</p>`;
    } else {
      html += `
        <h4>📚 Môn học và hoạt động giáo dục</h4>

        <table class="result-table">
          <tr>
            <th>Môn học</th>
            <th>Mức đạt được</th>
            <th>Điểm</th>
          </tr>

          ${hienMon(item, "Tiếng Việt", "TV MĐ", "TV Điểm")}
          ${hienMon(item, "Toán", "Toán MĐ", "Toán Điểm")}
          ${hienMon(item, "Khoa học", "KH MĐ", "KH Điểm")}
          ${hienMon(item, "Lịch sử và Địa lí", "LSĐL MĐ", "LSĐL Điểm")}
          ${hienMon(item, "Tiếng Anh", "TA MĐ", "TA Điểm")}
          ${hienMon(item, "Đạo đức", "ĐĐ MĐ", "")}
          ${hienMon(item, "Âm nhạc", "ÂN MĐ", "")}
          ${hienMon(item, "Mĩ thuật", "MT MĐ", "")}
          ${hienMon(item, "Tin học", "TH MĐ", "TH Điểm")}
          ${hienMon(item, "Công nghệ", "CN MĐ", "CN Điểm")}
          ${hienMon(item, "GDTC", "GDTC MĐ", "")}
          ${hienMon(item, "HĐTN", "HĐTN MĐ", "")}
        </table>

        <h4>🌱 Năng lực</h4>
        <div class="tag-list">
          <span>Tự chủ và tự học: ${layGiaTri(item, "Tự chủ")}</span>
          <span>Giao tiếp và hợp tác: ${layGiaTri(item, "Giao tiếp")}</span>
          <span>GQVĐ và sáng tạo: ${layGiaTri(item, "GQVĐ")}</span>
          <span>Ngôn ngữ: ${layGiaTri(item, "Ngôn ngữ")}</span>
          <span>Tính toán: ${layGiaTri(item, "Tính toán")}</span>
          <span>Khoa học: ${layGiaTri(item, "Khoa học")}</span>
          <span>Công nghệ: ${layGiaTri(item, "Công nghệ")}</span>
          <span>Tin học: ${layGiaTri(item, "Tin học")}</span>
          <span>Thẩm mĩ: ${layGiaTri(item, "Thẩm mĩ")}</span>
          <span>Thể chất: ${layGiaTri(item, "Thể chất")}</span>
        </div>

        <h4>💛 Phẩm chất</h4>
        <div class="tag-list">
          <span>Yêu nước: ${layGiaTri(item, "Yêu nước")}</span>
          <span>Nhân ái: ${layGiaTri(item, "Nhân ái")}</span>
          <span>Chăm chỉ: ${layGiaTri(item, "Chăm chỉ")}</span>
          <span>Trung thực: ${layGiaTri(item, "Trung thực")}</span>
          <span>Trách nhiệm: ${layGiaTri(item, "Trách nhiệm")}</span>
        </div>

        <div class="teacher-comment">
          <p><b>Nhận xét:</b> ${layGiaTri(item, "NHANXET") || "Chưa cập nhật"}</p>
        </div>
      `;

      if (ky.ma === "CK2") {

  const khenThuong =
    layGiaTri(item, "Khen thưởng") ||
    layGiaTri(item, "Khen thuong") ||
    layGiaTri(item, "KHENTHUONG");

  html += `
    <div class="reward-box">
      🏆 <b>Khen thưởng cuối năm:</b>
      ${khenThuong || "Chưa cập nhật"}
    </div>
  `;
}
    }

    html += `</div>`;
  });

  html += `</div>`;

  document.getElementById("ketQuaHocSinh").innerHTML = html;
}

function hienThongBao(data) {
  const khuVuc = document.getElementById("danhSachThongBao");

  if (!khuVuc) return;

  if (!data.thongbao || data.thongbao.length === 0) {
    khuVuc.innerHTML = "<p>Chưa có thông báo mới.</p>";
    return;
  }

  let html = "";

  data.thongbao.forEach(function(tb) {
    html += `
      <div class="notice-card">
        <div class="notice-date">📅 ${tb.ngay || ""}</div>
        <h3>${tb.tieude || ""}</h3>
        <p>${tb.noidung || ""}</p>
      </div>
    `;
  });

  khuVuc.innerHTML = html;
}
function hienThiNamHoc() {
  const khuVuc = document.getElementById("dsNamHoc");
  if (!khuVuc) return;

  let html = "";

  danhSachNamHoc.forEach(function(item) {
    html += `
<div class="year-card">
  <h3>${item.moTa}</h3>
  <p><b>Lớp:</b> ${item.lop}</p>
  <p><b>Năm học:</b> ${item.namHoc}</p>
  <p><b>Trạng thái:</b> ${item.trangThai}</p>

  <a class="year-btn" href="#phuhuynh">
    Xem kết quả
  </a>
</div>
    `;
  });

  khuVuc.innerHTML = html;
}

hienThiNamHoc();


// =====================================================
// PHẦN SUPABASE DATABASE 3.0 - THÔNG BÁO, LỊCH HỌC, TÀI LIỆU, ẢNH, VIDEO
// Đã ghép thêm, không xóa Cổng phụ huynh và trò chơi cũ.
// =====================================================

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

  let html = '<div class="video-list">';

data.forEach(video => {
  let url = video.videourl || "";
  let embedUrl = url;

  if (url.includes("youtube.com/watch?v=")) {
    const id = url.split("v=")[1].split("&")[0];
    embedUrl = "https://www.youtube.com/embed/" + id;
  }

  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    embedUrl = "https://www.youtube.com/embed/" + id;
  }

  html += `
    <div class="video-card">
      <h3>🎬 ${video.tieude || "Video hoạt động"}</h3>
      <div class="video-box">
        <iframe 
          src="${embedUrl}" 
          frameborder="0" 
          allowfullscreen>
        </iframe>
      </div>
      <p><a href="${url}" target="_blank">Mở video trong tab mới</a></p>
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
   taiNamHocV3();
});
async function taiThuVienAnhV5() {
  const khuVuc = document.getElementById("danhSachAnh");
  if (!khuVuc || typeof supabaseClient === "undefined") return;

  const { data, error } = await supabaseClient
    .from("thu_vien_anh")
    .select("*")
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  if (error) {
    khuVuc.innerHTML = "<p>Chưa tải được thư viện ảnh.</p>";
    return;
  }

  if (!data || data.length === 0) {
    khuVuc.innerHTML = "<p>Chưa có hình ảnh nào.</p>";
    return;
  }

  let html = '<div class="gallery-grid">';

  data.forEach(item => {
    const linkAnh = item.imageurl || item.fileurl || "";

    if (!linkAnh) return;

    const danhSachLink = linkAnh.split("|");

    danhSachLink.forEach(url => {
      html += `
        <div class="gallery-card">
          <a href="${url}" target="_blank">
            <img src="${url}" alt="${item.tieude || "Ảnh hoạt động"}">
          </a>
          <p><b>${item.tieude || "Ảnh hoạt động"}</b></p>
          <small>${item.namhoc || ""} ${item.album ? " - " + item.album : ""}</small>
        </div>
      `;
    });
  });

  html += "</div>";
  khuVuc.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
  taiThuVienAnhV5();
});



// =====================================================
// ADMIN 6.3 - GALLERY ỔN ĐỊNH
// Bỏ Góc tuyên dương + Xin nghỉ học.
// Thư viện hoạt động đọc trực tiếp từ 2 bảng ổn định:
//   1) thu_vien_anh: ảnh hoạt động
//   2) video_lop: video YouTube / video online / link
// Không dùng bảng hoat_dong_lop nên không bị mất dữ liệu cũ.
// =====================================================

let danhSachMediaV63 = [];
let viTriLightboxV63 = 0;

function youtubeEmbedV63(url) {
  if (!url) return "";
  let id = "";
  if (url.includes("youtube.com/watch?v=")) id = url.split("v=")[1].split("&")[0];
  if (url.includes("youtu.be/")) id = url.split("youtu.be/")[1].split("?")[0];
  if (url.includes("youtube.com/embed/")) id = url.split("/embed/")[1].split("?")[0];
  return id ? "https://www.youtube.com/embed/" + id : "";
}

function youtubeThumbV63(url) {
  if (!url) return "";
  let id = "";
  if (url.includes("youtube.com/watch?v=")) id = url.split("v=")[1].split("&")[0];
  if (url.includes("youtu.be/")) id = url.split("youtu.be/")[1].split("?")[0];
  if (url.includes("youtube.com/embed/")) id = url.split("/embed/")[1].split("?")[0];
  return id ? "https://img.youtube.com/vi/" + id + "/hqdefault.jpg" : "";
}

function laAnhV63(url) {
  return /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test((url || "").split("?")[0]);
}

function laVideoFileV63(url) {
  return /\.(mp4|webm|ogg)$/i.test((url || "").split("?")[0]);
}

function tachUrlsV63(text) {
  return String(text || "").split("|").map(x => x.trim()).filter(Boolean);
}

function themMediaV63(arr, item) {
  const urls = tachUrlsV63(item.url || item.imageurl || item.fileurl || item.videourl || "");
  urls.forEach(url => {
    let loai = item.loai || "link";
    if (youtubeEmbedV63(url) || laVideoFileV63(url)) loai = "video";
    else if (laAnhV63(url)) loai = "anh";
    arr.push({
      tieude: item.tieude || "Hoạt động lớp",
      noidung: item.noidung || "",
      album: item.album || "",
      namhoc: item.namhoc || "",
      created_at: item.created_at || "",
      is_pinned: !!item.is_pinned,
      loai,
      url
    });
  });
}

function renderMediaCardV63(item, index) {
  const q = ((item.tieude || "") + " " + (item.album || "") + " " + (item.namhoc || "") + " " + (item.noidung || "")).toLowerCase();
  const embed = youtubeEmbedV63(item.url);
  const thumb = youtubeThumbV63(item.url);
  let media = "";
  let icon = item.loai === "video" ? "🎬" : (item.loai === "link" ? "🔗" : "📸");

  if (embed) {
    media = `
      <div class="gallery-thumb video-thumb" onclick="moVideoV63('${embed.replace(/'/g, "&#39;")}')">
        <img src="${thumb}" alt="${item.tieude || 'Video'}">
        <div class="play-icon">▶</div>
      </div>`;
  } else if (laVideoFileV63(item.url)) {
    media = `<video class="gallery-video" controls preload="metadata" src="${item.url}"></video>`;
  } else if (laAnhV63(item.url)) {
    media = `<div class="gallery-thumb" onclick="moLightboxV63(${index})"><img src="${item.url}" loading="lazy" alt="${item.tieude || 'Ảnh hoạt động'}"></div>`;
  } else {
    media = `<div class="gallery-link"><a href="${item.url}" target="_blank">🔗 Mở liên kết</a></div>`;
  }

  return `
    <div class="gallery63-card" data-search="${q.replace(/"/g, '&quot;')}">
      ${media}
      <div class="gallery63-body">
        <h3>${icon} ${item.tieude || "Hoạt động lớp"}</h3>
        ${item.noidung ? `<p>${item.noidung}</p>` : ""}
        <div class="gallery63-meta">
          ${item.is_pinned ? `<span>📌 Nổi bật</span>` : ""}
          ${item.namhoc ? `<span>📚 ${item.namhoc}</span>` : ""}
          ${item.album ? `<span>📁 ${item.album}</span>` : ""}
          ${item.created_at ? `<span>📅 ${dinhDangNgay(item.created_at)}</span>` : ""}
        </div>
      </div>
    </div>`;
}

async function taiHoatDongLopV63() {
  const khuVuc = document.getElementById("danhSachAnh");
  if (!khuVuc || typeof supabaseClient === "undefined") return;

  khuVuc.innerHTML = "<p>Đang tải thư viện hoạt động...</p>";

  let all = [];

  const anhRes = await supabaseClient
    .from("thu_vien_anh")
    .select("*")
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  const videoRes = await supabaseClient
    .from("video_lop")
    .select("*")
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  if (anhRes.data) {
    anhRes.data.forEach(item => themMediaV63(all, { ...item, loai: "anh", url: item.imageurl || item.fileurl }));
  }
  if (videoRes.data) {
    videoRes.data.forEach(item => themMediaV63(all, { ...item, loai: "video", url: item.videourl }));
  }

  all.sort((a, b) => {
    if (a.is_pinned !== b.is_pinned) return a.is_pinned ? -1 : 1;
    return new Date(b.created_at || 0) - new Date(a.created_at || 0);
  });

  danhSachMediaV63 = all;

  if (!all.length) {
    khuVuc.innerHTML = "<p>Chưa có hình ảnh hoặc video hoạt động nào.</p>";
    return;
  }

  khuVuc.innerHTML = `<div class="gallery63-grid">${all.map(renderMediaCardV63).join("")}</div>`;
}

function locHoatDongV63() {
  const q = (document.getElementById("timHoatDong")?.value || "").toLowerCase().trim();
  document.querySelectorAll(".gallery63-card").forEach(card => {
    card.style.display = card.dataset.search.includes(q) ? "block" : "none";
  });
}

function taoLightboxKhungV63() {
  if (document.getElementById("lightboxV63")) return;
  const div = document.createElement("div");
  div.id = "lightboxV63";
  div.innerHTML = `
    <button class="lb-close" onclick="dongLightboxV63()">×</button>
    <button class="lb-prev" onclick="chuyenLightboxV63(-1)">‹</button>
    <div class="lb-content" id="lbContentV63"></div>
    <button class="lb-next" onclick="chuyenLightboxV63(1)">›</button>
  `;
  document.body.appendChild(div);
}

function moLightboxV63(index) {
  taoLightboxKhungV63();
  viTriLightboxV63 = index;
  const item = danhSachMediaV63[index];
  if (!item) return;
  document.getElementById("lbContentV63").innerHTML = `
    <img src="${item.url}" alt="${item.tieude || 'Ảnh hoạt động'}">
    <div class="lb-caption"><b>${item.tieude || "Hoạt động lớp"}</b><br>${item.album || ""} ${item.namhoc || ""}</div>
  `;
  document.getElementById("lightboxV63").classList.add("show");
}

function moVideoV63(embedUrl) {
  taoLightboxKhungV63();
  document.getElementById("lbContentV63").innerHTML = `<iframe class="lb-video" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
  document.getElementById("lightboxV63").classList.add("show");
}

function dongLightboxV63() {
  const lb = document.getElementById("lightboxV63");
  if (lb) {
    lb.classList.remove("show");
    document.getElementById("lbContentV63").innerHTML = "";
  }
}

function chuyenLightboxV63(step) {
  const anhIndexes = danhSachMediaV63.map((x,i)=>laAnhV63(x.url)?i:null).filter(x=>x!==null);
  if (!anhIndexes.length) return;
  let pos = anhIndexes.indexOf(viTriLightboxV63);
  if (pos < 0) pos = 0;
  pos = (pos + step + anhIndexes.length) % anhIndexes.length;
  moLightboxV63(anhIndexes[pos]);
}

document.addEventListener("keydown", function(e){
  if(e.key === "Escape") dongLightboxV63();
  if(e.key === "ArrowLeft") chuyenLightboxV63(-1);
  if(e.key === "ArrowRight") chuyenLightboxV63(1);
});

document.addEventListener("DOMContentLoaded", function () {
  taiHoatDongLopV63();
});
function inKetQuaHocTap() {
  const noiDung = document.getElementById("ketQuaHocSinh");

  if (!noiDung || noiDung.innerHTML.trim() === "") {
    alert("Chưa có kết quả học tập để in.");
    return;
  }

  const cuaSoIn = window.open("", "_blank");

  cuaSoIn.document.write(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <title>Kết quả học tập</title>
      <link rel="stylesheet" href="style.css">
      <style>
       body {
  font-family: Arial, sans-serif;
  background: white;
  padding: 8px;
  font-size: 12px;
}

.print-btn {
  display: none !important;
}

.student-header {
  padding: 10px !important;
  margin-bottom: 10px !important;
}

.student-header h2 {
  font-size: 20px !important;
}

.student-name {
  font-size: 22px !important;
}

.term-card-full {
  page-break-inside: avoid;
  padding: 10px !important;
  margin-bottom: 10px !important;
}

.result-table {
  font-size: 11px !important;
}

.result-table th,
.result-table td {
  padding: 5px !important;
}

@page {
  size: A4 landscape;
  margin: 8mm;
}
      </style>
    </head>
    <body>
      ${noiDung.innerHTML}
    </body>
    </html>
  `);

  cuaSoIn.document.close();

  cuaSoIn.onload = function () {
    cuaSoIn.print();
  };
}

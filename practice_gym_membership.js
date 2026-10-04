const packagePrices = {
  STANDARD: 500000,
  VIP: 800000,
  PT: 300000,
};

let isRunning = true;
let isRegistered = false;
let memberName = "";
let memberPhone = "";
let memberCode = "";

let registeredMembers = 0;
let totalRevenue = 0;
let checkInCount = 0;

do {
  const menuText = [
    "-".repeat(40),
    "       HỆ THỐNG QUẢN LÝ PHÒNG GYM",
    "-".repeat(40),
    " 1. Đăng ký & chuẩn hóa hồ sơ HV",
    " 2. Tính tiền gói tập & giảm giá",
    " 3. Quét mã thẻ check-in cửa quay",
    " 4. Xuất báo cáo ca trực & thoát",
    "-".repeat(40),
    "Nhập lựa chọn của bạn (1-4):",
  ].join("\n");

  console.log(menuText);
  const choice = prompt(menuText);

  if (choice === null || choice.trim() === "") {
    console.log("Cảnh báo: Lựa chọn để trống!");
    alert("Vui lòng không để trống!");
    continue;
  } else if (isNaN(choice)) {
    console.log("Cảnh báo: Vui lòng nhập số!");
    alert("Vui lòng không nhập chữ!");
    continue;
  }

  switch (choice.trim()) {
    case "1": {
      const rawName = prompt("Nhập họ và tên hội viên: ");
      if (rawName === null || rawName.trim() === "") {
        console.log("Lỗi: Họ tên hội viên để trống!");
        alert("Không được để tên hội viên trống!");
        break;
      }
      memberName = rawName.trim().toUpperCase();

      const rawPhone = prompt("Nhập số điện thoại hội viên: ");
      if (rawPhone === null || rawPhone.trim() === "") {
        console.log("Lỗi: Số điện thoại để trống!");
        alert("Không được để số điện thoại trống!");
        break;
      }
      memberPhone = rawPhone.trim();

      const rawCode = prompt("Tạo mã thẻ hội viên (bắt đầu bằng GYM-): ");
      if (rawCode === null || rawCode.trim() === "") {
        console.log("Lỗi: Mã thẻ để trống!");
        alert("Không được để mã thẻ trống!");
        break;
      }
      const cleanCode = rawCode.trim().toUpperCase();

      if (!cleanCode.startsWith("GYM-")) {
        console.log(`Lỗi: Mã thẻ ${cleanCode} không bắt đầu bằng 'GYM-'!`);
        alert("Mã thẻ không hợp lệ! Phải bắt đầu bằng 'GYM-'");
        break;
      }

      memberCode = cleanCode;
      isRegistered = true;
      registeredMembers++;

      const successMsg = `Đăng ký thành công hội viên: ${memberName} (${memberCode}) - SĐT: ${memberPhone}`;
      console.log(successMsg);
      alert(successMsg);
      break;
    }

    case "2": {
      if (isRegistered === false) {
        console.log("Lỗi: Chưa đăng ký hồ sơ hội viên mà đã tính tiền!");
        alert("Vui lòng đăng ký hồ sơ hội viên trước!");
        break;
      }

      let packageChoice = "";
      while (true) {
        const pkgInput = prompt("Chọn gói tập (1: STANDARD - 500k | 2: VIP - 800k): ");
        if (pkgInput === null || pkgInput.trim() === "") {
          console.log("Cảnh báo: Chưa chọn gói tập!");
          alert("Vui lòng chọn gói tập!");
          continue;
        }
        if (pkgInput.trim() === "1") {
          packageChoice = "STANDARD";
          break;
        } else if (pkgInput.trim() === "2") {
          packageChoice = "VIP";
          break;
        } else {
          console.log("Lỗi: Lựa chọn gói tập không hợp lệ!");
          alert("Lựa chọn không hợp lệ! Chỉ chọn 1 hoặc 2.");
        }
      }

      let months = 0;
      while (true) {
        const monthInput = prompt("Nhập số tháng đăng ký (tối thiểu 1 tháng): ");
        if (monthInput === null || monthInput.trim() === "") {
          console.log("Cảnh báo: Chưa nhập số tháng!");
          alert("Vui lòng nhập số tháng!");
          continue;
        }
        if (isNaN(monthInput) || +monthInput <= 0 || +monthInput % 1 !== 0) {
          console.log("Lỗi: Số tháng không hợp lệ!");
          alert("Vui lòng nhập số lượng tháng hợp lệ!");
        } else {
          months = +monthInput;
          break;
        }
      }

      let ptSessions = 0;
      while (true) {
        const ptInput = prompt("Nhập số buổi thuê PT (+300.000 vnd/buổi, để trống tính 0): ");
        if (ptInput === null || ptInput.trim() === "") {
          ptSessions = 0;
          break;
        }
        if (isNaN(ptInput) || +ptInput < 0 || +ptInput % 1 !== 0) {
          console.log("Lỗi: Số buổi PT không hợp lệ!");
          alert("Vui lòng nhập số buổi hợp lệ!");
        } else {
          ptSessions = +ptInput;
          break;
        }
      }

      const packageFee = packagePrices[packageChoice] * months;
      const ptFee = ptSessions * packagePrices.PT;
      const subtotal = packageFee + ptFee;

      let discountRate = 0;
      if (months >= 12) {
        discountRate = 0.25;
      } else if (months >= 6) {
        discountRate = 0.15;
      }

      const discount = packageFee * discountRate;
      const total = subtotal - discount;

      totalRevenue += total;

      const invoiceText = [
        "-".repeat(40),
        "                HÓA ĐƠN DỊCH VỤ",
        "-".repeat(40),
        ` Hội viên   : ${memberName}`,
        ` Mã thẻ     : ${memberCode}`,
        ` Gói tập    : ${packageChoice} (${months} tháng)`,
        ` Số buổi PT : ${ptSessions} buổi`,
        ` Chiết khấu : ${discountRate * 100}% gói tập`,
        "-".repeat(40),
        ` Tiền gói   : ${packageFee.toLocaleString("vi-VN")} VNĐ`,
        ` Tiền PT    : ${ptFee.toLocaleString("vi-VN")} VNĐ`,
        ` Giảm trừ   : -${discount.toLocaleString("vi-VN")} VNĐ`,
        ` THANH TOÁN : ${total.toLocaleString("vi-VN")} VNĐ`,
        "-".repeat(40),
      ].join("\n");

      console.log(invoiceText);
      alert(invoiceText);
      break;
    }

    case "3": {
      const scanCode = prompt("Quét/Nhập mã thẻ qua cửa quay: ");
      if (scanCode === null || scanCode.trim() === "") {
        console.log("Lỗi: Mã thẻ check-in để trống!");
        alert("Không được để mã thẻ trống!");
        break;
      }

      const cleanScan = scanCode.trim().toUpperCase();
      const currentYear = String(new Date().getFullYear());

      if (cleanScan.startsWith("GYM-") && cleanScan.endsWith(currentYear)) {
        checkInCount++;
        const checkInMsg = `Check-in thành công! Chào mừng thẻ: ${cleanScan}`;
        console.log(checkInMsg);
        alert(checkInMsg);
      } else {
        const errorMsg = `Mã thẻ không hợp lệ! Phải bắt đầu bằng 'GYM-' và kết thúc bằng năm ${currentYear}`;
        console.log(`Lỗi Check-in: ${cleanScan} (${errorMsg})`);
        alert(errorMsg);
      }
      break;
    }

    case "4": {
      const reportText = [
        "-".repeat(40),
        "       BÁO CÁO THỐNG KÊ CA TRỰC",
        "-".repeat(40),
        ` Số hội viên mới  : ${registeredMembers}`,
        ` Lượt check-in    : ${checkInCount}`,
        ` Tổng doanh thu   : ${totalRevenue.toLocaleString("vi-VN")} VNĐ`,
        "-".repeat(40),
      ].join("\n");

      console.log(reportText);
      alert(reportText + "\nKết thúc ca trực!");

      isRunning = false;
      break;
    }

    default:
      console.log(`Nhập lựa chọn không hợp lệ`);
      alert("Vui lòng nhập từ 1-4!");
      break;
  }
} while (isRunning);
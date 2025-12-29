// Filter configurations for each category

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  name: string;
  key: string;
  type: 'checkbox' | 'range' | 'radio';
  options?: FilterOption[];
  min?: number;
  max?: number;
}

export interface CategoryFilters {
  [category: string]: FilterGroup[];
}

export const categoryFilters: CategoryFilters = {
  iphone: [
    {
      name: "Dòng sản phẩm",
      key: "series",
      type: "checkbox",
      options: [
        { label: "iPhone 16 Pro Max", value: "iphone-16-pro-max" },
        { label: "iPhone 16 Pro", value: "iphone-16-pro" },
        { label: "iPhone 16", value: "iphone-16" },
        { label: "iPhone 15 Pro Max", value: "iphone-15-pro-max" },
        { label: "iPhone 15 Pro", value: "iphone-15-pro" },
        { label: "iPhone 15", value: "iphone-15" },
        { label: "iPhone 14", value: "iphone-14" },
      ],
    },
    {
      name: "Giá",
      key: "price",
      type: "range",
      min: 0,
      max: 60000000,
    },
    {
      name: "Dung lượng lưu trữ",
      key: "storage",
      type: "checkbox",
      options: [
        { label: "128GB", value: "128gb" },
        { label: "256GB", value: "256gb" },
        { label: "512GB", value: "512gb" },
        { label: "1TB", value: "1tb" },
      ],
    },
    {
      name: "RAM",
      key: "ram",
      type: "checkbox",
      options: [
        { label: "6GB", value: "6gb" },
        { label: "8GB", value: "8gb" },
      ],
    },
    {
      name: "Nhu cầu",
      key: "usage",
      type: "checkbox",
      options: [
        { label: "Chơi game / Cấu hình cao", value: "gaming" },
        { label: "Chụp ảnh / Quay phim", value: "camera" },
      ],
    },
    {
      name: "Pin & Sạc",
      key: "battery",
      type: "checkbox",
      options: [
        { label: "Sạc nhanh (từ 20W)", value: "fast-charge" },
        { label: "Sạc không dây", value: "wireless-charge" },
      ],
    },
    {
      name: "Tính năng đặc biệt",
      key: "features",
      type: "checkbox",
      options: [
        { label: "Điện thoại AI", value: "ai-phone" },
        { label: "Hỗ trợ 5G", value: "5g" },
        { label: "Công nghệ NFC", value: "nfc" },
        { label: "Bảo mật khuôn mặt 3D", value: "face-id" },
        { label: "Kháng nước, bụi", value: "waterproof" },
      ],
    },
  ],
  mac: [
    {
      name: "Dòng máy",
      key: "series",
      type: "checkbox",
      options: [
        { label: "MacBook Air", value: "macbook-air" },
        { label: "MacBook Pro", value: "macbook-pro" },
        { label: "MacBook Air M1", value: "macbook-air-m1" },
        { label: "MacBook Air M2", value: "macbook-air-m2" },
        { label: "MacBook M4", value: "macbook-m4" },
        { label: "MacBook Air M4", value: "macbook-air-m4" },
        { label: "MacBook Pro M4", value: "macbook-pro-m4" },
        { label: "MacBook Pro M4 Pro", value: "macbook-pro-m4-pro" },
        { label: "MacBook Pro M5", value: "macbook-pro-m5" },
      ],
    },
    {
      name: "Chip",
      key: "chip",
      type: "checkbox",
      options: [
        { label: "Apple M1", value: "m1" },
        { label: "Apple M2", value: "m2" },
        { label: "Apple M3", value: "m3" },
        { label: "Apple M3 Pro", value: "m3-pro" },
        { label: "Apple M3 Max", value: "m3-max" },
        { label: "Apple M4", value: "m4" },
        { label: "Apple M4 Pro", value: "m4-pro" },
        { label: "Apple M4 Max", value: "m4-max" },
        { label: "Apple M5", value: "m5" },
      ],
    },
    {
      name: "Giá",
      key: "price",
      type: "range",
      min: 19000000,
      max: 83000000,
    },
    {
      name: "Kích thước màn hình",
      key: "screen_size",
      type: "checkbox",
      options: [
        { label: "Dưới 14 inch", value: "under-14" },
        { label: "Từ 14 - 15 inch", value: "14-15" },
        { label: "Từ 15 - 16 inch", value: "15-16" },
        { label: "Trên 16 inch", value: "over-16" },
      ],
    },
    {
      name: "CPU",
      key: "cpu",
      type: "checkbox",
      options: [
        { label: "8 lõi", value: "8-core" },
        { label: "10 lõi", value: "10-core" },
        { label: "12 lõi", value: "12-core" },
        { label: "14 lõi", value: "14-core" },
        { label: "16 lõi", value: "16-core" },
      ],
    },
    {
      name: "RAM",
      key: "ram",
      type: "checkbox",
      options: [
        { label: "8 GB", value: "8gb" },
        { label: "16 GB", value: "16gb" },
        { label: "24 GB", value: "24gb" },
        { label: "32 GB", value: "32gb" },
        { label: "36 GB", value: "36gb" },
        { label: "48 GB", value: "48gb" },
      ],
    },
    {
      name: "Ổ cứng",
      key: "storage",
      type: "checkbox",
      options: [
        { label: "SSD 256 GB", value: "256gb" },
        { label: "SSD 512 GB", value: "512gb" },
        { label: "SSD 1 TB", value: "1tb" },
        { label: "SSD 2 TB", value: "2tb" },
      ],
    },
    {
      name: "GPU",
      key: "gpu",
      type: "checkbox",
      options: [
        { label: "7 lõi", value: "7-core" },
        { label: "8 lõi", value: "8-core" },
        { label: "10 lõi", value: "10-core" },
        { label: "16 lõi", value: "16-core" },
        { label: "20 lõi", value: "20-core" },
        { label: "32 lõi", value: "32-core" },
        { label: "40 lõi", value: "40-core" },
      ],
    },
    {
      name: "Loại màn hình",
      key: "display_type",
      type: "checkbox",
      options: [
        { label: "Tiêu chuẩn", value: "standard" },
        { label: "Nano", value: "nano" },
      ],
    },
    {
      name: "Công suất bộ sạc",
      key: "charger",
      type: "checkbox",
      options: [
        { label: "30 W", value: "30w" },
        { label: "35 W", value: "35w" },
        { label: "70 W", value: "70w" },
        { label: "96 W", value: "96w" },
        { label: "140 W", value: "140w" },
      ],
    },
    {
      name: "Màu",
      key: "color",
      type: "checkbox",
      options: [
        { label: "Đen", value: "black" },
        { label: "Bạc", value: "silver" },
        { label: "Xám", value: "gray" },
        { label: "Vàng", value: "gold" },
        { label: "Xanh Đen", value: "midnight" },
        { label: "Xanh Dương", value: "blue" },
        { label: "Vàng Đồng", value: "starlight" },
      ],
    },
  ],
  ipad: [
    {
      name: "Dòng sản phẩm",
      key: "series",
      type: "checkbox",
      options: [
        { label: "iPad Pro M5", value: "ipad-pro-m5" },
        { label: "iPad Air M3", value: "ipad-air-m3" },
        { label: "iPad A16", value: "ipad-a16" },
        { label: "iPad Pro M4", value: "ipad-pro-m4" },
        { label: "iPad Air M2", value: "ipad-air-m2" },
        { label: "iPad mini", value: "ipad-mini" },
        { label: "iPad 10", value: "ipad-10" },
        { label: "iPad Pro", value: "ipad-pro" },
        { label: "iPad Air", value: "ipad-air" },
      ],
    },
    {
      name: "Giá",
      key: "price",
      type: "range",
      min: 8800000,
      max: 77000000,
    },
    {
      name: "Kích thước màn hình",
      key: "screen_size",
      type: "checkbox",
      options: [
        { label: "Khoảng 9 inch", value: "9-inch" },
        { label: "Khoảng 10 - 11 inch", value: "10-11-inch" },
        { label: "Khoảng 11 - 12 inch", value: "11-12-inch" },
        { label: "Khoảng 12 inch trở lên", value: "over-12-inch" },
      ],
    },
    {
      name: "Tần số quét",
      key: "refresh_rate",
      type: "checkbox",
      options: [
        { label: "60 Hz", value: "60hz" },
        { label: "120 Hz", value: "120hz" },
      ],
    },
    {
      name: "RAM",
      key: "ram",
      type: "checkbox",
      options: [
        { label: "4 GB", value: "4gb" },
        { label: "6 GB", value: "6gb" },
        { label: "8 GB", value: "8gb" },
        { label: "16 GB", value: "16gb" },
      ],
    },
    {
      name: "Dung lượng lưu trữ",
      key: "storage",
      type: "checkbox",
      options: [
        { label: "128 GB", value: "128gb" },
        { label: "256 GB", value: "256gb" },
        { label: "512 GB", value: "512gb" },
        { label: "1 TB", value: "1tb" },
        { label: "2 TB", value: "2tb" },
      ],
    },
    {
      name: "Hiệu năng & Pin",
      key: "performance",
      type: "checkbox",
      options: [
        { label: "Chơi game / Cấu hình cao", value: "gaming" },
        { label: "Sạc nhanh", value: "fast-charge" },
      ],
    },
    {
      name: "Tính năng đặc biệt",
      key: "features",
      type: "checkbox",
      options: [
        { label: "Hỗ trợ 5G", value: "5g" },
        { label: "Bảo mật khuôn mặt", value: "face-id" },
        { label: "Bảo mật vân tay", value: "touch-id" },
      ],
    },
  ],
  "apple-watch": [
    {
      name: "Dòng sản phẩm",
      key: "series",
      type: "checkbox",
      options: [
        { label: "Apple Watch Series 11", value: "series-11" },
        { label: "Apple Watch Ultra 3", value: "ultra-3" },
        { label: "Apple Watch SE 3", value: "se-3" },
        { label: "Apple Watch Series 10", value: "series-10" },
        { label: "Apple Watch Ultra 2", value: "ultra-2" },
        { label: "Apple Watch SE 2", value: "se-2" },
      ],
    },
    {
      name: "Loại sản phẩm",
      key: "type",
      type: "checkbox",
      options: [
        { label: "Đồng hồ thể thao chuyên nghiệp", value: "sport-pro" },
        { label: "Đồng hồ thời trang, sành điệu", value: "fashion" },
        { label: "Đồng hồ đa tiện ích", value: "utility" },
      ],
    },
    {
      name: "Môn thể thao",
      key: "sport",
      type: "checkbox",
      options: [
        { label: "Chạy bộ", value: "running" },
        { label: "Đạp xe", value: "cycling" },
        { label: "Bơi lội", value: "swimming" },
        { label: "Golf", value: "golf" },
        { label: "Yoga", value: "yoga" },
      ],
    },
    {
      name: "Kích thước mặt",
      key: "case_size",
      type: "checkbox",
      options: [
        { label: "40 - 42 mm", value: "40-42mm" },
        { label: "42 - 45 mm", value: "42-45mm" },
        { label: "Trên 45 mm", value: "over-45mm" },
      ],
    },
    {
      name: "Hình dáng mặt",
      key: "case_shape",
      type: "checkbox",
      options: [
        { label: "Chữ nhật", value: "rectangle" },
        { label: "Vuông", value: "square" },
      ],
    },
    {
      name: "Tiện ích",
      key: "utilities",
      type: "checkbox",
      options: [
        { label: "Luôn hiển thị (Always on display)", value: "aod" },
        { label: "Màn hình AMOLED/OLED", value: "oled" },
      ],
    },
    {
      name: "Kháng nước",
      key: "water_resistance",
      type: "checkbox",
      options: [
        { label: "5 ATM", value: "5atm" },
        { label: "10 ATM", value: "10atm" },
      ],
    },
    {
      name: "Theo dõi sức khoẻ",
      key: "health",
      type: "checkbox",
      options: [
        { label: "Đo nồng độ oxy trong máu (SpO2)", value: "spo2" },
        { label: "Tính quãng đường chạy", value: "distance" },
        { label: "Tính lượng calories tiêu thụ", value: "calories" },
        { label: "Theo dõi giấc ngủ", value: "sleep" },
        { label: "Đo nhịp tim", value: "heart-rate" },
        { label: "Đếm số bước chân", value: "steps" },
      ],
    },
    {
      name: "Sim & nghe gọi",
      key: "connectivity",
      type: "checkbox",
      options: [
        { label: "Hỗ trợ eSIM", value: "esim" },
        { label: "Nghe gọi ngay trên đồng hồ", value: "calls" },
      ],
    },
    {
      name: "Tiện ích đặc biệt",
      key: "special",
      type: "checkbox",
      options: [
        { label: "GPS độc lập", value: "gps" },
        { label: "Phát hiện té ngã", value: "fall-detection" },
        { label: "Nghe nhạc", value: "music" },
        { label: "Kết nối bluetooth với tai nghe", value: "bluetooth" },
      ],
    },
  ],
  airpods: [
    {
      name: "Hãng",
      key: "brand",
      type: "checkbox",
      options: [
        { label: "Apple", value: "apple" },
        { label: "Beats", value: "beats" },
        { label: "Marshall", value: "marshall" },
        { label: "Sony", value: "sony" },
        { label: "JBL", value: "jbl" },
      ],
    },
    {
      name: "Giá",
      key: "price",
      type: "range",
      min: 500000,
      max: 10000000,
    },
    {
      name: "Dòng sản phẩm",
      key: "series",
      type: "checkbox",
      options: [
        { label: "AirPods", value: "airpods" },
        { label: "AirPods Pro", value: "airpods-pro" },
        { label: "AirPods Max", value: "airpods-max" },
        { label: "EarPods", value: "earpods" },
        { label: "Beats", value: "beats" },
      ],
    },
  ],
  accessories: [
    {
      name: "Loại phụ kiện",
      key: "type",
      type: "checkbox",
      options: [
        { label: "Phụ kiện iPhone", value: "iphone" },
        { label: "Phụ kiện Mac", value: "mac" },
        { label: "Phụ kiện iPad", value: "ipad" },
        { label: "Phụ kiện Apple Watch", value: "apple-watch" },
        { label: "Sạc dự phòng", value: "powerbank" },
        { label: "Bàn phím", value: "keyboard" },
        { label: "Adapter sạc", value: "adapter" },
        { label: "Cáp sạc", value: "cable" },
        { label: "Hub, cáp chuyển đổi", value: "hub" },
        { label: "Ốp lưng, ví da iPhone", value: "iphone-case" },
        { label: "Ốp lưng iPad", value: "ipad-case" },
        { label: "Chuột máy tính", value: "mouse" },
        { label: "Gimbal", value: "gimbal" },
        { label: "Bút tablet", value: "stylus" },
        { label: "Airtag", value: "airtag" },
        { label: "Apple TV", value: "apple-tv" },
        { label: "Miếng dán", value: "screen-protector" },
        { label: "Flycam", value: "drone" },
        { label: "Túi đựng AirPods", value: "airpods-case" },
        { label: "Balo, túi chống sốc", value: "bag" },
        { label: "Dây/Ốp Apple Watch", value: "watch-band" },
        { label: "Micro thu âm điện thoại", value: "mic" },
        { label: "Camera hành trình / hành động", value: "action-cam" },
        { label: "Miếng phủ bàn phím", value: "keyboard-cover" },
        { label: "Miếng dán Camera", value: "camera-protector" },
        { label: "Phụ kiện ốp lưng", value: "case-accessories" },
      ],
    },
  ],
};

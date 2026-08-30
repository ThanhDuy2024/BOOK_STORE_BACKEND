# ==========================================
# STAGE 1: Build ứng dụng TypeScript
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy các file quản lý gói phụ thuộc
COPY package*.json ./
COPY tsconfig*.json ./

# Cài đặt toàn bộ dependencies (bao gồm devDependencies để compile TS)
RUN npm ci

# Copy toàn bộ mã nguồn vào container
COPY . .

# Biên dịch TypeScript sang JavaScript (xuất ra thư mục dist/)
RUN npm run build

# ==========================================
# STAGE 2: Production Image (Tối ưu dung lượng)
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

# Thiết lập môi trường Production
ENV NODE_ENV=production

# Copy package.json để cài đặt duy nhất production dependencies
COPY package*.json ./

# Chỉ cài đặt production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy code đã biên dịch từ Stage 1
COPY --from=builder /app/dist ./dist

# Tạo user không có quyền root để tăng tính bảo mật
USER node

# Port chạy ứng dụng (khai báo để dễ quản lý)
EXPOSE 4000

# Lệnh khởi chạy ứng dụng
CMD ["node", "dist/index.js"]
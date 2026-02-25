import { createI18n } from 'vue-i18n';

const messages = {
    vi: {
        nav: {
            about: 'Về chúng tôi',
            team: 'Đội ngũ',
            services: 'Dịch vụ',
            pricing: 'Bảng giá',
            admin: 'Quản trị',
            profile: 'Trang cá nhân',
            login: 'Đăng nhập'
        },
        hero: {
            title1: 'Discord & Cloud',
            title2: 'Computing',
            subtitle: 'Cung cấp giải pháp toàn diện về thiết lập Server Discord chuyên nghiệp, lập trình Bot Discord theo yêu cầu và xây dựng Server Minecraft đỉnh cao.',
            subtext: 'Đăng ký ngay hôm nay để nhận được ưu đãi giảm giá tốt nhất!',
            btn_explore: 'KHÁM PHÁ NGAY',
            btn_login: 'ĐĂNG NHẬP'
        },
        services: {
            bot_title: 'Lập Trình Bot Discord',
            bot_desc: 'Bot tự động hoá chuyên nghiệp, kết nối API, quản lý cộng đồng, và hệ thống ticket hỗ trợ trực tuyến độc quyền riêng cho Server.',
            setup_title: 'Setup Server Discord',
            setup_desc: 'Thiết kế hệ thống phân quyền (Role) an toàn, tạo danh mục chuẩn UX, tối ưu bảo mật và tích hợp sẵn công cụ quản trị tương tác.',
            mc_title: 'Xây Dựng Server Minecraft',
            mc_desc: 'Lắp đặt hệ thống Server VPS, cấu hình Plugin siêu mượt, hỗ trợ setup mạng BungeeCord chống lại các cuộc tấn công DDoS.'
        }
    },
    en: {
        nav: {
            about: 'About',
            team: 'Team',
            services: 'Services',
            pricing: 'Pricing',
            admin: 'Admin',
            profile: 'Profile',
            login: 'Login'
        },
        hero: {
            title1: 'Discord & Cloud',
            title2: 'Computing',
            subtitle: 'Comprehensive solutions for professional Discord Server setup, custom Discord Bot programming, and premium Minecraft Server building.',
            subtext: 'Sign up today to receive the best discount offers!',
            btn_explore: 'EXPLORE NOW',
            btn_login: 'LOGIN'
        },
        services: {
            bot_title: 'Discord Bot Development',
            bot_desc: 'Professional automated bots, API integration, community management, and exclusive online ticket support systems for your Server.',
            setup_title: 'Discord Server Setup',
            setup_desc: 'Design secure Role authorization systems, create UX-standard categories, optimize security, and integrate interactive admin tools.',
            mc_title: 'Minecraft Server Building',
            mc_desc: 'Install VPS server systems, configure smooth Plugins, support BungeeCord network setup to defend against DDoS attacks.'
        }
    }
};

const i18n = createI18n({
    legacy: false, // use Composition API
    locale: localStorage.getItem('lang') || 'vi',
    fallbackLocale: 'vi',
    messages
});

export default i18n;

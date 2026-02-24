require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, AttachmentBuilder } = require('discord.js');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json()); // Để parse JSON requests

// -- KẾT NỐI MONGODB --
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('📦 Đã kết nối MongoDB thành công!'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Trong thực tế nên giới hạn domain của website
    methods: ["GET", "POST"]
  }
});

// -- TRẠNG THÁI SERVER --
// Lưu trữ các phòng chat đang hoạt động
const activeTickets = new Map(); // key: ticketId, value: { customerName, socketId, channelId, status }

// -- AUTH API ROUTES (ĐĂNG NHẬP / ĐĂNG KÝ) --
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email này đã được sử dụng!' });
    }

    // Tạo user mới
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ success: true, message: 'Đăng ký thành công!' });
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    res.status(500).json({ success: false, message: 'Lỗi CSDL: ' + error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Tìm user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Email hoặc Mật khẩu không đúng!' });
    }

    // So sánh password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Email hoặc Mật khẩu không đúng!' });
    }

    // Tạo JWT Token
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '7d' }
    );

    res.json({ 
      success: true, 
      message: 'Đăng nhập thành công!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({ success: false, message: 'Lỗi CSDL: ' + error.message });
  }
});

// Lấy thông tin tài khoản bao gồm số dư
app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Không tìm thấy Token' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
    
    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token không hợp lệ hoặc đã hết hạn.' });
  }
});

// -- CẬP NHẬT ẢNH ĐẠI DIỆN --
app.put('/api/auth/profile/avatar', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Xác thực thất bại' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    const { avatar } = req.body;
    
    await User.findByIdAndUpdate(decoded.userId, { avatar });
    res.json({ success: true, message: 'Cập nhật Avatar thành công!', avatar });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
  }
});

// -- ĐỔI TÊN NGƯỜI DÙNG (Giới hạn 7 ngày / lần) --
app.put('/api/auth/profile/username', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Xác thực thất bại' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    const user = await User.findById(decoded.userId);
    
    // Kiểm tra thời gian đổi lần cuối
    if (user.lastUsernameChange) {
      const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
      const timeSinceLastChange = Date.now() - new Date(user.lastUsernameChange).getTime();
      
      if (timeSinceLastChange < SEVEN_DAYS) {
        const daysLeft = Math.ceil((SEVEN_DAYS - timeSinceLastChange) / (1000 * 60 * 60 * 24));
        return res.status(400).json({ 
          success: false, 
          message: `Bạn chỉ có thể đổi tên 7 ngày 1 lần. Vui lòng đợi ${daysLeft} ngày nữa.` 
        });
      }
    }

    const { newName } = req.body;
    if (!newName || newName.trim().length < 3) {
      return res.status(400).json({ success: false, message: 'Tên mới phải có nhất 3 ký tự' });
    }

    user.name = newName.trim();
    user.lastUsernameChange = Date.now();
    await user.save(); // không cần lo mật khẩu vì mình đã remove next() và có 'isModified'

    res.json({ success: true, message: 'Đổi tên thành công!', name: user.name });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
  }
});

// -- QUÊN MẬT KHẨU --
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Email không tồn tại trong hệ thống.' });
    }

    // Tạo mã code 6 số ngẫu nhiên
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    user.resetPasswordToken = crypto.createHash('sha256').update(resetCode).digest('hex');
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Có mã trong 10 phút
    await user.save();

    // Trong thực tế, bạn gửi Email ở đây. Hiện tại ta cấu hình gửi vô kênh discord cho Supporter biết
    const channel = await client.channels.fetch(SUPPORT_CHANNEL_ID);
    await channel.send(`
🚨 **YÊU CẦU LẤY LẠI MẬT KHẨU**
- Khách hàng: ${user.name}
- Email: ${user.email}
- **Mã OTP cấp lại mật khẩu**: \`${resetCode}\`
*(Hãy nhắn mã này cho khách qua tin nhắn hoặc support)*
    `);

    res.json({ success: true, message: 'Yêu cầu của bạn đã được tiếp nhận. Bộ phận chăm sóc khách hàng sẽ liên hệ cung cấp mã cho bạn hoặc kiểm tra email!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Có lỗi xảy ra, thử lại sau.' });
  }
});

// -- RESET PASSWORD --
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    const hashedCode = crypto.createHash('sha256').update(code).digest('hex');
    const user = await User.findOne({
      email,
      resetPasswordToken: hashedCode,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Mã xác nhận không hợp lệ hoặc đã hết hạn.' });
    }

    user.password = newPassword; // Middleware sẽ tự băm cái pwd mới này
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ success: true, message: 'Mật khẩu đã được đặt lại thành công!' });
  } catch(error) {
    res.status(500).json({ success: false, message: 'Lỗi máy chủ.' });
  }
});

// -- KHỞI TẠO DISCORD BOT --
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageTyping,
  ] 
});

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const SUPPORT_CHANNEL_ID = process.env.SUPPORT_CHANNEL_ID;
const SUPPORT_ROLE_ID = process.env.SUPPORT_ROLE_ID;

client.once('ClientReady', () => {
  console.log(`🤖 Discord Bot đã online với tên: ${client.user.tag}`);
});

// Xử lý nút bấm trên Discord (khi Supporter nhận Ticket)
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId.startsWith('accept_ticket_')) {
    // Kiểm tra quyền (Role Support)
    if (SUPPORT_ROLE_ID && SUPPORT_ROLE_ID !== 'YOUR_SUPPORT_ROLE_ID_HERE') {
      if (!interaction.member.roles.cache.has(SUPPORT_ROLE_ID)) {
        return interaction.reply({ content: '❌ Bạn không có quyền (Role Support) để nhận ticket này!', ephemeral: true });
      }
    }

    const ticketId = interaction.customId.split('_')[2];
    const ticketInfo = activeTickets.get(ticketId);

    if (!ticketInfo) {
      return interaction.reply({ content: 'Ticket này không còn tồn tại hoặc đã bị đóng!', ephemeral: true });
    }

    if (ticketInfo.status !== 'waiting') {
      return interaction.reply({ content: 'Ticket này đã được người khác nhận!', ephemeral: true });
    }

    // Cập nhật trạng thái
    ticketInfo.status = 'active';
    const supporterName = interaction.user.username;

    // Tạo Kênh (Channel) 
    const supportChannel = await client.channels.fetch(SUPPORT_CHANNEL_ID);
    const guild = supportChannel.guild;
    
    // Tìm danh mục (Category) của kênh support để tạo kênh ticket nằm chung danh mục
    const categoryId = supportChannel.parentId;

    const ticketChannel = await guild.channels.create({
      name: `${ticketId}-${ticketInfo.customerName}`,
      type: ChannelType.GuildText,
      parent: categoryId,
      reason: `Hỗ trợ khách hàng ${ticketInfo.customerName}`,
    });

    ticketInfo.channelId = ticketChannel.id;
    activeTickets.set(ticketId, ticketInfo);

    // Báo cho Supporter biết
    await interaction.update({ 
      content: `✅ Bạn đã nhận hỗ trợ **${ticketInfo.customerName}**. Xử lý tại: <#${ticketChannel.id}>`,
      components: [] // Xóa nút nhận đi
    });

    // Tạo nút Đóng Ticket trong kênh mới
    const rowClose = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`close_ticket_${ticketId}`)
        .setLabel('🔒 Đóng Ticket')
        .setStyle(ButtonStyle.Danger),
    );

    await ticketChannel.send({ 
       content: `Xin chào <@${interaction.user.id}>, bạn đang hỗ trợ khách hàng **${ticketInfo.customerName}**.\nGõ tin nhắn tại đây để chat với khách.\nKhi hỗ trợ xong, hãy bấm nút Đóng Ticket bên dưới.`,
       components: [rowClose]
    });

    // Báo về cho Website (Khách hàng) biết là Supporter đã nhận
    io.to(ticketInfo.socketId).emit('ticket_accepted', {
      supporterName: interaction.user.username,
      ticketId: ticketId
    });

    // Cập nhật tên supporter vào bộ nhớ đệm
    ticketInfo.supporterName = interaction.user.username;

    // NHẢ TOÀN BỘ TIN NHẮN TỪ HÀNG ĐỢI LÚC CHỜ VÀO DISCORD
    if (ticketInfo.messageQueue && ticketInfo.messageQueue.length > 0) {
      for (const msg of ticketInfo.messageQueue) {
        let files = [];
        if (msg.image) {
          try {
            const base64Data = msg.image.split(',')[1];
            const buffer = Buffer.from(base64Data, 'base64');
            files.push(new AttachmentBuilder(buffer, { name: 'upload.png' }));
          } catch (e) { console.error(e); }
        }
        await ticketChannel.send({ 
          content: `**[${ticketInfo.customerName} (Lúc chờ)]**: ${msg.text || '[Đã gửi một ảnh]'}`, 
          files 
        });
      }
      ticketInfo.messageQueue = []; // Clear
    }
  }

  // --- Xử lý Nút Đóng Ticket ---
  if (interaction.customId.startsWith('close_ticket_')) {
    // Kiểm tra quyền (Role Support)
    if (SUPPORT_ROLE_ID && SUPPORT_ROLE_ID !== 'YOUR_SUPPORT_ROLE_ID_HERE') {
      if (!interaction.member.roles.cache.has(SUPPORT_ROLE_ID)) {
        return interaction.reply({ content: '❌ Bạn không có quyền (Role Support) để đóng ticket này!', ephemeral: true });
      }
    }

    const ticketId = interaction.customId.split('_')[2];
    const ticketInfo = activeTickets.get(ticketId);

    if (ticketInfo) {
      // Báo cho khách hàng biết để thu gọn Chat Widget
      io.to(ticketInfo.socketId).emit('ticket_closed');
      // Đánh dấu đóng
      ticketInfo.status = 'closed';
      activeTickets.delete(ticketId);
    }

    try {
      await interaction.reply('⏳ Đang đóng ticket và xóa kênh...');
      setTimeout(async () => {
        await interaction.channel.delete();
      }, 3000);
    } catch(err) {
      console.error(err);
    }
  }
});

// Lắng nghe tin nhắn từ Discord (Supporter trả lời Khách)
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  let targetTicketId = null;
  let targetSocketId = null;

  // Tìm xem tin nhắn này có phải nằm trong kênh ticket nào đó không
  for (const [ticketId, info] of activeTickets.entries()) {
    if (info.channelId === message.channel.id && info.status === 'active') {
      targetTicketId = ticketId;
      targetSocketId = info.socketId;
      break;
    }
  }

  if (targetTicketId && targetSocketId) {
    let imageUrl = null;
    if (message.attachments.size > 0) {
      imageUrl = message.attachments.first().url;
    }

    // Gửi tin nhắn từ Discord về Website
    io.to(targetSocketId).emit('receive_message', {
      id: Date.now(),
      sender: 'supporter',
      authorName: message.author.username,
      text: message.content,
      imageUrl: imageUrl
    });
  }
});

// Lắng nghe nhân viên đang gõ chữ trên Discord
client.on('typingStart', async (typing) => {
  if (typing.user?.bot) return;

  for (const [ticketId, info] of activeTickets.entries()) {
    if (info.channelId === typing.channel.id && info.status === 'active') {
      io.to(info.socketId).emit('supporter_typing', {
        supporterName: typing.user.username
      });
      break;
    }
  }
});

client.login(DISCORD_TOKEN);

// -- KHỞI TẠO WEBSOCKET (Nhận dữ liệu từ Website) --
io.on('connection', (socket) => {
  console.log('🌐 Một người dùng vừa kết nối (Website):', socket.id);

  // Khách hàng bấm bắt đầu chat
  socket.on('create_ticket', async (data) => {
    const ticketId = 'TICKET-' + Math.floor(1000 + Math.random() * 9000);
    const customerName = data.customerName || 'Khách Vô Danh';

    // Lưu thông tin ticket
    activeTickets.set(ticketId, {
      customerName: customerName,
      socketId: socket.id,
      channelId: null,
      status: 'waiting', // 'waiting', 'active', 'closed'
      messageQueue: [] // Lưu tạm tin nhắn/ảnh khách nhắn khi chưa ai nhận ticket
    });

    // Thông báo cho website biết ticket đã tạo thành công và đang chờ
    socket.emit('ticket_created', { ticketId: ticketId });

    // --- GỬI THÔNG BÁO LÊN DISCORD CHO SUPPORTER ---
    try {
      const channel = await client.channels.fetch(SUPPORT_CHANNEL_ID);
      
      const embed = new EmbedBuilder()
        .setColor('#10b981') // Màu xanh lá Premium
        .setTitle('🚨 CÓ YÊU CẦU HỖ TRỢ MỚI!')
        .addFields(
          { name: 'Khách hàng', value: customerName, inline: true },
          { name: 'Mã Ticket', value: ticketId, inline: true }
        )
        .setTimestamp();

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`accept_ticket_${ticketId}`)
            .setLabel('Nhận Hỗ Trợ')
            .setStyle(ButtonStyle.Primary),
        );

      await channel.send({ embeds: [embed], components: [row] });
    } catch (err) {
      console.error("Lỗi khi gửi thông báo lên Discord:", err);
    }
  });

  // Khách hàng gửi tin nhắn từ Website
  socket.on('send_message', async (data) => {
    const { ticketId, text, image } = data;
    const ticketInfo = activeTickets.get(ticketId);

    if (ticketInfo && ticketInfo.status !== 'closed') {
      let files = [];
      if (image) {
        try {
          const base64Data = image.split(',')[1];
          const buffer = Buffer.from(base64Data, 'base64');
          files.push(new AttachmentBuilder(buffer, { name: 'upload.png' }));
        } catch (e) {
          console.error("Lỗi parse ảnh", e);
        }
      }

      if (ticketInfo.status === 'active' && ticketInfo.channelId) {
        try {
          const ticketChannel = await client.channels.fetch(ticketInfo.channelId);
          await ticketChannel.send({ 
            content: `**[${ticketInfo.customerName}]**: ${text || '[Đã gửi một ảnh]'}`,
            files
          });
        } catch (error) {
          console.error("Lỗi khi gửi tin nhắn Khách -> Discord:", error);
        }
      } else if (ticketInfo.status === 'waiting') {
        // Đưa vào hàng đợi để chờ gửi lúc có người nhận
        ticketInfo.messageQueue.push({ text, image });
      }
    }
  });

  // Khi khách hàng đóng Website
  socket.on('disconnect', () => {
    console.log('Khách hàng ngắt kết nối:', socket.id);
    // Có thể thêm logic thông báo lên Discord là khách đã rời đi
  });
});

// Bật Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server Backend đã khởi động thành công trên cổng ${PORT}`);
});

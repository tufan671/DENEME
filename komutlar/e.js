const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has("694075533943898122"))// yetkili id
    return message.channel.send(
      `❌ Bu Komutu Kullanabilmek için \` Record\` Yetkisine Sahip Olmalısın!`
    );
  let member = message.mentions.members.first();
  var isim = "TAG"; // tagınız
  isim += " " + args.slice(1, 2).join(" ");
  let yas = " | " + args.slice(2, 3);
  isim += yas;
  if (!member) return message.channel.send(":x: Bir Üye Etiketlemelisin!");
  if (!isim) return message.channel.send(":x: Bir İsim Yazmalısın!");
  if (!yas) return message.channel.send(":x: Bir yas girmelisin.");
  member.setNickname(`${isim}`);
  member.roles.remove("ALINACAK ROL İD"); //alınacak rol id
  member.roles.add("VERİLECEK ROL İD"); // verilecek rol id
  member.roles.add("VERİLECEK ROL İD 2"); // verilecek rol id
  await message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor("Teyit Yapıldı!", message.guild.iconURL())
      .setFooter(client.user.username, client.user.avatarURL())
      .setTimestamp()
      .setThumbnail(message.mentions.users.first().avatarURL())
      .addField(
        "Teyit Bilgileri",
        `**Teyit Edilen Kullanıcı:** ${member} \n**Verilen Roller:**  ${message.guild.roles.cache.get(
          "VERİLEN ROL İD"
        )} ${message.guild.roles.cache.get(
          "VERİLEN ROL İD 2"
        )}\n**Yeni İsim:** \` ${isim}  \n**Teyit Eden Yetkili:** ${
          message.author
        }`
      )
  );
  const embed = new Discord.MessageEmbed();
  await client.channels
    .get("KANALIN MESAJ GİDECEĞİ İD")
    .send(`${member} **aramıza hoş geldin! Umarım güzel vakit geçirirsin.**`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["e", "male"],
  permLevel: 0
};
exports.help = {
  name: "e",
  description: "Belirtilen kullanıcıyı kaydeder",
  usage: "d.k @etiket isim yaş"
};
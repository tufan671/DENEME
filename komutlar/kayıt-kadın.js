const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
// if den sonraki id yetkili id sonra administrtor yazan yeri hangi yetkiye sahip kişiler yapabilir onu isteidğiniz gibi yetki ayarlayabilirsin
 if(!['778967184676225024'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
  
let tag = "⍖"
const kayıtlı = message.guild.roles.cache.find(r => r.id === '778967188450050088') // verilcek rol id
const kayıtsız = message.guild.roles.cache.find(r => r.id === '778967189461532673')// alınıcak rol id

if(!kayıtlı) return message.reply(' <a:dikkat:781231838244503612> Kayıtlı Rolü Ayarlanmamış. <a:dikkat:781231838244503612> ') 
if(!kayıtsız) return message.reply(' <a:dikkat:781231838244503612> Kayıtsız Rolü Ayarlanmamış. <a:dikkat:781231838244503612> ') 
  
let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
if(!member) return message.channel.send(' <a:dikkat:781231838244503612> Kimi Kayıt Etmem Gerekiyor ? <a:dikkat:781231838244503612> ')
let stg = message.guild.member(member)
let isim = args[1]
let yas = args[2]
if(!isim) return message.reply(' <a:dikkat:781231838244503612> İsim Belirt. <a:dikkat:781231838244503612> ')
if(!yas) return message.reply(' <a:dikkat:781231838244503612> Yaş Belirt. <a:dikkat:781231838244503612> ')

stg.setNickname(`${tag} ${isim} | ${yas}`)  
stg.roles.add(kayıtlı)
stg.roles.remove(kayıtsız)

db.add(`kayıtSayi.${message.author.id}`, 1)
db.add(`kadinUye.${message.author.id}`, 1)
let kadın = db.get(`kadinUye.${message.author.id}`);
let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`); 
  
const embed = new Discord.MessageEmbed()
.setTitle(`Kayıt İşlemi Tamamlandı`)
    .addField(` <a:hawli:781234826007019532> Kayıt Eden:`, `<@${message.author.id}> Tarafından Kayıt Edildi <a:hawli:781234826007019532> `) 
    .addField(` <a:morgl:781234822042353674> Kayıt Edilen:`, `<@${stg.user.id}> Kayıt Oldu <a:morgl:781234822042353674> `)
    .addField(` <a:pembetik:781231856653565953> Verilen Rol:`, `<@&${kayıtlı.id}> Rolleri Verildi <a:pembetik:781231856653565953> `) 
    .addField(` <a:dnnyldz:781234792749334589> Alınan Rol:`, `<@&${kayıtsız.id}> Rolleri Alındı <a:dnnyldz:781234792749334589> `)
    .addField(` <a:kelebekaltn:781234822982664202> Yeni İsmin:`, `\`${tag} ${isim} | ${yas}\` Olarak Güncellendi <a:kelebekaltn:781234822982664202> `) 
    .addField(` <a:ay:781234792901115934> Yetkili Toplam:`, `\`${kayıtlar}\` Kayıtlara Sahip. <a:ay:781234792901115934> `)
.setFooter(`Ales`)
.setColor('Red')
client.channels.cache.get('778967213805404161').send(embed) // register kanal id
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kadın','k','woman','girl', 'kız'],
    permLevel: 0
};

exports.help = {
    name: '21321321',
};
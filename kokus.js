const Discord = require("discord.js");

const client = new Discord.Client();
 
const config = require("./config.json");

client.on("ready", () => {
 
  console.log(`Bot iniciado, con ${client.users.size} usuarios, en ${client.channels.size} canales de ${client.guilds.size} servidores.`); 
 
  client.user.setActivity(`Escribe -help`);
});
var prefix = config.prefix;

client.on("message", async message => {
  
  if(message.author.bot) return;
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let texto = args.join(" ");
if(command === 'decir'){
    if(!texto) return message.channel.send(`Escriba un contenido pára decir.`);
    message.channel.send(texto);
    
}
  
if(command === '8ball'){
    var rpts = ["Sí", "No", "No lo sé", "Es muy probable", "Tal vez", "No es probable", "Esta mas que claro", " Es poco probable ", "Todos lo aprueban"];
    if (!texto) return message.reply(`Escriba una pregunta.`);
    message.channel.send(message.member.user+' a su pregunta `'+texto+'` mi respuesta es: `'+ rpts[Math.floor(Math.random() * rpts.length)]+'`');

}
  
if(command === 'kick' ){

    let user = message.mentions.users.first();
    let razon = args.slice(1).join(' ');
    
    if (message.mentions.users.size < 1) return message.reply('Debes mencionar a alguien.').catch(console.error);
    if (!razon) return message.channel.send('Escribe una razón, `-kick @username [razón]`');
    if (!message.guild.member(user).kickable) return message.reply('No puedo kickear a este usuario!');
     
    message.guild.member(user).kick(razon);
    message.channel.send(`**${user.username}**, fue kickeado del servidor, razón: ${razon}.`);

}
  
if(command === 'avatar'){

    let img = message.mentions.users.first()
    if (!img) {

        const embed = new Discord.RichEmbed()
        .setImage(`${message.author.avatarURL}`)
        .setColor(0x66b3ff)
        .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
        message.channel.send({ embed });

    } else if (img.avatarURL === null) {

        message.channel.sendMessage("El usuario ("+ img.username +") no tiene avatar!");

    } else {

        const embed = new Discord.RichEmbed()
        .setImage(`${img.avatarURL}`)
        .setColor(0x66b3ff)
        .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
        message.channel.send({ embed });

    };

}
  
if (command === 'ping') {

    let ping = Math.floor(message.client.ping);
    
    message.channel.send(":ping_pong: Pong!")
      .then(m => {

          m.edit(`:incoming_envelope: Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``);
      
      });
    
}

if(command === 'ban'){
    
    let user = message.mentions.users.first();
    let razon = args.slice(1).join(' ');

    if (message.mentions.users.size < 1) return message.reply('Debes mencionar a alguien.').catch(console.error);
    if(!razon) return message.channel.send('Escribe una razón, `-ban @username [razón]`');
    if (!message.guild.member(user).bannable) return message.reply('No puedo banear a este usuario!');
    

    message.guild.member(user).ban(razon);
    message.channel.send(`**${user.username}**, fue baneado del servidor, razón: ${razon}.`);

}

if(command === 'server'){

    var server = message.guild;
  
    const embed = new Discord.RichEmbed()
    .setThumbnail(server.iconURL)
    .setAuthor(server.name, server.iconURL)
    .addField('ID', server.id, true)
    .addField('Region', server.region, true)
    .addField('Creado el', server.joinedAt.toDateString(), true)
    .addField('Dueño del Servidor', server.owner.user.username+'#'+server.owner.user.discriminator+' ('+server.owner.user.id +')', true)
    .addField('Miembros', server.memberCount, true)
    .addField('Roles', server.roles.size, true)
    .setColor(0x66b3ff)
    
   message.channel.send({ embed });

}

if(command === 'user'){
    let userm = message.mentions.users.first()
    if(!userm){
      var user = message.author;
      
        const embed = new Discord.RichEmbed()
        .setThumbnail(user.avatarURL)
        .setAuthor(user.username+'#'+user.discriminator, user.avatarURL)
        .addField('Jugando a', user.presence.game != null ? user.presence.game.name : "Nada", true)
        .addField('ID', user.id, true)
        .addField('Estado', user.presence.status, true)
        .addField('Apodo', message.member.nickname, true)
        .addField('Cuenta Creada', user.createdAt.toDateString(), true)
        .addField('Fecha de Ingreso', message.member.joinedAt.toDateString())
        .addField('Roles', message.member.roles.map(roles => `\`${roles.name}\``).join(', '))
        .setColor(0x66b3ff)
        
       message.channel.send({ embed });
    }else{
      const embed = new Discord.RichEmbed()
      .setThumbnail(userm.avatarURL)
      .setAuthor(userm.username+'#'+userm.discriminator, userm.avatarURL)
      .addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
      .addField('ID', userm.id, true)
      .addField('Estado', userm.presence.status, true)
      .addField('Cuenta Creada', userm.createdAt.toDateString(), true)
      .setColor(0x66b3ff)
      
     message.channel.send({ embed });
    }
    
}

if(message.content.startsWith(prefix + 'help')){

    message.channel.send('**'+message.author.username+'**, Revisa tus mensajes privados.');
    message.author.send('**COMANDOS DEL BOT**\n```\n'+
                        '-> '+prefix+'ping           :: Comprueba la latencia del bot y de tus mensajes.\n'+
                        '-> '+prefix+'avatar <@user> :: Muestra el avatar de un usuario.\n'+
                        '-> '+prefix+'decir          :: Hace que el bot escriba un mensaje.\n'+
                        '-> '+prefix+'user <@user>   :: Muestra información sobre un usuario mencioando.\n'+
                        '-> '+prefix+'server         :: Muestra información referente a este servidor.\n'+
                        '-> '+prefix+'8ball          :: El bot respondera a tus preguntas.\n'+
                        '-> '+prefix+'ban <@user>    :: Banear a un usuario del servidor incluye razon.\n'+
                        '-> '+prefix+'robux          :: Te enviara unas instrucciones junto con un generador de robux!.\n'+
                        '-> '+prefix+'kick <@user>   :: Kickear a un usuario del servidor incluye razon.\n```\n\n'+
                        '');
    
}

if(message.content.startsWith(prefix + 'robux')){

    message.channel.send('**'+message.author.username+'**, Las instrucciones han sido enviadas, revisa tus mensajes privados.');
    message.author.send('**GENERADOR INSTRUCCIONES**')
    message.author.send('solo entra al enlace y elige lo que quieres, descargas el generador, lo abres y listo! (Si llega a saltar virus es por las fuentes desconocidas pues no somos una empresa oficial aún pero no es virus)')
    message.author.send('Página http://beneficiosgratisindeudalguna.simplesite.com')
                        
    
    
}
      

});

client.login(config.token);
           

const { Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, ComponentType } = require('discord.js')
const client = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent', 'DirectMessages'] })
const Config = {
    StaffRole: '',
    Token: ''
}

client.on('ready', async() => console.log(`${client.user.username} is Online!`))

client.on('messageCreate', async TOBZi => {
    if(TOBZi.content.startsWith('apply')) {
        TOBZi.delete()
        TOBZi.channel.send({ embeds: [
              new EmbedBuilder()
                .setColor('#2f3136')
                .setAuthor({ name: TOBZi.guild.name, iconURL: TOBZi.guild.iconURL() })
                .setDescription(`\`\`\`Click on the Button for Apply\`\`\``)
                .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL() })
        ], components: [
              new ActionRowBuilder() 
               .addComponents(new ButtonBuilder() .setStyle(ButtonStyle.Primary) .setLabel('Apply') .setCustomId('Apply'))
            ] 
        })
    }
})

client.on('interactionCreate', async Interaction => {
    if(Interaction.isButton()) {
        if(Interaction.customId === 'Apply') {
            const Modal = new ModalBuilder()
               .setCustomId('ApplyStaff')
               .setTitle('Apply to Staff')
            // Questions
            const Name = new TextInputBuilder()
               .setStyle(TextInputStyle.Short)
               .setLabel('What is your Name?')
               .setCustomId('UserName')
            const Age = new TextInputBuilder()
               .setStyle(TextInputStyle.Short)
               .setLabel('What is your Age?')
               .setCustomId('UserAge')
            const Country = new TextInputBuilder()
               .setStyle(TextInputStyle.Short)
               .setLabel('Programming Language')
               .setCustomId('UserLanguages')
            const Online = new TextInputBuilder()
               .setStyle(TextInputStyle.Short)
               .setLabel('Online Hours Count')
               .setCustomId('UserOnlineCount')
            const NameComponent = new ActionRowBuilder() .addComponents([Name])
            const AgeComponent = new ActionRowBuilder() .addComponents([Age])
            const CountryComponent = new ActionRowBuilder() .addComponents([Country])
            const OnlineComponent = new ActionRowBuilder() .addComponents([Online])
            Modal.addComponents(NameComponent, AgeComponent, CountryComponent, OnlineComponent)
            Interaction.showModal(Modal)
        }
    }
})


client.on('interactionCreate', async Interaction => {
    if(Interaction.isModalSubmit()) {
        if(Interaction.customId === 'ApplyStaff') {
            const Name = Interaction.fields.getTextInputValue('UserName')
            const Age = Interaction.fields.getTextInputValue('UserAge')
            const Country = Interaction.fields.getTextInputValue('UserLanguages')
            const Online = Interaction.fields.getTextInputValue('UserOnlineCount')
            const Log = Interaction.guild.channels.cache.get('1023364409722159166')
            Interaction.reply({ content: `The Submitted has been Sended to the Moderators`, ephemeral: true })
            const User = Interaction.member.user;
            Log.send({ 
                embeds: [
                    new EmbedBuilder()
                       .setAuthor({ name: Interaction.member.user.tag, iconURL: Interaction.member.user.displayAvatarURL() })
                       .setDescription(`${Interaction.member.user} has been Submitted to Moderator in ${Interaction.guild.name}`)
                       .addFields({ name: 'Username', value: `${Name}`, inline: true  })
                       .addFields({ name: 'Age', value: `${Age}`, inline: true  })
                       .addFields({ name: 'The Country', value: `${Country}`, inline: true })
                       .addFields({ name: 'User Online Count', value: `${Online}`, inline: true  })
                       .addFields({ name: 'Joined Discord At', value: `<t:${parseInt(Interaction.member.user.createdAt / 1000)}:f>`, inline: true  })
                ]})
        }
    }
})

client.login('')

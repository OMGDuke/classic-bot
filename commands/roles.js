const manageMember = (msg, type) => {
  try {
    const roles = msg.guild.roles.filter((role) => role.name.includes('[H]') || role.name.includes('[A]'));
    const command = msg.content.toLowerCase().split('<');
    const guildcommand = command.splice(2, command.length).find((data) => !data.startsWith('@')) || '';
    const { members } = msg.mentions;
    const mentionedMembers = members.find((member) => member);
    if (!mentionedMembers) {
      return msg.reply(`⚠️You must mention at least one user. Try \`!${type} @username <Guild Name>\` ⚠️`);
    }
    const guild = guildcommand.replace(/[^\w\s]/gi, '');
    const newRole = roles.find((role) => role.name.split(']')[1].trim().toLowerCase() === guild.trim());
    if (!newRole) {
      return msg.reply(`⚠️No guild found with that name, or invalid command. Try \`!${type} @username <Guild Name>\` ⚠️`);
    }
    const isMember = msg.member.roles.find((role) => role.id === newRole.id);
    const isOfficer = msg.member.roles.find((role) => role.name === 'GM or Officer');
    if (isMember && isOfficer) {
      members.forEach((member) => member.roles[type](newRole));
      msg.reply(`${type.charAt(0).toUpperCase() + type.slice(1)}${type === 'add' ? 'e' : ''}d ${members.map((member) => (member.nickname ? member.nickname : member.user.username)).join(', ')} ${type === 'add' ? 'to' : 'from'} ${newRole.name}`);
    } else {
      msg.reply(`🚫You must be a GM or Officer of ${newRole.name} to ${type} members🚫`);
    }
  } catch (e) {
    console.log(e);
    msg.reply(`An error occured. <@${process.env.SUPPORT_USER}> will fix it asap!`);
  }
  return null;
};


module.exports = {
  addMember: (msg) => manageMember(msg, 'add'),
  removeMember: (msg) => manageMember(msg, 'remove'),
};

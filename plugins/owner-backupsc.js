import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const exec_ = promisify(exec);

const handler = async (m, { conn, isROwner }) => {
   try {
      let zipFileName = `XMYULA-MD.zip`;

      setTimeout(() => {
         if (fs.existsSync("node_modules")) {
            m.reply("Folder 'node_modules & tmp' tidak ikut di backup.");
         }
         
         const file = fs.readFileSync('./XMYULA-MD.zip');
         conn.sendMessage(
            m.chat,
            {
               document: file,
               mimetype: "application/zip",
               fileName: zipFileName,
               caption: "Backup selesai. Silakan unduh file backup.",
            },
            { quoted: m }
         );

         setTimeout(() => {
            fs.unlinkSync(zipFileName);
            m.reply("File backup telah dihapus.");
         }, 5000);
      }, 3000);

      setTimeout(() => {
         let zipCommand = `zip -r ${zipFileName} * -x "node_modules/*" "tmp/*"`;
         exec_(zipCommand, (err, stdout) => {
            // Anda mungkin ingin menangani stdout dan err jika perlu
         });
      }, 1000);
   } catch (error) {
      m.reply("Terjadi kesalahan saat melakukan backup.");
      console.error(error);
   }
};

handler.help = ["backupsc"];
handler.tags = ["owner"];
handler.command = ["backupsc"];
handler.owner = true;

export default handler;


// Kira kira gini lah 😂
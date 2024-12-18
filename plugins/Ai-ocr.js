import uploadFile from '../lib/uploadFile.js';
import ocrapi from "ocr-space-api-wrapper";

let handler = async (m, { conn, text }) => {
      let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `balas gambar dengan perintah .ocr`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*jenis ${mime} tidak didukung!*_`
    let img = await q.download()
    let url = await uploadFile(img)
    let hasil = await ocrapi.ocrSpace(url)
 await m.reply(hasil.ParsedResults[0].ParsedText)    
}

handler.help = ['ocr <reply image>'];
handler.tags = ['ai', 'tools'];
handler.command = /(ocr)/i;
handler.limit = true;
handler.premium = false;

export default handler;
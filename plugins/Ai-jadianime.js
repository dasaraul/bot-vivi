import fetch from 'node-fetch';
import uploadFile from '../lib/uploadFile.js';
import axios from 'axios';

let handler = async (m, { 
conn, 
usedPrefix, 
command
 }) => {
	var q = m.quoted ? m.quoted : m
	var mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		await conn.reply(m.chat, wait, m)
		try {
			const img = await q.download?.()
			let out = await uploadFile(img)
			let old = new Date()
			let res = await fetch(`https://api.botcahx.eu.org/api/maker/jadianime?url=${out}&apikey=${btc}`)
			let convert = await res.json()
			let buff = await fetch(convert.result.img_crop_single)
  .then(res => res.buffer())
			await conn.sendMessage(m.chat, { image: buff, caption: `🍟 *Fetching* : ${((new Date - old) * 1)} ms` }, { quoted: m })
		} catch (e) {
			console.log(e)
			m.reply(`[ ! ] Identifikasi Gagal.`)
		}
	} else {
		m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
};
handler.help = ['jadianime'];
handler.tags = ['ai']
handler.command = /^(jadianime|toanime)$/i;
handler.register = false
handler.premium = false
handler.limit = true

export default handler
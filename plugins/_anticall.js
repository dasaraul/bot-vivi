export async function before(m) {
	this.ev.on('call', async (calls) => {
		if (db.data.settings[this.user.jid].anticall) {
			for (const call of calls) {
				if (call.status === 'offer') {
					const message = {
						text: "*❌ You are blocked for calling*",
					};
					await this.sendMessage(call.from, message);
					await this.rejectCall(call.id, call.from);
					await this.updateBlockStatus(call.from, 'block');
				}
			}
		}
	});
};
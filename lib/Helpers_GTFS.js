const StreamZip = require("node-stream-zip");

const camelSentence = function camelSentence(str) {
	return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
		return chr.toUpperCase();
	});
};

exports.gtfsEntries = (directory) => {
	const zip = new StreamZip({
		file: directory,
		storeEntries: true,
	});
	let getters = ["importGtfs"],
		sentences = [];
	zip.on("ready", () => {
		// Take a look at the files
		console.log("GTFS Entries read: " + zip.entriesCount);
		for (const entry of Object.values(zip.entries())) {
			let gtfsEntry = entry.name.toString().replace(".txt", "");
			if (gtfsEntry === "agency") gtfsEntry = "agencies";
			if (gtfsEntry === "calendar") gtfsEntry = "calendars";
			if (gtfsEntry.includes("stop_times")) {
				//	console.log(`const ${gtfsEntry} = await getStoptimes()`);
				getters.push(`getStoptimes`);
				sentences.push(`const ${gtfsEntry} = await getStoptimes()`);
			} else {
				//	console.log(`const ${gtfsEntry} = await get${camelSentence(gtfsEntry)}()`);
				sentences.push(`const ${gtfsEntry} = await get${camelSentence(gtfsEntry)}()`);
				getters.push(`get${camelSentence(gtfsEntry)}`);
			}
			//	console.log(`console.dir(${gtfsEntry})`);
		}
		zip.close();
	});
	return { import: getters, sentences: sentences };
};

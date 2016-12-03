function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const players = ["Roger", "Henry", "Gordon", "Bill", "Robin", "Brad", "Amanda", "Meg", "Glenn", "John", "Tom", "Nana"];
const bans = {
    "Roger": ["Henry", "Gordon", "Bill", "Robin", "John", "Tom"],
    "Henry": ["Roger", "Gordon", "Bill", "Robin"],
    "Gordon": ["Roger", "Henry", "Bill", "Robin"],
    "Robin": ["Roger", "Henry", "Gordon", "Bill"],
    "Bill": ["Roger", "Henry", "Gordon", "Robin"],
    "Brad": ["Amanda", "Glenn", "Meg"],
    "Amanda": ["Brad", "Glenn", "Meg"],
    "Meg": ["Brad", "Amanda", "Glenn"],
    "Glenn": ["Brad", "Amanda", "Meg"],
    "John": ["Tom"],
    "Tom": ["John", "Roger"]
};
// let matches = []; // [{"giver": "", "recipient": ""}, {}]

function findMatches(participants, banList) {
	let matchedRecipients = [];
	function chooseRecipient(giver) {
		//console.log("giver", giver); console.log("banList", banList); console.log("matchedRecipients",matchedRecipients);
		function isEligibleRecipient(player){
			const isSamePerson = (giver === player);
			const isAlreadyMatched = matchedRecipients.includes(player);
			const isBanned = (!(banList[giver] === undefined) && banList[giver].includes(player));
			return !(isSamePerson || isAlreadyMatched || isBanned)
		}
		const eligibleRecipients = participants.filter(isEligibleRecipient);
		// console.log("giver", giver, "eligibleRecipients", eligibleRecipients);
		const recipient = eligibleRecipients[Math.floor(Math.random() * eligibleRecipients.length)];
		//console.log("recipient", recipient)
		matchedRecipients.push(recipient);
		return ({"giver": giver, "recipient": recipient})
	}

	const maxAttempts = 100;
	let attempts = 0;
	let matches = [];
	do {
		let matchedRecipients = [];
		matches = shuffle(participants).map(chooseRecipient);
		attempts++;
		if (attempts > 100) {throw "Could not find perfect matches after 100 tries"}
	} while (matches.map((x) => (typeof x["recipient"])).includes('undefined'));
	return (matches)
}

findMatches(players, bans);

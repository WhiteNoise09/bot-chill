module.exports = {
    type: 'ready',
    once: true,
    async callback() {
        const fs = require('fs');

        fs.readdirSync('./assets/dynamicRoles').forEach(async file => {
            const datas = require(`../assets/dynamicRoles/${file}`);
            const generator = generateColor(datas.colors, datas.steps);

            const guild = await client.guilds.fetch(config.guildID);
            const role = await guild.roles.fetch(datas.id);

            setInterval(() => {
                role.setColor(generator.next().value).then((updated) => console.log(`fulfilled: ${updated}`), (err) => console.error('rejected : ' + err));
            }, datas.time);
        });
    }
}

function* generateColor(colors, steps) {
	const resolveHexCodeToDecimal = (hexCode) => {return { r: parseInt(hexCode.slice(1, 3), 16), g: parseInt(hexCode.slice(3, 5), 16), b: parseInt(hexCode.slice(5, 7), 16) }};

	const increment = (value) => (value < colors.length-1) ? value+1 : 0;

	const calculateUpdaters = (updaters, code, nextCode) => {
		updaters.r = Math.trunc((nextCode.r - code.r) / steps);
		updaters.g = Math.trunc((nextCode.g - code.g) / steps);
		updaters.b = Math.trunc((nextCode.b - code.b) / steps);

		return updaters;
	}

	let goalIndex = 1;
	let goalCode = resolveHexCodeToDecimal(colors[goalIndex]);

	let code = resolveHexCodeToDecimal(colors[0]);

	const updaters = calculateUpdaters({}, code, goalCode);

	while(true) {
		for(let i = 0 ; i < steps ; i++) {
			code.r += updaters.r;
			code.g += updaters.g;
			code.b += updaters.b;

			yield [code.r, code.g, code.b];
		}

		code = goalCode;

		goalIndex = increment(goalIndex);
		goalCode = resolveHexCodeToDecimal(colors[goalIndex]);
		
		calculateUpdaters(updaters, code, goalCode);
	}
}
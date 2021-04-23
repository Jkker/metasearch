export default function parse(config) {
	const frames = [],
		links = [];
	config.forEach((e) => {
		if (e.embeddable) {
			frames.push(e);
		} else {
			links.push(e);
		}
	});
	return { frames, links };
}

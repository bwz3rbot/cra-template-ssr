const lorem = [
	`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit lib`,
	`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
	`Nulla vitae elit libero, a pharetra augue.`,
	`Nullam quis risus eget urna mollis orn`,
	`Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.`,
	`Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.`,
	`Nullam quis risus eget urna mollis ornare vel eu leo.`,
];
export default function generateLorem(lines = 1) {
	const random = Math.floor(Math.random() * lorem.length);
	const l = lorem[random];
	if (lines === 1) return l;
	return l.repeat(lines);
}

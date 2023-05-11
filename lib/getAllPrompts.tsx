export default async function getAllPrompts() {
	const res = await fetch("http://localhost:3000/api/prompt", {
		cache: "no-store",
	});
	if (!res.ok) throw new Error("failed");
	const data = await res.json();

	return data;
}

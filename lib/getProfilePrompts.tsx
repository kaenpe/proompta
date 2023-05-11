export default async function getProfilePrompts(id: string) {
	const res = await fetch(`http://localhost:3000/api/profiles/${id}/prompts`);
	if (!res.ok) throw new Error("failed");
	const data = await res.json();

	return data;
}

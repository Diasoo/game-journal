export default function PlatformTable({ data }) {
  if (!data.length) return <p className="pt-16">No records</p>;

  return (
    <ul>
      {data.map((platform) => (
        <li key={platform.id}>{platform.name}</li>
      ))}
    </ul>
  );
}

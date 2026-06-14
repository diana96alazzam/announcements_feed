export default function ErrorCard({ reloadData }: { reloadData: () => void }) {
  return (
    <div className="flex-center flex-column gap-1">
      <h2>Error loading announcements</h2>
      <button
        onClick={() => {
          reloadData();
        }}
        className="custom-btn"
      >
        Retry &#8635;
      </button>
    </div>
  );
}

function RatingDots({ name, value }: { name: string; value: number }) {
  return (
    <div>
      <span>{name}</span>
      <div className="flex gap-1">
        {Array.from({ length: 10 }).map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              index < value ? "bg-green-500" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default RatingDots;

"use client"

const StarRating = ({ rating, interactive, onChange }) => {
  const handleClick = (selectedRating) => {
    if (interactive && onChange) {
      onChange(selectedRating)
    }
  }

  return (
    <div className={`flex gap-1 text-2xl ${interactive ? "cursor-pointer" : ""}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${star <= rating ? "text-amber-500" : "text-gray-300"} ${interactive ? "hover:text-amber-400 transition-colors" : ""}`}
          onClick={() => handleClick(star)}
        >
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  )
}

export default StarRating

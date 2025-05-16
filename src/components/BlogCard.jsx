import React from "react";

const BlogCard = ({ blog }) => {
  return (
    <div className="w-full sm:w-[300px] rounded-xl shadow p-3 hover:shadow-lg transition bg-white">
      <img
        src={blog.image}
        alt={blog.title}
        className="rounded-lg w-full h-[180px] object-cover"
      />
      <h2 className="text-lg font-semibold mt-2">{blog.title}</h2>
      <p className="text-red-600 font-medium text-sm mt-1">{blog.author}</p>
      <p className="text-gray-700 text-sm mt-2 line-clamp-3">
        {blog.description}
      </p>
    </div>
  );
};

export default BlogCard;

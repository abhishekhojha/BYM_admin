import React, { useState } from 'react'
import { FiImage } from 'react-icons/fi'; // You'll need to install react-icons

const EditBlog = () => {
    
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        category: '',
        image: null
      });
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
          ...prevState,
          image: file
        }));
      };
    
      return (
        <div className="max-w-4xl mx-auto p-6">
          <h2 className="text-3xl font-bold mb-6">Edit Your Blog Post</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter blog title"
                  required
                />
              </div>
    
              {/* Slug Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="enter-slug-here"
                  required
                />
              </div>
    
              {/* Category Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="technology">Technology</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="travel">Travel</option>
                  <option value="food">Food</option>
                  <option value="health">Health</option>
                </select>
              </div>
    
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Blog Image</label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                    required
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <FiImage className="mx-auto text-4xl mb-2" />
                    <span className="text-sm text-gray-600">
                      Click to upload image
                    </span>
                  </label>
                </div>
              </div>
    
              {/* Content Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write your blog content here..."
                  required
                />
              </div>
            </div>
    
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#7e3af2] text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
               Update Blog Post
            </button>
          </form>
        </div>
      );
    };

export default EditBlog

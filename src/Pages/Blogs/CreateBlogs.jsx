import React, { useCallback, useEffect, useRef, useState } from "react";
// import { FiImage } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
// import { createReactEditorJS } from "react-editor-js";
// import { EDITOR_JS_TOOLS } from "../../Components/EditorConstants";
import { asyncCreateBlog, asyncEditBlog } from "../../redux/userAction";
import { useNavigate, useParams } from "react-router-dom";
// const ReactEditorJS = createReactEditorJS();

const CreateBlogs = () => {
  const { blogs } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { categories } = useSelector((state) => state.user);
  const editorJS = useRef(null);
  const handleInitialize = (instance) => {
    editorJS.current = instance;
  };
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const savedData = await editorJS.current.save();

    let content = "";
    savedData.blocks.forEach((element) => {
      // console.log(element);
      if (element.type === "paragraph") {
        content += `<p>${element.data.text}</p>`;
      }
      if (element.type === "header") {
        content += `<h${element.data.level}>${element.data.text}</h${element.data.level}>`;
      }
      if (element.type === "list") {
        content +=
          "<" +
          element.data.style[0] +
          element.type[0] +
          "/>" +
          element.data.items.map((i) => "<li>" + i + "</li>").join("") +
          "<" +
          element.data.style[0] +
          element.type[0] +
          "/>";
      }
      if (element.type === "code") {
        content +=
          "<" +
          element.type +
          ">" +
          element.data.code +
          "</" +
          element.type +
          ">";
      }
      if (element.type === "quote") {
        content +=
          "<" +
          element.type[0] +
          ">" +
          element.data.text +
          "</" +
          element.type[0] +
          ">";
      }
    });

    dispatch(asyncCreateBlog({ ...formData, content }));

    setFormData({
      title: "",
      slug: "",
      category: "",
      image: "",
    });

    editorJS.current.clear();

    navigate("/blogs");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // const savedData = await editorJS.current.save();
    // let content = "";
    // savedData.blocks.forEach((element) => {
    //   // console.log(element);
    //   if (element.type === "paragraph") {
    //     content += `<p>${element.data.text}</p>`;
    //   }
    //   if (element.type === "header") {
    //     content += `<h${element.data.level}>${element.data.text}</h${element.data.level}>`;
    //   }
    //   if (element.type === "list") {
    //     content +=
    //       "<" +
    //       element.data.style[0] +
    //       element.type[0] +
    //       "/>" +
    //       element.data.items.map((i) => "<li>" + i + "</li>").join("") +
    //       "<" +
    //       element.data.style[0] +
    //       element.type[0] +
    //       "/>";
    //   }
    //   if (element.type === "code") {
    //     content +=
    //       "<" +
    //       element.type +
    //       ">" +
    //       element.data.code +
    //       "</" +
    //       element.type +
    //       ">";
    //   }
    //   if (element.type === "quote") {
    //     content +=
    //       "<" +
    //       element.type[0] +
    //       ">" +
    //       element.data.text +
    //       "</" +
    //       element.type[0] +
    //       ">";
    //   }
    // });

    dispatch(asyncEditBlog(id, formData));
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     image: file,
  //   }));
  // };

  useEffect(() => {
    if (id) {
      const blog = blogs.find((blog) => blog._id === id);
      setFormData({
        title: blog.title,
        slug: blog.slug,
        category: blog.category,
        image: blog.image,
      });
    }
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Create New Blog Post</h2>

      <form className="space-y-6" onSubmit={id ? handleUpdate : handleSubmit}>
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

          {/* Image Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter image URL"
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
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          {/* <div>
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
          </div> */}

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <div className="border-2 border-dashed rounded-lg py-4">
              {/* <ReactEditorJS
                tools={EDITOR_JS_TOOLS}
                onInitialize={handleInitialize}
                placeholder="Type Here..."
                inlineToolbar
              /> */}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#7e3af2] text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Create Blog Post
        </button>
      </form>
    </div>
  );
};

export default CreateBlogs;

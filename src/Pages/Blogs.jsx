import React from 'react';
import Edit from '../assets/edit.png';
import Trash from '../assets/trash.png';
import { Link } from 'react-router-dom';

const Blogs = () => {
    
  // Sample data - in a real app, this would likely come from an API or props
  const tableData = [
    {
      id: 1,
      title: '#4356',
      Image: 'Hat',
      role: '10x Developer',
      content:'Matt Dickersons',
      category: 'javascript',
      slug: 'Transfer Bank',
      action: 'Approved',
      avatar: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
    },
    // ... add more data entries as needed
  ];


  return (
    <main className="h-full pb-16 overflow-y-auto">
      <div className="container grid px-6 mx-auto">
        <div className='flex justify-between items-center'>
   
       <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
         Blogs
        </h2>
      

  <Link to='/createBlog'>
  <button className='bg-[#7e3af2] text-white px-4 py-2 rounded-md'>
        + Create Blog
      </button>
  </Link>
        </div>
       

        {/* Table */}
        <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
          Blogs with avatars
        </h4>
        
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Content</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {tableData.map((user) => (
                  <tr key={user.id} className="text-gray-700 dark:text-gray-400">
                    <td className="px-4 py-3">{user.title}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                          <img
                            className="object-cover w-full h-full rounded-full"
                            src={user.avatar}
                            alt=""
                            loading="lazy"
                          />
                          <div
                            className="absolute inset-0 rounded-full shadow-inner"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p className="font-semibold">{user.Image}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {user.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{user.content}</td>
                    <td className="px-4 py-3 text-sm">{user.category}</td>
                    <td className="px-4 py-3 text-sm">{user.slug}</td>
                    <td className="px-4 py-3 text-xs flex gap-2">
                       <Link to='/editBlog'>
                       <button>
                            <img src={Edit} alt="edit" />
                        </button>
                       </Link>
                        <button>
                            <img src={Trash} alt="trash" />
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span className="flex items-center col-span-3">
              Showing 21-30 of 100
            </span>
            <span className="col-span-2"></span>
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  {/* Pagination buttons */}
                  {/* ... Previous button, page numbers, and Next button would go here ... */}
                </ul>
              </nav>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Blogs;
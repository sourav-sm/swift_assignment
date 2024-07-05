import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiSearch } from "react-icons/ci";
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from 'react-icons/gr';
import Navbar from './Navbar';

const Dashboard: React.FC = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [page, setPage] = useState<number>(() => {
  const savedPage = localStorage.getItem('page');
     return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const [pageSize, setPageSize] = useState<number>(() => {
    const savedPageSize = localStorage.getItem('pageSize');
    return savedPageSize ? parseInt(savedPageSize, 10) : 10;
  });
  const [search, setSearch] = useState<string>(() => {
    const savedSearch = localStorage.getItem('search');
    return savedSearch ? savedSearch : '';
  });
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: string } | null>(() => {
    const savedSortConfig = localStorage.getItem('sortConfig');
    return savedSortConfig ? JSON.parse(savedSortConfig) : null;
  });

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => {
        setComments(response.data);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('page', page.toString());
  }, [page]);

  useEffect(() => {
    localStorage.setItem('pageSize', pageSize.toString());
  }, [pageSize]);

  useEffect(() => {
    localStorage.setItem('search', search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem('sortConfig', JSON.stringify(sortConfig));
  }, [sortConfig]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(1); // Reset to first page when page size changes
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1); // Reset to first page when search changes
  };
  
//   SORTING AND PAGINATION LOGIC ***************/
  const handleSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig && sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'none';
    }
    setSortConfig({ key, direction });
  };

  const sortedComments = React.useMemo(() => {
    let sortableComments = [...comments];
    if (sortConfig !== null) {
      sortableComments.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableComments;
  }, [comments, sortConfig]);

  const filteredComments = sortedComments.filter(comment => 
    comment.name.toLowerCase().includes(search.toLowerCase()) ||
    comment.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedComments = filteredComments.slice((page - 1) * pageSize, page * pageSize);

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
  }

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg mt-4 sm:mt-2 '>
      <Navbar/>
      <div className='flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 pt-5'>
        
        {/* SORTING AND SEARCHING PART */}

        <div className='space-x-2 sm:space-x-4 flex flex-wrap justify-center text-sm sm:text-lg'>
          <button className='px-2 sm:px-4 py-2 bg-blue-950 text-white rounded hover:bg-white hover:text-blue-950 transition duration-300 flex items-center mb-2 sm:mb-0' onClick={() => handleSort('postId')}>
            Sort ID {getSortIcon('postId')}
          </button>
          <button className='px-2 sm:px-4 py-2 bg-blue-950 text-white rounded hover:bg-white hover:text-blue-950 transition duration-300 flex items-center mb-2 sm:mb-0' onClick={() => handleSort('name')}>
            Sort Name {getSortIcon('name')}
          </button>
          <button className='px-2 sm:px-4 py-2 bg-blue-950 text-white rounded hover:bg-white hover:text-blue-950 transition duration-300 flex items-center' onClick={() => handleSort('email')}>
            Sort Email {getSortIcon('email')}
          </button>
        </div>
        <div className='relative w-full sm:w-auto'>
          <CiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={handleSearchChange}
            className='w-full sm:w-auto pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </div>

        {/* MAIN TABLE PART */}

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 sm:px-6 py-3 text-left text-xs sm:text-md font-semibold sm:font-bold text-blue-900 tracking-wider'>Post ID</th>
              <th className='px-4 sm:px-6 py-3 text-left text-xs sm:text-md font-semibold sm:font-bold text-blue-900 tracking-wider'>Name</th>
              <th className='px-4 sm:px-6 py-3 text-left text-xs sm:text-md font-semibold sm:font-bold text-blue-900 tracking-wider'>Email</th>
              <th className='px-4 sm:px-6 py-3 text-left text-xs sm:text-md font-semibold sm:font-bold text-blue-900 tracking-wider'>Comment</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {paginatedComments.map(comment => (
              <tr key={comment.id}>
                <td className='px-2 sm:px-4 py-4 text-xs sm:text-lg'>{comment.postId}</td>
                <td className='px-2 sm:px-4 py-4 text-xs sm:text-lg'>{comment.name}</td>
                <td className='px-2 sm:px-4 py-4 text-xs wrap sm:text-lg'>{comment.email}</td>
                <td className='px-2 sm:px-4 py-4 text-xs sm:text-lg'>{comment.body.slice(0, 30)}...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* NAVIGATION BETWEEN PAGE PART */}

      <div className='flex items-center justify-center space-x-2 mt-4'>
        <button onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`flex items-center justify-center px-3 py-1 rounded ${
            page === 1 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-blue-950 text-white hover:bg-blue-600'
          }`}
        >
          <GrFormPrevious className={`w-5 h-5 ${page === 1 ? 'text-gray-400' : 'text-white'}`} />
        </button>

        {Array.from({ length: Math.ceil(filteredComments.length / pageSize) }, (_, index) => {
          const pageNumber = index + 1;
          if (
            pageNumber === 1 ||
            pageNumber === Math.ceil(filteredComments.length / pageSize) ||
            (pageNumber >= page - 1 && pageNumber <= page + 1)
          ) {
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1 rounded ${
                  page === pageNumber ? 'bg-blue-950 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {pageNumber}
              </button>
            );
          } else if (pageNumber === page - 2 || pageNumber === page + 2) {
            return <span key={pageNumber} className="px-1">...</span>;
          }
          return null;
        })}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === Math.ceil(filteredComments.length / pageSize)}
          className={`px-3 py-1 rounded ${
            page === Math.ceil(filteredComments.length / pageSize)
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-950 text-white hover:bg-blue-600'
          }`}
        >
          <GrFormNext className={`w-5 h-5 ${page === 1 ? 'text-gray-400' : 'text-white'}`} />
        </button>
      </div>

        {/* PAGE SIZE PART */}

      <div className='mt-4 flex justify-between items-center'>
        <div className='flex items-center space-x-2'>
          <label htmlFor="pageSize" className='text-gray-700'>Page Size: </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className='border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





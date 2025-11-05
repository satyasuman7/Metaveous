import React, { useState, useMemo } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { TbArrowBigLeftLineFilled, TbArrowBigRightLineFilled } from "react-icons/tb";

export default function TableData({ data, columns, title = "Data Table", onEdit, onDelete, baseImagePath = "" }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const itemsPerPage = 10;

  // Filter the data
  const filteredData = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    let filtered = data.filter(item =>
      columns.some(col =>
        item[col.key]?.toString().toLowerCase().includes(searchLower)
      )
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (typeof aVal === 'string') {
          return sortConfig.direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }

        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      });
    }

    return filtered;
  }, [data, columns, searchTerm, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev =>
      prev.key === key ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'asc' }
    );
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div className="container-fluid mt-4">
      <h4>{title}</h4>

      {/* Search */}
      <div className="mb-3">
        <input className="form-control w-25" type="text" placeholder="Search..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} />
      </div>

      {/* Table */}
      <table className="table table-bordered table-hover table_style">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            {columns.map(col => (
              <th key={col.key} role="button" onClick={() => handleSort(col.key)}>
                {col.label} {getSortIcon(col.key)}
              </th>
            ))}
            {(onEdit || onDelete) && <th>Actions</th>}
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr><td colSpan={columns.length + 3} className="text-center">No data found</td></tr>
          ) : (
            paginatedData.map((item, index) => (
              <tr key={item.id || index}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                {columns.map(col => (
                  <td
                    key={col.key}
                    className={`${col.key === 'blog_content' || col.key === 'description' || col.key === 'job_description' ? 'tableRow_style' : ''} ${col.key === 'blog_title' ? 'tableRow2_style' : ''}`} >

                    {col.isImage ? (
                      <img src={`http://localhost:3000/uploads/${baseImagePath}${item[col.key]}`} alt="profile-img" className='rounded-2' style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                    ) : col.key === 'status' ? (
                      <span className={`badge rounded-pill ${item.status ? 'bg-success' : 'bg-danger'}`}>
                        {item.status ? 'Active' : 'Inactive'}
                      </span>
                    ) : (
                      item[col.key]
                    )}
                  </td>

                ))}
                {(onEdit || onDelete) && (
                  <td>
                    {onEdit && (<button className="btn btn-warning btn-sm me-2 mb-2" onClick={() => onEdit(item)}> <AiFillEdit size={21} /> </button>)}
                    {onDelete && (<button className="btn btn-danger btn-sm mb-2" onClick={() => onDelete(item)}> <MdDeleteForever size={21} /> </button>)}
                  </td>
                )}
                {/* <td>{new Date(item.createdAt).toLocaleDateString()}</td> */}
                <td>{new Date(item.createdAt).toLocaleDateString().replace(/\//g, '-')}</td>

              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <button className="btn btn-outline-primary me-2" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
          <TbArrowBigLeftLineFilled />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'} mx-1`} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button className="btn btn-outline-primary ms-2" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
          <TbArrowBigRightLineFilled />
        </button>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import TableData from '../TableData';

// ICONS
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineCategory, MdOutlinePersonSearch, MdTitle } from 'react-icons/md';

const jobColumns = [
  { key: 'job_role', label: 'Job Role' },
  { key: 'job_location', label: 'Location' },
  { key: 'job_experience', label: 'Experience' },
  { key: 'job_vacancy', label: 'Vacancy' },
  { key: 'job_type', label: 'Job Type' },
  { key: 'job_description', label: 'Description' },
];

export default function Careers() {
  const [careerForm, setCareerForm] = useState({
    job_role: '',
    job_location: '',
    job_experience: '',
    job_vacancy: '',
    job_type: '',
    job_description: '',
  });
  const [careerList, setCareerList] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCareerForm({ ...careerForm, [name]: value });
  };

  //GET Careers
  const fetchCareers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/careers");
      setCareerList(res.data.data || []);
    } catch {
      toast.error("Error fetching careers");
    }
  };
  useEffect(() => {
    fetchCareers();
  }, []);

  // POST & PUT Blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:3000/careers/${editId}`, careerForm, {
          headers: { "Content-Type": "application/json" }
        });
        toast.success("Career updated Successfully");
      } else {
        await axios.post("http://localhost:3000/careers", careerForm, {
          headers: { "Content-Type": "application/json" }
        });
        toast.success("Career created Successfully");
      }

      // Reset form and refresh list
      setCareerForm({
        job_role: '',
        job_location: '',
        job_experience: '',
        job_vacancy: '',
        job_type: '',
        job_description: '',
      });
      setEditId(null);
      fetchCareers();
    } catch (err) {
      toast.error(err.response?.data?.msg);
    }
  };


  //DELETE Blog
  const deleteCareer = async (id) => {
    if (window.confirm("Delete this Career?")) {
      const res = await axios.delete(`http://localhost:3000/careers/${id}`);
      if (res.status === 204) {
        fetchCareers();
        toast.success("Deleted successfully.");
      } else {
        toast.error("Failed to delete career.");
      }
    }
  };

  //EDIT Career (FETCH DATA TO FORM)
  const editCareer = (id) => {
    const career = careerList.find((b) => b._id === id);
    if (career) {
      setCareerForm({
        job_role: career.job_role,
        job_location: career.job_location,
        job_experience: career.job_experience,
        job_vacancy: career.job_vacancy,
        job_type: career.job_type,
        job_description: career.job_description,
      });
      setEditId(id);
    }
  };

  return (
    <>
      {/* FORM */}
      <div className="p-3">
        <div className="card shadow border-0 p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Job Role */}
              <div className="col-md-6 mb-2">
                <label htmlFor="job_role" className="form-label">Job Role</label>
                <div className="input-group">
                  <span className="input-group-text"> <MdTitle size={21} /> </span>
                  <input type="text" id="job_role" name="job_role" className="form-control" value={careerForm.job_role} onChange={handleChange} required placeholder="Enter job role" />
                </div>
              </div>

              {/* Job Location */}
              <div className="col-md-6 mb-2">
                <label htmlFor="job_location" className="form-label">Job Location</label>
                <div className="input-group">
                  <span className="input-group-text"> <IoLocationOutline size={21} /> </span>
                  <input
                    type="text"
                    id="job_location"
                    name="job_location"
                    className="form-control"
                    value={careerForm.job_location}
                    onChange={handleChange}
                    required
                    placeholder="Enter location"
                  />
                </div>
              </div>

              {/* Experience */}
              <div className="col-md-6 mb-2">
                <label htmlFor="job_experience" className="form-label">Experience</label>
                <div className="input-group">
                  <span className="input-group-text"> <IoLocationOutline size={21} /> </span>
                  <input type="text" id="job_experience" name="job_experience" className="form-control" value={careerForm.job_experience} onChange={handleChange} required placeholder="Enter required experience" />
                </div>
              </div>

              {/* Vacancy */}
              <div className="col-md-6 mb-2">
                <label htmlFor="job_vacancy" className="form-label">Vacancy</label>
                <div className="input-group">
                  <span className="input-group-text"> <MdOutlinePersonSearch size={21} /> </span>
                  <input type="number" id="job_vacancy" name="job_vacancy" className="form-control" value={careerForm.job_vacancy} onChange={handleChange} required placeholder="Enter number of vacancies" />
                </div>
              </div>

              {/* Type */}
              <div className="col-md-6 mb-2">
                <label htmlFor="job_type" className="form-label">Job Type</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <MdOutlineCategory size={21} />
                  </span>
                  <select className="form-select" id="job_type" name="job_type" value={careerForm.job_type} onChange={handleChange} required>
                    <option value="" disabled>
                      Select Job Type
                    </option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="col-md-6 mb-2">
                <label htmlFor="job_description" className="form-label">Job Description</label>
                <textarea rows="4" id="job_description" name="job_description" className="form-control" value={careerForm.job_description} onChange={handleChange} required placeholder="Enter job description"></textarea>
              </div>
            </div>

            {/* Submit */}
            <div className="text-end mt-3">
              <button type="submit" className="btn btn-primary">
                {editId ? "Update Job" : "Add Job"}
              </button>
              {editId && (
                <button type="button" className="btn btn-secondary ms-2" onClick={() => { setEditId(null); setCareerForm({ job_role: '', job_location: '', job_experience: '', job_vacancy: '', job_type: '', job_description: '' }); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* TABLE */}
      <TableData
        data={careerList}
        columns={jobColumns}
        title="Job Openings"
        onEdit={(item) => editCareer(item._id)}
        onDelete={(item) => deleteCareer(item._id)}
      />
    </>
  );
}
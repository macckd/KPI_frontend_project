import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

export default function ProjectsPage() {

  const [projects, setProjects] = useState([]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    name: '',
    description: '',
    owner: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {

    try {

      const response = await api.get('/projects/');
      setProjects(response.data);

    } catch (error) {

      console.log(error);

      setError('Failed to fetch projects');
    }
  };

  const createProject = async () => {

    try {

      setError('');
      setSuccess('');

      if (!form.name.trim()) {
        setError('Project name is required');
        return;
      }

      if (!form.description.trim()) {
        setError('Project description is required');
        return;
      }

      if (!form.owner.trim()) {
        setError('Project owner is required');
        return;
      }

      await api.post('/projects/', {
        name: form.name,
        description: form.description,
        owner: form.owner
      });

      setSuccess('Project created successfully');

      fetchProjects();

      setForm({
        name: '',
        description: '',
        owner: ''
      });

    } catch (error) {

      console.log(error);

      if (error.response && error.response.data) {

        const errors = error.response.data;

        let errorMessages = '';

        Object.keys(errors).forEach((key) => {
          errorMessages += `${key}: ${errors[key].join(', ')} `;
        });

        setError(errorMessages);

      } else {

        setError('Something went wrong');
      }
    }
  };

  const deleteProject = async (id) => {

    try {

      await api.delete(`/projects/${id}/`);

      setSuccess('Project deleted successfully');

      fetchProjects();

    } catch (error) {

      console.log(error);

      setError('Failed to delete project');
    }
  };

  return (

    <PageContainer>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px'
        }}
      >

        <div>

          <h1
            style={{
              margin: 0,
              fontSize: '32px',
              color: '#111827'
            }}
          >
            Projects Dashboard
          </h1>

          <p
            style={{
              color: '#6b7280',
              marginTop: '8px'
            }}
          >
            Manage all your projects and KPIs
          </p>

        </div>

      </div>

      {error && (
        <div
          style={{
            color: 'white',
            background: '#dc2626',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '10px'
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            color: 'white',
            background: '#16a34a',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '10px'
          }}
        >
          {success}
        </div>
      )}

      <div
        style={{
          background: 'white',
          padding: '25px',
          borderRadius: '18px',
          marginBottom: '30px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
        }}
      >

        <h2
          style={{
            marginTop: 0,
            marginBottom: '20px',
            color: '#111827'
          }}
        >
          Create New Project
        </h2>

        <div
          style={{
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap'
          }}
        >

          <input
            placeholder="Project Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              width: '250px',
              outline: 'none'
            }}
          />

          <input
            placeholder="Project Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              width: '250px',
              outline: 'none'
            }}
          />

          <input
            placeholder="Project Owner"
            value={form.owner}
            onChange={(e) =>
              setForm({ ...form, owner: e.target.value })
            }
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              width: '250px',
              outline: 'none'
            }}
          />

          <button
            onClick={createProject}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '12px 22px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Create Project
          </button>

        </div>

      </div>

      <div
        style={{
          background: 'white',
          borderRadius: '18px',
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
        }}
      >

        <table
          width="100%"
          cellPadding="18"
          style={{
            borderCollapse: 'collapse'
          }}
        >

          <thead>

            <tr
              style={{
                background: '#f3f4f6'
              }}
            >

              <th align="left">ID</th>
              <th align="left">Name</th>
              <th align="left">Owner</th>
              <th align="left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {projects.map((project) => (

              <tr
                key={project.id}
                style={{
                  borderBottom: '1px solid #e5e7eb'
                }}
              >

                <td>{project.id}</td>

                <td
                  style={{
                    fontWeight: '600'
                  }}
                >
                  {project.name}
                </td>

                <td>{project.owner}</td>

                <td>

                  <Link to={`/projects/${project.id}`}>

                    <button
                      style={{
                        background: '#2563eb',
                        color: 'white',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        marginRight: '10px'
                      }}
                    >
                      View
                    </button>

                  </Link>

                  <button
                    onClick={() => deleteProject(project.id)}
                    style={{
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </PageContainer>
  );
}
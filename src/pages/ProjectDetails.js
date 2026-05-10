import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import PageContainer from '../components/PageContainer';

export default function ProjectDetails() {

  const { id } = useParams();

  const [project, setProject] = useState(null);

  const [form, setForm] = useState({
    name: '',
    description: '',
    owner: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {

    try {

      const response = await api.get(`/projects/${id}/`);

      setProject(response.data);

      setForm({
        name: response.data.name,
        description: response.data.description,
        owner: response.data.owner
      });

    } catch (error) {

      console.log(error);

      setError('Failed to fetch project');
    }
  };

  const updateProject = async () => {

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

      await api.put(`/projects/${id}/`, form);

      setSuccess('Project updated successfully');

      fetchProject();

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

  if (!project) return <h2>Loading...</h2>;

  return (

    <PageContainer>

      <div
        style={{
          marginBottom: '30px'
        }}
      >

        <h1
          style={{
            margin: 0,
            fontSize: '32px',
            color: '#111827'
          }}
        >
          Project Details
        </h1>

        <p
          style={{
            color: '#6b7280',
            marginTop: '8px'
          }}
        >
          View and update project information
        </p>

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
          borderRadius: '18px',
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          marginBottom: '30px'
        }}
      >

        <table
          width="100%"
          cellPadding="18"
          style={{
            borderCollapse: 'collapse'
          }}
        >

          <tbody>

            <tr
              style={{
                borderBottom: '1px solid #e5e7eb'
              }}
            >
              <td
                style={{
                  fontWeight: 'bold',
                  width: '220px',
                  background: '#f9fafb'
                }}
              >
                ID
              </td>

              <td>{project.id}</td>
            </tr>

            <tr
              style={{
                borderBottom: '1px solid #e5e7eb'
              }}
            >
              <td
                style={{
                  fontWeight: 'bold',
                  background: '#f9fafb'
                }}
              >
                Name
              </td>

              <td>{project.name}</td>
            </tr>

            <tr
              style={{
                borderBottom: '1px solid #e5e7eb'
              }}
            >
              <td
                style={{
                  fontWeight: 'bold',
                  background: '#f9fafb'
                }}
              >
                Description
              </td>

              <td>{project.description}</td>
            </tr>

            <tr>
              <td
                style={{
                  fontWeight: 'bold',
                  background: '#f9fafb'
                }}
              >
                Owner
              </td>

              <td>{project.owner}</td>
            </tr>

          </tbody>

        </table>

      </div>

      <div
        style={{
          background: 'white',
          padding: '25px',
          borderRadius: '18px',
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
          Update Project
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
            onClick={updateProject}
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
            Update Project
          </button>

        </div>

      </div>

    </PageContainer>
  );
}
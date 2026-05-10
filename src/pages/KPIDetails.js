import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import PageContainer from '../components/PageContainer';

export default function KPIDetails() {

  const { id } = useParams();

  const [kpi, setKpi] = useState(null);

  const [form, setForm] = useState({
    project: '',
    name: '',
    target: '',
    actual: '',
    status: 'ON_TRACK'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchKPI();
  }, []);

  const fetchKPI = async () => {

    try {

      const response = await api.get(`/kpis/${id}/`);

      setKpi(response.data);

      setForm({
        project: response.data.project,
        name: response.data.name,
        target: response.data.target,
        actual: response.data.actual,
        status: response.data.status
      });

    } catch (error) {

      console.log(error);

      setError('Failed to fetch KPI');
    }
  };

  const updateKPI = async () => {

    try {

      setError('');
      setSuccess('');

      if (!form.project) {
        setError('Project ID is required');
        return;
      }

      if (!form.name.trim()) {
        setError('KPI name is required');
        return;
      }

      if (!form.target) {
        setError('Target is required');
        return;
      }

      if (!form.actual) {
        setError('Actual value is required');
        return;
      }

      const payload = {
        project: parseInt(form.project),
        name: form.name,
        target: parseFloat(form.target),
        actual: parseFloat(form.actual),
        status: form.status
      };

      await api.put(`/kpis/${id}/`, payload);

      setSuccess('KPI updated successfully');

      fetchKPI();

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

  if (!kpi) return <h2>Loading...</h2>;

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
          KPI Details
        </h1>

        <p
          style={{
            color: '#6b7280',
            marginTop: '8px'
          }}
        >
          View and update KPI information
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

              <td>{kpi.id}</td>
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
                Project ID
              </td>

              <td>{kpi.project}</td>
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

              <td>{kpi.name}</td>
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
                Target
              </td>

              <td>{kpi.target}</td>
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
                Actual
              </td>

              <td>{kpi.actual}</td>
            </tr>

            <tr>
              <td
                style={{
                  fontWeight: 'bold',
                  background: '#f9fafb'
                }}
              >
                Status
              </td>

              <td>

                <span
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    background:
                      kpi.status === 'ON_TRACK'
                        ? '#dcfce7'
                        : kpi.status === 'AT_RISK'
                        ? '#fef3c7'
                        : '#fee2e2',
                    color:
                      kpi.status === 'ON_TRACK'
                        ? '#166534'
                        : kpi.status === 'AT_RISK'
                        ? '#92400e'
                        : '#991b1b'
                  }}
                >
                  {kpi.status}
                </span>

              </td>
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
          Update KPI
        </h2>

        <div
          style={{
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap'
          }}
        >

          <input
            type="number"
            placeholder="Project ID"
            value={form.project}
            onChange={(e) =>
              setForm({ ...form, project: e.target.value })
            }
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              width: '180px',
              outline: 'none'
            }}
          />

          <input
            placeholder="KPI Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              width: '220px',
              outline: 'none'
            }}
          />

          <input
            type="number"
            placeholder="Target"
            value={form.target}
            onChange={(e) =>
              setForm({ ...form, target: e.target.value })
            }
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              width: '180px',
              outline: 'none'
            }}
          />

          <input
            type="number"
            placeholder="Actual"
            value={form.actual}
            onChange={(e) =>
              setForm({ ...form, actual: e.target.value })
            }
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              width: '180px',
              outline: 'none'
            }}
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
            style={{
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              width: '180px',
              outline: 'none'
            }}
          >
            <option value="ON_TRACK">ON_TRACK</option>
            <option value="AT_RISK">AT_RISK</option>
            <option value="OFF_TRACK">OFF_TRACK</option>
          </select>

          <button
            onClick={updateKPI}
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
            Update KPI
          </button>

        </div>

      </div>

    </PageContainer>
  );
}
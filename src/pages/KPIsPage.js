import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from "react-router-dom";
import PageContainer from '../components/PageContainer';

export default function KPIsPage() {

  const [kpis, setKpis] = useState([]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    project: '',
    name: '',
    target: '',
    actual: '',
    status: 'ON_TRACK'
  });

  useEffect(() => {
    fetchKPIs();
  }, []);

  const fetchKPIs = async () => {

    try {

      const response = await api.get('/kpis/');
      setKpis(response.data);

    } catch (error) {

      console.log(error);
      setError('Failed to fetch KPIs');
    }
  };

  const createKPI = async () => {

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

      await api.post('/kpis/', payload);

      setSuccess('KPI created successfully');

      fetchKPIs();

      setForm({
        project: '',
        name: '',
        target: '',
        actual: '',
        status: 'ON_TRACK'
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

  const deleteKPI = async (id) => {

    try {

      await api.delete(`/kpis/${id}/`);

      setSuccess('KPI deleted successfully');

      fetchKPIs();

    } catch (error) {

      console.log(error);

      setError('Failed to delete KPI');
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
            KPI Dashboard
          </h1>

          <p
            style={{
              color: '#6b7280',
              marginTop: '8px'
            }}
          >
            Manage project KPIs and track progress
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
          Create KPI
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
            onClick={createKPI}
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
            Create KPI
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
              <th align="left">Target</th>
              <th align="left">Actual</th>
              <th align="left">Status</th>
              <th align="left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {kpis.map((kpi) => (

              <tr
                key={kpi.id}
                style={{
                  borderBottom: '1px solid #e5e7eb'
                }}
              >

                <td>{kpi.id}</td>

                <td
                  style={{
                    fontWeight: '600'
                  }}
                >
                  {kpi.name}
                </td>

                <td>{kpi.target}</td>

                <td>{kpi.actual}</td>

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

                <td>

                  <Link to={`/kpis/${kpi.id}`}>

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
                    onClick={() => deleteKPI(kpi.id)}
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
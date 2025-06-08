import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '../../types/UserRole';
import '../../components/forms/Form.css';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('bénéficiaire');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle registration logic
    console.log({ email, password, role });
    alert('Registration submitted! (Check console)');
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
            <option value="bénéficiaire">Bénéficiaire</option>
            <option value="volontaire">Volontaire</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      <p className="form-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage; 
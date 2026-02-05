import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const DebugSupabase = () => {
  const [logs, setLogs] = useState([]);
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testPassword, setTestPassword] = useState('TestPass123');

  const addLog = (message) => {
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testConnection = async () => {
    setLogs([]);
    addLog('🔍 Testing Supabase connection...');

    try {
      // Test auth status
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      addLog(sessionError ? `❌ Session check failed: ${sessionError.message}` : '✅ Session check: OK');

      // Test products read
      const { data, error: readError } = await supabase.from('products').select('count');
      addLog(readError ? `❌ Products read failed: ${readError.message}` : '✅ Products read: OK');

      addLog('🎉 Connection test complete');
    } catch (err) {
      addLog(`❌ Unexpected error: ${err.message}`);
    }
  };

  const testSignup = async () => {
    addLog(`📝 Testing signup with email: ${testEmail}`);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            firstName: 'Test',
            lastName: 'User',
            phone: '01700000000',
          },
        },
      });

      if (error) {
        addLog(`❌ Signup error: ${error.message}`);
        return;
      }

      addLog(`✅ Signup success! User ID: ${data.user?.id}`);
      addLog('📧 Check email for confirmation link');
    } catch (err) {
      addLog(`❌ Unexpected signup error: ${err.message}`);
    }
  };

  const testSignIn = async () => {
    addLog(`🔑 Testing signin with email: ${testEmail}`);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });

      if (error) {
        addLog(`❌ SignIn error: ${error.message}`);
        return;
      }

      addLog(`✅ SignIn success! User ID: ${data.user?.id}`);
    } catch (err) {
      addLog(`❌ Unexpected signin error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🐛 Supabase Debug Console</h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-6 space-y-4">
          <h2 className="text-xl font-semibold">Test Credentials</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Email:</label>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 text-white"
              placeholder="test@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password:</label>
            <input
              type="password"
              value={testPassword}
              onChange={(e) => setTestPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded border border-gray-600 text-white"
              placeholder="TestPass123"
            />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6 space-y-3">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <button
            onClick={testConnection}
            className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-medium transition"
          >
            Test Connection
          </button>
          <button
            onClick={testSignup}
            className="w-full bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-medium transition"
          >
            Test Signup
          </button>
          <button
            onClick={testSignIn}
            className="w-full bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded font-medium transition"
          >
            Test SignIn
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📋 Logs</h2>
          <div className="bg-gray-900 rounded p-4 h-64 overflow-y-auto font-mono text-sm space-y-1">
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs yet. Click a test button above.</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="text-gray-300">
                  {log}
                </div>
              ))
            )}
          </div>
          <button
            onClick={() => setLogs([])}
            className="mt-4 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm transition"
          >
            Clear Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugSupabase;
